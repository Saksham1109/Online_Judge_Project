const express = require("express");

const auth = require("../MiddleWare/authMiddleware");

const { login, register,getUser,updateRole,getAllUsers } = require('../Controller/userSignInResgisterController');

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);
router.get("/user/getUser",auth, getUser);
router.get("/user/getAllUsers",auth, getAllUsers);
router.post("/user/updateRole",auth, updateRole);

module.exports = router;