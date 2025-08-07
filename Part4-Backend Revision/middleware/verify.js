const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyUser = async (req, res, next) => {
  try {
    // Get token from cookie (not body!)
    const token = req.cookies.token;
    if (!token) throw new Error("Token is missing");

    // Verify the token
    const payload = jwt.verify(token, "sajnshd!1230!");
    const { _id } = payload;
    if (!_id) throw new Error("Invalid token payload");

    // Find the user by ID
    const result = await User.findById(_id);
    if (!result) return res.status(403).send("User not found");

    // Attach user to request
    req.user = result;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: " + err.message);
  }
};

module.exports = verifyUser;
