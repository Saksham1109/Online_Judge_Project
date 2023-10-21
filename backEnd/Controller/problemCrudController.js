const problem = require("../Models/Problems");
// Add the  problem 
const addProblem = async (req, res) => {
  const { title, statement, testCases } = req.body;
  const createdBy = req.user._id;

  try {
    const problem = await problem.findOne({ title });

    if (problem) {
      res.json({ message: "Problem exists already" });
    } else {
      const problem = await problem.create({
        title,
        statement,
        difficulty,
        testCases,
        createdBy,
      });
      res.json({ message: "Problem created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProblems = async (req, res) => {
  try {
    const problems = await problem.find();
    res.json({ data: problems });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProblem = async (req, res) => {
  console.log(req.body);
  try {
    const problem = await problem.findById(req.params.problemId);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProblem = async (req, res) => {
  const { title, statement, difficulty, testCases } = req.body;
  try {
    const problem = await problem.findByIdAndUpdate(
      req.params.problemId,
      { title, statement, difficulty, testCases },
      { new: true }
    );
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
  const problem = await problem.findByIdAndDelete(req.params.problemId);
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