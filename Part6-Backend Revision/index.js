const express = require("express");
const app = express();
const main = require("./database");

require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const redisClient = require("./config/redis");
const ratelimiter = require("./middleware/ratelimiter");

app.use(express.json());
app.use(cookieParser());

app.use(ratelimiter);

app.use("/auth", authRouter);
app.use("/user", userRouter);

const intializeConnection = async () => {
  try {
    await Promise.all([redisClient.connect(), main()]);
    console.log("Redis and DB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Errror : " + err);
  }
};
intializeConnection();
