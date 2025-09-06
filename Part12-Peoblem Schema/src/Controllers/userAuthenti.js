const User = require("../models/User");
const validUser = require("../utils/validate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const redisClient = require("../database/redis");

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
};

const register = async (req, res) => {
    try {
        await validUser(req.body);

        req.body.password = await bcrypt.hash(req.body.password, 10);
        // req.body.role = "user";

        const people = await User.create(req.body);

        const token = jwt.sign(
            { _id: people._id, role: people.role, emailId: people.emailId },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, cookieOptions);
        res.status(201).send("User created successfully");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const people = await User.findOne({ emailId });
        if (!people) throw new Error("Invalid credentials");

        const isAllowed = await bcrypt.compare(password, people.password);
        if (!isAllowed) throw new Error("Invalid credentials");

        const token = jwt.sign(
            { _id: people._id, role: people.role, emailId: people.emailId },
            process.env.JWT_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, cookieOptions);
        res.status(200).send("Login successfully");
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        res.status(200).json(req.result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("Token is missing");

        const payload = jwt.verify(token, process.env.JWT_KEY);

        await redisClient.set(`token:${token}`, "Blocked");
        await redisClient.expireAt(`token:${token}`, payload.exp);

        res.clearCookie("token", cookieOptions);
        res.status(200).send("Logout successfully");
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

// const adminRegister = async (req, res) => {
//     try {
//         // 👇 Check if the requester is an admin
//         if (!req.result || req.result.role !== "admin") {
//             throw new Error("Only admins can create another admin");
//         }

//         await validUser(req.body);
//         req.body.password = await bcrypt.hash(req.body.password, 10);
//         req.body.role = "admin";

//         const people = await User.create(req.body);

//         const token = jwt.sign(
//             { _id: people._id, role: people.role, emailId: people.emailId },
//             process.env.JWT_KEY,
//             { expiresIn: "1d" }
//         );

//         res.cookie("token", token, cookieOptions);
//         res.status(201).send("Admin created successfully");
//     } catch (err) {
//         res.status(401).json({ error: err.message });
//     }
// };

module.exports = { register, login, getProfile, logout,  };
