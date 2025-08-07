const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://savigurjar:Hunter12@cluster0.rapodec.mongodb.net/Instagram"
  );
}
module.exports = main;
