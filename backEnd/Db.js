const mongoose = require("mongoose");

const connect = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    mongoose.connect("mongodb+srv://sakshammishra:SakshamMongo123@cluster0.1oo9f5k.mongodb.net/?retryWrites=true&w=majority", connectionParams);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(error);
    console.log("could not connect to database properly");
  }
};

module.exports = connect;