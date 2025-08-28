const express = require("express");
const app = express();

const main = require("./database")
require("dotenv").config()
const cookieparser = require("cookie-parser")
const authRouter = require("./routes/authRouter")
const validuser = require("./Validator/valid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


app.use(express.json());
app.use(cookieparser())

app.use("/auth", authRouter)






// Connect to DB and start server
main()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to database:", err);
    });