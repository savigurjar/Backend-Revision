const jwt = require("jsonwebtoken");
const User = require("../models/User")
const redisClient = require("../database/redis")

const adminMiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        if (!token) throw new Error("Token is missing");

        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;
        if (!_id) throw new Error("Invalid token");

        const result = await User.findById(_id);
        if (!result) throw new Error("User Id not Found");

        const isblocked = await redisClient.get(`token:${token}`);

        if (isblocked) throw new Error("invalid token")

        req.result = result;

        next();


    } catch (err) {
 return res.status(401).send("Unauthorized: " + err.message);
    }
}
module.exports = adminMiddleware 