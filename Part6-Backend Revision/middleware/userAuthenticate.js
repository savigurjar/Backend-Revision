const jwt = require("jsonwebtoken");
const User = require("../models/users");
const redisClient = require("../config/redis");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("No token provided");

    const isBlocked = await redisClient.get(`token:${token}`);
    if (isBlocked) return res.status(401).send("Token expired or logged out");

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (!payload) return res.status(401).send("Invalid token");

    const user = await User.findById(payload._id);
    if (!user) return res.status(401).send("User not found");

    req.result = user; // now req.result will have user data
    next();
  } catch (err) {
    res.status(403).send("error " + err);
  }
};
module.exports = userAuth;
