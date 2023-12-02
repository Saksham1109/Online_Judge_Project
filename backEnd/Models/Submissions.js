const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
      problemId: {
        type: String,
        required: true,
      },
      email: {
        type : String, 
        required : true
      },
      submissionStatus: {
        type: String,
        required: true
      },
      submissionStatusMessage: {
        type: String,
        required: true
      },
      createdDate : {
        type:Date,
        required:true
      },
      updatedDate : {
        type:Date,
        required:true
      }
      
    },
    { timestamps: true }
  );
  
  
  
  const Submissions = mongoose.model("Submissions", submissionSchema);

  module.exports = Submissions;