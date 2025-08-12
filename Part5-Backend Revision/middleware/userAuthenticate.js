const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) throw new Error("Token is missing");

    // Verify token
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const { _id } = payload;
    if (!_id) throw new Error("Invalid token payload");

    const user = await User.findById(_id);
    if (!user) return res.status(403).send("User not found");

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = userAuth;
