const express = require("express");

const {  fetchSubmissions } = require("../Controller/submissionsController");
const auth = require("../MiddleWare/authMiddleware");

const router = express.Router();

router.get("/getTotalQuestionsSolved/:email", auth,);

module.exports = router;