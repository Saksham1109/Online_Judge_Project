const express = require("express");

const { login, register,getUser,updateRole } = require('../Controller/userSignInResgisterController');

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);
router.get("/user/getUser", getUser);
router.post("/user/updateRole", updateRole);

module.exports = router;