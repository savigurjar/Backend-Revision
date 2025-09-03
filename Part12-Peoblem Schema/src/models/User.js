const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastname: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    role: {
        type: String,
        enum: ["user", "admin"]
    },
    age: {
        type: Number,
        min: 6,
        max: 99
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("user",userSchema);
module.exports = User;