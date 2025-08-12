const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.CONNECT_KEY);
}
module.exports = main;
