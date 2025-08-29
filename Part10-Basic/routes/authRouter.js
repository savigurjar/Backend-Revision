const express = require("express");
const authRouter = express.Router()
const validuser = require("../Validator/valid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const RedisClient = require("../config/redis")

const userAuth = require("../middleware/authenticate");
const redisClient = require("../../Part6-Backend Revision/config/redis");


authRouter.post("/user", async (req, res) => {

    try {
        await validuser(req.body)
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await User.create(req.body);
        res.status(200).send("User created successfully")
    } catch (err) {
        res.status(401).send("error " + err)
    }
})
authRouter.get("/user", userAuth, async (req, res) => {
    try {

        res.status(200).send(req.result)
    } catch (err) {
        res.status(401).send("error " + err)
    }

})
authRouter.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;

        const people = await User.findOne({ emailId });
        if (!people) throw new Error("Invalid Credentials");

        const Isallowed = await bcrypt.compare(password, people.password);
        if (!Isallowed) throw new Error("Invalid credentials");

        const token = jwt.sign({ _id: people._id, emailId: people.emailId }, process.env.SECRET_KEY, { expiresIn: "1days" })
        res.cookie("token", token);
        res.status(200).send("login Successfully")



    } catch (err) {
        res.status(401).send("error " + err)
    }
})

authRouter.post("/logout", userAuth, async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Token is missing");

        // Ensure Redis is connected
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }

        // Check if token is already blocked
        const isBlocked = await redisClient.exists(`token:${token}`);
        if (isBlocked) throw new Error("Token is already invalidated");

        // Block the token in Redis
        await redisClient.set(`token:${token}`, "Blocked");

        // Verify token and get payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Set Redis key to expire when the JWT naturally expires
        await redisClient.expireAt(`token:${token}`, payload.exp);

        // Clear cookie
        res.clearCookie("token", { httpOnly: true, secure: true });
        res.send("Logout Successfully");

    } catch (err) {
        res.status(401).send("error: " + err.message);
    }
});


module.exports = authRouter;