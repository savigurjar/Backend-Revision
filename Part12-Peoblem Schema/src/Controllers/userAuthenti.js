const User = require("../models/User")
const validUser = require("../utils/validate")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const redisClient = require("../database/redis")


const register = async (req, res) => {
    try {
        await validUser(req.body);

        const {firstname,emailId, password } = req.body;

        
       const hashpassword = await bcrypt.hash(password, 10)

        await User.create();
        res.status(201).send("User created Successfully")
    } catch (err) {
        res.status(401).send("Error " + err);
    }
}

const getProfile = async (req, res) => {
    try {
        const profile = await req.result;
        res.status(200).send(profile)
    } catch (err) {
        res.status(401).send("Error " + err);
    }
}

const login = async (req, res) => {
    try {

        const { emailId, password } = req.body;
        const people = await User.findOne({ emailId });
        if (!people) throw new Error("Invalid credentials");

        const IsAllowed = await bcrypt.compare(password, people.password);
        if (!IsAllowed) throw new Error("Invalid credentials");

        const token = jwt.sign({ _id: people._id, emailId: people.emailId }, process.env.JWT_KEY, { expiresIn: "1d" })
        res.cookie("token", token);

        res.status(200).send("login Sccessfully")

    } catch (err) {
        res.status(401).send("Error " + err);
    }
}

const logout = async (req, res) => {
    try {

        const { token } = req.cookies;
        if (!token) throw new Error("token is missing");

       

         const payload = jwt.verify(token, process.env.JWT_KEY);
        if (!payload) throw new Error("Invalid token payload");

         await redisClient.set(`token:${token}`, "Blocked");
        await redisClient.expireAt(`token:${token}`, payload.exp);

        // res.cookie("token", null, { expires: new Date(Date.now()) })
        res.clearCookie("token");

        res.status(200).send("logout successfully")


    }
    catch (err) {
        res.status(401).send("Error " + err);
    }
}


module.exports = { register, getProfile, login ,logout}