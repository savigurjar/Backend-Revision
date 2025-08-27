const express = require("express");
const app = express();
const User = require("./models/users");
const main = require("./database")
require("dotenv").config()
const validuser = require("./Validator/valid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser")
const userAuth = require("./middleware/authenticate")


app.use(express.json());
app.use(cookieparser())


app.post("/user", async (req, res) => {

    try {
        await validuser(req.body)
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await User.create(req.body);
        res.status(200).send("User created successfully")
    } catch (err) {
        res.status(401).send("error " + err)
    }
})
app.get("/user", userAuth, async (req, res) => {
    try {

        res.status(200).send(req.result)
    } catch (err) {
        res.status(401).send("error " + err)
    }

})
app.post("/login", async (req, res) => {
    try {

        const { emailId, password } = req.body;

        const people = await User.findOne({ emailId });
        if (!people) throw new Error("Invalid Credentials");

        const Isallowed = await bcrypt.compare(password, people.password);
        if (!Isallowed) throw new Error("Invalid credentials");

        const token = jwt.sign({ _id: people._id, emailId: people.emailId }, process.env.SECRET_KEY, { expiresIn: "1days" })
        res.cookie("token", token);
        res.status(200).send("login Successfully")



    } catch (err) {
        res.status(401).send("error " + err)
    }
})






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