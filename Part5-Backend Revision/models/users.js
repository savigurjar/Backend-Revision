const mongoose = require("mongoose");
const validator  = require("validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  middlename: {
    type: String,
    minLength: 1,
    maxLength: 20,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 100,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
    unique: true,
  },
},{timestamps:true});

const Patron = mongoose.model("Patron", userSchema);
module.exports = Patron;
