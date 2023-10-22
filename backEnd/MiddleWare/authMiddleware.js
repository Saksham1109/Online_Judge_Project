const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
    console.log(authorization);
  if (authorization===undefined) {
    return res.status(401).json({ error: "UnAuthorised!" });
  }

  const token = authorization.split(" ")[1];
  console.log("the token is");
  console.log(token);

  try {
    const { _id } = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({_id : _id});
    console.log(req.user);
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;