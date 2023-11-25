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

async function handleSubmission(problemId, email, status, statusMessage) {
  try {
    const existingSubmission = await Submissions.findOne({ problemId, email });

    const submissionData = {
      problemId,
      email,
      submissionStatus: status,
      submissionStatusMessage: statusMessage,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    if (existingSubmission) {
      // Update the existing submission status and message
      existingSubmission.set(submissionData);
      await existingSubmission.save();
      console.log('Submission status updated successfully');
    } else {
      // Save a new submission
      const submission = new Submissions(submissionData);
      await submission.save();
      console.log('New submission saved');
    }
  } catch (error) {
    console.error('Error during submission handling:', error);
  }
}

async function handleTestFailure(problemId, email, submissionStatusMessage) {
  try {
    // Your test case failure logic here

    // Assuming the test case failed
    await handleSubmission(problemId, email, 'failed', submissionStatusMessage);
  } catch (error) {
    console.error('Error during test failure handling:', error);

    // Save the submission with an error status
    await handleSubmission(problemId, email, 'error', 'Error during test failure handling');
  }
}

async function handleSuccessfulSubmission(problemId, email) {
  try {
    // Your code execution logic and test case validation here

    // Assuming the test case passed
    await handleSubmission(problemId, email, 'success', 'Code submitted successfully');
  } catch (error) {
    console.error('Error during code submission:', error);

    // Save the submission with an error status
    await handleSubmission(problemId, email, 'error', 'Error during code submission');
  }
}

const submitProblem = async (req, res) => {
  const { language, code, problemId,email } = req.body;
  console.log(email);
  const success=false;

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
      if (output !== testCase.output) {
        sucess=false;
        submissionStatus = `Test cases ${i + 1} failed`;
        handleTestFailure(problemId, email, submissionStatus);
        return res.json({
          message: `Test cases ${i + 1} failed`, status :false,
        });
      }
    }

    submissionStatus = "Code Accepted";
    sucess=true;
    handleSuccessfulSubmission(problemId, email);

    return res.json({ message: "Code Accepted",status:true });

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