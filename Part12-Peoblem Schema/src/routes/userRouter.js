const express = require("express");
const authRouter = express.Router();
const userMiddleware = require("../middleware/userMiddle");
const { register, getProfile, login, logout, adminRegister } = require("../Controllers/userAuthenti");
const adminMiddleware = require("../middleware/adminMiddleware");

// Public routes
authRouter.post("/register", register);
authRouter.post("/login", login);

// Protected routes
authRouter.get("/getProfile", userMiddleware, getProfile);
authRouter.post("/logout", userMiddleware, logout);

// adminsignup
authRouter.post("/adminRegister", adminMiddleware, adminRegister)

module.exports = authRouter;
