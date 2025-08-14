const express = require("express");
const userAuth = require("../middleware/userAuthenticate");
const userRouter = express.Router();
const User = require("../models/users")

userRouter.get("/", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.result);
  } catch (err) {
    res.status(403).send("error " + err);
  }
});

userRouter.delete("/:id", userAuth, async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    res.status(403).send("error " + err);
  }
});

module.exports = userRouter;
