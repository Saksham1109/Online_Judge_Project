const express = require("express");

const {
  addProblem,
  getAllProblems,
  getProblem,
  updateProblem,
  deleteProblem,
} = require("../controller/problemController");
const auth = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.post("/problems/add", auth, addProblem);
router.get("/problems/list", auth, getAllProblems);
router.get("/problems/:problemId", auth, getProblem);
router.get("/problems/edit/:problemId", auth, getProblem);
router.put("/problems/edit/:problemId", auth, updateProblem);
router.delete("/problems/delete/:problemId", auth, deleteProblem);

module.exports = router;