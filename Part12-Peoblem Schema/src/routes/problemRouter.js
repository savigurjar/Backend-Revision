const express = require("express");
const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const userMiddleware = require("../middleware/userMiddle")
const { createProblem, updateProblem, delelteProblem, getProblemById, getAllProblem } = require("../Controllers/allProblems")


problemRouter.post("/create", adminMiddleware, createProblem);
problemRouter.put("/update/:id", adminMiddleware, updateProblem)
problemRouter.delete("/delete/:id", adminMiddleware, delelteProblem)

problemRouter.get("/getProblemById/:id", userMiddleware, getProblemById);
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem)

module.exports = problemRouter;