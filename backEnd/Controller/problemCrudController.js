const problemdb = require("../Models/Problems");
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
    const problems = await problemdb.find();
    res.json({ data: problems });
  } catch (error) {
    res.status(500).json(error);
  }
};


// get specific problem  based on problemID
const getProblem = async (req, res) => {
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
  const problem = await problemdb.findByIdAndDelete(req.params.problemId);
  try {
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProblem,
  getAllProblems,
  getProblem,
  updateProblem,
  deleteProblem,
};