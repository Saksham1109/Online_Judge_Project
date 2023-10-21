const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    testCases: [testCaseSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const testCaseSchema = new mongoose.Schema(
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      }
    },
    { _id: false } 
  );

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
