const express = require("express");

const { login, register } = require('../Controller/userSignInResgisterController');

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);

module.exports = router;