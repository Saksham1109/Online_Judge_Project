const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization===undefined) {
    return res.status(401).json({ error: "UnAuthorised!" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({_id : _id});
    console.log("Success");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;