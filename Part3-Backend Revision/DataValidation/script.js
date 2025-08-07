const express = require("express");
const app = express();
const main = require("./data");
const User = require("./models/user");
const validuser = require("./utils/validuser");
const validator = require("validator");
const bcrypt = require("bcrypt");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth = require("./middleware/userauth")

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    // validate user
    await validuser(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);

    await User.create(req.body);
    res.status(201).send("client added successfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.post("/login", async (req, res) => {
  try {
    // validate karna

    const people = await User.findOne({emailId:req.body.emailId});

    if (!(req.body.emailId === people.emailId))
      throw new Error("Invalid credentials");

    const IsAllowed = await bcrypt.compare(req.body.password, people.password);
    if (!IsAllowed) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign(
      { id: people._id, emailId: people.emailId },
      "savi@1!hsd",{expiresIn:60}
    );
    res.cookie("token", token);
    res.send("login successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});
app.get("/info", userAuth,async (req, res) => {
  try {
    // const payload = jwt.verify(req.cookies.token, "savi@1!hsd");
    // console.log(payload);
    const result = await User.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.get("/user",userAuth, async (req, res) => {
  try {
    // const payload = jwt.verify(req.cookie.token, "savi@1!hsd");
    // const result = await User.findById(payload._id);
    // if (!result) {
    //   return res.status(404).send("User not found");
    // }
    res.status(200).send(req.result);
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
// app.get("/info/:id", async (req, res) => {
//   try {
//     const id = await User.findById(req.params.id);
//     res.status(200).send(id);
//   } catch (err) {
//     res.status(401).send("error " + err);
//   }
// });
app.delete("/info/:id",userAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("delete sucessfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});
app.put("/info",userAuth, async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.status(200).send("update sucessfully");
  } catch (err) {
    res.status(401).send("error " + err);
  }
});

main()
  .then(() => {
    console.log("connect to DB ");
    app.listen(3000, (req, res) => {
      console.log("listening at port 3000");
    });
  })
  .catch((err) => console.log("error : " + err));
