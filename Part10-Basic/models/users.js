const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    age: {
        type: Number,
        min: 12,
        max: 90
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
      immutable: true,

    }

}, { timestamps: true })

const Data = mongoose.model("Data", userSchema)
module.exports = Data;