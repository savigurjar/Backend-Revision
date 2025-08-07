const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
});

const Ppl = mongoose.model("ppl", userSchema);
module.exports = Ppl;
