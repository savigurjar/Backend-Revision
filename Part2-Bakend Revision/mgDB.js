const mongoose = require("mongoose");
const { Schema } = mongoose;

async function main() {
  await mongoose.connect(
    "mongodb+srv://savigurjar:Hunter12@cluster0.rapodec.mongodb.net/OnePiece"
  );

  const userSchema = new Schema({
    name: String,
    age: Number,
    gender: String,
  });

  const User = mongoose.model("roger", userSchema);
  //   document create object create
  //   const User1 = new User({ name: "luffy", age: 19, gender: "male" });
  //   await User1.save();

  //   or
//   await User.create({ name: "ace", age: 21, gender: "male" });
  // or
//   await User.insertMany([
//     { name: "nami", age: 20, gender: "female" },
//     { name: "robin", age: 21, gender: "female" },
//   ]);

  const ans = await User.find({});
  console.log(ans);
}
main()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error " + err));
