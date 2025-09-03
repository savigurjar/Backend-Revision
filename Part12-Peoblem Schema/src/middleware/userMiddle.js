const jwt = require("jsonwebtoken");
const User = require("../models/User")

const userMiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies;
        if (!token) throw new Error("Token is missing");

        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;
        if (!_id) throw new Error("Invalid token");

        const result = await User.findById(_id);
        if (!result) throw new Error("User Id not Found");

        req.result = result;

        next();


    } catch (err) {

    }
}
module.exports = userMiddleware 