const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    lastname: {
      type: String,
      minLength: 3,
      maxLength: 20,
    },
    age: {
      type: Number,
      min: 17,
    },
    gender: {
      type: String,
      //   enum: ["male", "female", "other"],
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    emailId: {
      type: String,
      unique: true,
      lowercase: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "This is default photo",
    },
  },
  { timestamps: true }
);

const client = mongoose.model("client", userSchema);
module.exports = client;
