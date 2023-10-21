const mongoose = require("mongoose");

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
const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    tag: {
      type : String,
      required :true
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
        default: "easy",
        enum: ["easy","medium","hard"]
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



const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
