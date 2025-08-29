require("dotenv").config()
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const redisClient = require("../config/redis")
async function userAuth(req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) throw new Error("token is missing")

        const payload = jwt.verify(token, process.env.SECRET_KEY);
        const { _id } = payload;
        if (!_id) throw new Error("Invalid token payload")

        const result = await User.findById(_id);
        if (!result) throw new Error("user not found");

    const isBlocked = await redisClient.exists(`token:${token}`);
if (isBlocked) throw new Error("Invalid token");


        req.result = result;
        next()
    }


    catch (err) {
        res.status(401).send("Unauthorized: " + err.message);
    }
}
module.exports = userAuth;
