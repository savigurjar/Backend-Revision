const mongoose = require("mongoose");
const { Schema } = mongoose;


const problemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
        type: [String],
        enum: ["Array", "String", "Binary Search", "Stack", "Queue", "Tree", "BST", "Dp", "Hashing"],
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    constraints: { type: String },

    examples: [
        {
            input: { type: String, required: true },
            output: { type: String, required: true },
            explanation: { type: String }
        }
    ],

    startCode: [{
        language: { type: String, required: true },
        initialCode: { type: String, required: true }
    }],
    referenceSolution: [{
        language: { type: String, required: true },
        completeCode: { type: String, required: true }
    }],
    visibleTestCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: {
            type: String,
            required: true
        }
    }],
    hiddenTestCases: [{
        input: { type: String, required: true },
        output: { type: String, required: true }
    }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

}, { timestamps: true });


const Problem = mongoose.model("problem", problemSchema);
module.exports = Problem;
