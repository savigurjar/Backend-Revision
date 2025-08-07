const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 150,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      unique: true,
      immutable: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "This is default photo",
    },
  },
  { timestamps: true }
);
const log = mongoose.model("log", userSchema);
module.exports = log;
