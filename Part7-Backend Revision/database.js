const mongoose = require("mongoose");
require("dotenv").config();

async function dbb() {
  await mongoose.connect(process.env.CONNECT_KEY);
}

module.exports = dbb;
