const problemDb = require("../Models/Problems");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { User } = require("../Models/User");
const Submissions = require("../Models/Submissions");
const { v4: uuid } = require("uuid");

const outputDirectory = path.join(__dirname, "../outputs");
const codeDirectory = path.join(__dirname, "../codes");
const inputDirectory = path.join(__dirname, "../inputs");

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
}

if (!fs.existsSync(codeDirectory)) {
  fs.mkdirSync(codeDirectory, { recursive: true });
}

if (!fs.existsSync(inputDirectory)) {
  fs.mkdirSync(inputDirectory, { recursive: true });
}

async function generateFile(format, code) {
  const jobId = uuid();
  // only one uuid created for better mapping
  const fileName = format === "java" ? "Main.java" : `${jobId}.${format}`;
  const filepath = path.join(codeDirectory, fileName);
  await fs.writeFileSync(filepath, code);
  return filepath;
}

async function generateInput(input, filePath) {
  const jobId = path.basename(filePath).split(".")[0];
  const fileName = `${jobId}.txt`;
  const inputFilepath = path.join(inputDirectory, fileName);
  await fs.writeFileSync(inputFilepath, input);
  console.log(inputFilepath);
  return inputFilepath;
}

const executeCode = (filePath, language, inputPath) => {
  const jobId = path.basename(filePath).split(".")[0];
  let outputPath;
  if (language == "java") {
    outputPath = path.join(outputDirectory, `${jobId}.class`);
  } else {
    outputPath = path.join(outputDirectory, `${jobId}.exe`);
  }

  let executeCmd;

  switch (language) {
    case "java": 
      executeCmd=`javac -d ${outputDirectory} ${filePath} && java -cp ${outputDirectory} ${jobId} < ${inputPath}`;
      break;
    case "py":
      executeCmd = ` python ${filePath} < ${inputPath}`
      break;
    case "cpp":
      executeCmd = `g++ ${filePath} -o ${outputPath} && cd ${outputDirectory} && .\\${jobId}.exe  < ${inputPath}`
      break;
    default:
      return Promise.reject(`Language is not supported: ${language}`);
  }

  return new Promise((resolve, reject) => {
    exec(executeCmd, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};

const submitProblem = async (req, res) => {
  const { language, code, problemId,email } = req.body;
  console.log(email);

  if (code === undefined) {
    return res.json({ success: false, message: "Code not found" });
  }

  let  submissionStatus, errorInfo;

  try {
    const problem = await problemDb.findById(problemId);
    const testCases = problem.testCases;

    const user = await User.findOne({email : email});

    const filepath = await generateFile(language, code);

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const inputPath = await generateInput(testCase.input,filepath);
      const rawOutput = await executeCode(filepath, language, inputPath);
      console.log("--------------------------");
      console.log(inputPath);

      const output = rawOutput.replace(/\r\n/g, "\n").trim();
      console.log('the output is   '+ output);

      if (output !== testCase.output) {
        submissionStatus = `Test cases ${i + 1} failed`;
        return res.json({
          message: `Test cases ${i + 1} failed`,
        });
      }
    }

    submissionStatus = "Code Accepted";
    const submitProblem = await Submissions.create(
      {
        problemId,
        email,
        submissionStatus
      }
    )

    console.log(submitProblem);
    return res.json({ message: "Code Accepted" });

  } catch (error) {
     console.log(error);
    errorInfo = {
      message: error.message || "Compilation error",
      stack: error.stack || "",
    };

    return res.json({ message: errorInfo.message, error });
  }
};

module.exports = { submitProblem };