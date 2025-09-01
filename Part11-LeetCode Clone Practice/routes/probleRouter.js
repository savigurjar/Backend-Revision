const express = require("express");
const problemRouter = express.Router();

problemRouter.post("/create",adminMiddle,createProblem) ;

