const express = require('express');
 
const { runProblem,submitProblem } = require("../Controller/runOrSubmitCodeController");
const auth = require("../MiddleWare/authMiddleware");

const router = express.Router();
 
router.post("/problem/run", auth, runProblem);
router.post("/problem/submit", auth, submitProblem);

module.exports = router;