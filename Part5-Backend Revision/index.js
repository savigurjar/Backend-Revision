const express = require("express");
const app = express();
const main = require("./database");
const User = require("./models/users");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const validateUser = require("./utils/validate")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);

const intializeConnection = async () => {
  try {
    await main();
    console.log("DB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Errror : " + err);
  }
};
intializeConnection();
