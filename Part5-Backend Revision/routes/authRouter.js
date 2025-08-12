const express = require("express");
const authRouter = express.Router();
const User = require("../models/users");
const validateUser = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

authRouter.post("/register", async (req, res) => {
  try {
    await validateUser(req.body);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(403).send("Error " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const people = await User.findOne({ emailId });
    if (!people) throw new Error("invalid credentails");

    // password
    const IsAllowed = await bcrypt.compare(password, people.password);
    if (!IsAllowed) throw new Error("invalid credentials");

    const token = await jwt.sign(
      { _id: people._id, emailId: people.emailId },
      process.env.SECRET_KEY,
      { expiresIn: "1days" }
    );
    res.cookie("token", token);

    res.status(200).send("Login successful");
  } catch (err) {
    res.status(403).send("Error " + err);
  }
});

module.exports = authRouter;
