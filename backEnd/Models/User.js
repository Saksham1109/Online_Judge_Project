const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {type:String, enum:["admin","user"], required:false, default:"user"}
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {          
    expiresIn: "7d",
  });
  return token;
};


const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("FirstName"),
    lastName: Joi.string().required().label("LastName"),
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });

  return schema.validate(data);
};

const validateCredentials = (data) => {
  const schema = Joi.object(
      {
        email: Joi.string().required().label("Email"),
        password: Joi.string().required().label("Password")
      }
  );
  return schema.validate(data);
}

const User = mongoose.model("Users", userSchema);

module.exports = { User, validate , validateCredentials };