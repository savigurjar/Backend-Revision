const express = require("express");
const app = express();

require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const redisClient = require("./config/redis");
const main = require("./database");

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);

const IntializeConnection = async () => {
    try {
        // Connect to DB first
        await main();

        // Connect to Redis
        if (!redisClient.isOpen) {
    await redisClient.connect();
}


        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to database or Redis:", err);
    }
};

IntializeConnection();
