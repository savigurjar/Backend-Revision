const mongoose = require("mongoose");
const { Schema } = mongoose;

const submissionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problemId: {
        type: Schema.Types.ObjectId,
        ref: "Problem",
        required: true
    },
    code: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["JavaScript", "C++", "Java"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Wrong", "Error", "Time Limit Exceeded"]
    },
    runtime: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    errorMessage: {
        type: String,
        default: " "
    },
    testCasesPasses: {
        type: Number,
        default: 0
    },
    testCaseTotal: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

const Submission = mongoose.model("submission", submissionSchema);
module.exports = Submission;