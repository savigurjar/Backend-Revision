const express = require("express");
const app = express();
const main = require("./database");
const User = require("./models/user");
const validateuser = require("./utils/validateuser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const verifyUser = require("./middleware/verify");

app.use(express.json());
app.use(cookieparser());

app.post("/register", async (req, res) => {
  try {
    await validateuser(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await User.create(req.body);

    res.status(200).send("User added successfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.get("/user", verifyUser, async (req, res) => {
  try {
    res.send(req.result);
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // email verify
    const people = await User.findOne({ emailId });
    if (!people) throw new Error("invalid credentails");

    // password
    const IsAllowed = await bcrypt.compare(password, people.password);
    if (!IsAllowed) throw new Error("invalid credentials");

    const token = jwt.sign(
      { _id: people._id, emailId: people.emailId },
      "sajnshd!1230!",
      { expiresIn: "2days" }
    );
    res.cookie("token", token);
    res.send("login successfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});

app.delete("/user/:id",verifyUser,async(req,res)=>{
 try{
   const id = User.findByIdAndDelete(req.params.id);
   res.status(200).send("delete successfully")
 }
 catch(err){
   res.status(401).send("error " + err);
 }

})

main()
  .then(() => {
    console.log("Connected to DB");
    app.listen(4000, (req, res) => {
      console.log("listening at port 4000");
    });
  })
  .catch((err) => console.log("err " + err));
