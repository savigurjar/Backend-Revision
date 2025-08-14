const express = require("express");
const userRouter = express.Router();
const User = require("../models/users");
const validateUser = require("../utils/validate");
const verifyUser = require("../middleware/userAuthenticate");

userRouter.get("/", verifyUser, async (req, res) => {
  try {
    res.status(200).send(req.result);
  } catch (err) {
    res.status(403).send("Error " + err);
  }
});
userRouter.put("/:id",verifyUser, async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { runValidators: true });
    res.status(200).send("User Updated Successfully");
  } catch (err) {
    res.status(403).send("Error " + err);
  }
});
userRouter.delete("/:id", verifyUser,async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).send("User Deleted Successfully");
  } catch (err) {
    res.status(403).send("Error " + err);
  }
});
module.exports = userRouter;
