const express = require("express");
const authRouter = express.Router();
const userMiddleware = require("../middleware/userMiddle")
const {register,getProfile,login,logout} = require("../Controllers/userAuthenti")

authRouter.post("/register", register);
authRouter.get("/getProfile", userMiddleware, getProfile);
authRouter.post("/login", userMiddleware, login);
authRouter.post("/logout",userMiddleware,logout)



module.exports = authRouter;

