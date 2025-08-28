const express = require("express");
const authRouter = express.Router()
const validuser = require("../Validator/valid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const userAuth = require("../middleware/authenticate")


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

module.exports = authRouter;