const express = require('express');

const {  addProblem, getAllProblems, getProblem, updateProblem, deleteProblem, getProblemById} = require("../Controller/problemCrudController");
const auth = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.post("/problems/add", auth, addProblem);
router.post("/problems/list", auth, getAllProblems);
router.get("/problems/findBy/:title", auth, getProblem);
router.get("/problems/:problemId", auth, getProblemById);
router.post("/problems/edit/:problemId", auth, updateProblem);
router.delete("/problems/delete/:title", auth, deleteProblem);

module.exports = router;