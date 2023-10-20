const mongoose = require("mongoose");

const connect = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database properly");
  }
};

module.exports = connect;