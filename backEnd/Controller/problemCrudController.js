const problemdb = require("../Models/Problems");
const submissiondb = require("../Models/Submissions");
const {User} = require("../Models/User");
// Add the  problem 
const addProblem = async (req, res) => {
  const { title,tag,description,difficulty,testCases } = req.body;
  const createdBy=req.headers.email;
  console.log(req.headers);

  try {
    const problem = await problemdb.findOne({ title });

    console.log("1");
    if (problem) {
      res.json({ message: "Problem exists already" });
    } else {
      console.log("2");
      const problem = await problemdb.create({
        title,
        tag,
        description,
        difficulty,
        testCases,
        createdBy
      });
      console.log(problem);
      res.json({ message: "Problem created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming you have user information in req.user
    const user = await User.findOne({email : userEmail});
    if(!user)
    {
        return res.status(401).send({message : "Invalid Email/email not found , please sign in if new "});
    }

    // Fetch all problems
    const problems = await problemdb.find();

    // Fetch submission status for the user's email
    const submissionStatuses = await submissiondb.find({ email: userEmail });

    // Map submission status to their respective problemId
    const submissionStatusMap = {};
    submissionStatuses.forEach((submission) => {
      submissionStatusMap[submission.problemId] = {
        status: submission.submissionStatus,
        message: submission.submissionStatusMessage,
      };
    });

    // Combine problems and submission statuses
    const data = problems.map((problem) => ({
      ...problem.toObject(),
      submissionStatus: submissionStatusMap[problem.problemId] || { status: 'Not Submitted', message: '' },
    }));

    res.json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get specific problem  based on problemID
const getProblem = async (req, res) => {
  console.log(req.body);
  try {
    var query ={title:new RegExp(req.params.title,'i')}
    const problem = await problemdb.find(query);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getProblemById = async (req, res) => {
  console.log(req.body);
  try {
    const problem = await problemdb.findById(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update the problem 
const updateProblem = async (req, res) => {
  const { title, tag , description, difficulty, testCases } = req.body;
  try {
    const problem = await problemdb.findByIdAndUpdate(req.params.problemId,{ title, tag, description, difficulty,testCases },{ new: true });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.json({ message: "Problem edited successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete problem
const deleteProblem = async (req, res) => {
  try {
    console.log(req.params);
    var query ={title:req.params.title};
    const problemFind = await problemdb.findOne(query);
    if (!problemFind) {
      return res.status(404).json({ message: "Problem not found" });
    }
    let id=problemFind;
    console.log("id     ",id);
    const problem = await problemdb.findByIdAndDelete(problemFind._id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json({error:error});
  }
};

module.exports = {
  addProblem,
  getAllProblems,
  getProblem,
  updateProblem,
  deleteProblem,
  getProblemById
};