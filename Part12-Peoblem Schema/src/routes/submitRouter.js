const express = require("express");
const submitRouter = express.Router();
const userMiddleware = require("../middleware/userMiddle")
const {submitProblem} = require("../Controllers/submit")

submitRouter.post("/submit/:id",userMiddleware,submitProblem)

module.exports = submitRouter