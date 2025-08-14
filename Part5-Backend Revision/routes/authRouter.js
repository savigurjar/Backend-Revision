const express = require("express");
const authRouter = express.Router();
const User = require("../models/users");
const validateUser = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis");

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
    const people = await User.findOne({ emailId: req.body.emailId });

    const IsAllowed = people.getVerify(req.body.password);
    if (!IsAllowed) {
      throw new Error("Invalid credentials");
    }

    // jwt tokan - cookie ki help se bhejege
    const token = people.getJwt();
    res.cookie("token", token);
    // res.cookie("token", "hksihrighlshjghgfjkhgmkhgjkgg");

    res.send("login successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).send("no token found");
    }
    await redisClient.set(`token:${token}`, "Bloacked");
    const payload = jwt.decode(token);
    if (!payload || !payload.exp) {
      return res.status(400).send("invalid token");
    }
    await redisClient.expireAt(`token:${token}`, payload.exp);

    res.status(200).send("logout successfully");
  } catch (err) {
    res.send("Error " + err.message);
  }
});

module.exports = authRouter;
