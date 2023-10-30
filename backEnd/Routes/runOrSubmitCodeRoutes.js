const express = require('express');
 
const { runProblem,submitProblem } = require("../Controller/runOrSubmitCodeController");
const auth = require("../MiddleWare/authMiddleware");

const router = express.Router();
 
// router.post("/compiler/run", auth, runProblem);
router.post("/compiler/submit", auth, submitProblem);

module.exports = router;