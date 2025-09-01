const mongoose = require("mongoose");
const { Schema } = mongoose;

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        enum: ["Array", "String", "Stack"],
        required: true
    },
    difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        require: true
    },
    visibleTestCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            },
            explanation: {
                type: String,
                required: true
            }

        }
    ],

    hiddenTestCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }],
    startCode: [
        {
            language: {
                type: String,
                required: true

            },
            initialCode: {
                type: String,
                required: true
            }
        }
    ],
    referenceSolution: [{
        language: {
            type: String,
            required: true

        },
        completeCode: {
            type: String,
            required: true
        }
    }],
    problemCreater: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})