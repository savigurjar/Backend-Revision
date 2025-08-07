const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  gender: String,
});

const yoo = mongoose.model("yoo",userSchema);
module.exports = yoo;
