const express = require("express");
const authRouter = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const validateUser = require("../utils/validate");
const redisClient = require("../config/redis");
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
  try {
    await validateUser(req.body);

    req.body.password = await bcrypt.hash(req.body.password, 10);
    await User.create(req.body);

    res.status(201).send("signup successfully");
  } catch (err) {
    res.status(403).send("error " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const people = await User.findOne({ emailId });
    if (!people) throw new Error("Invalid credentials");

    const isValid = await people.getVerify(password);
    if (!isValid) throw new Error("invalid credentials");

    const token = people.getJwt();
    res.cookie("token", token);

    res.send("login successfully");
  } catch (err) {
    res.status(403).send("error " + err);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) throw new Error("token not found");

    await redisClient.set(`token:${token}`, "Blocked");

    const payload = jwt.decode(token);
    if (!payload || !payload.exp) throw new Error("invalid token");

    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.status(200).send("logout successfully");
  } catch (err) {
    res.status(403).send("error " + err);
  }
});

module.exports = authRouter;
