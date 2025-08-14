const jwt = require("jsonwebtoken");
const User = require("../models/users");
const redisClient = require("../config/redis")

const userAuth = async (req, res, next) => {
  try {
    //  authenciate krne ke liye bhi code likhna pdhega
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    const { _id } = payload;
    if (!_id) {
      throw new Error("Id is missing");
    }
    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).send("User not found");
    }
    req.result = result;
    console.log("user authentication");
    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) throw new Error("Invalid token");
    next();
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
};
module.exports = userAuth;
