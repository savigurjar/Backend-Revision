const express = require("express");
const app = express();
const User = require("./models/users");
const main = require("./database")
require("dotenv").config()
const validuser = require("./Validator/authenticate")


app.use(express.json());

app.get("/user", async (req, res) => {
    try {
        const result = await User.find({})
        res.status(200).send(result)
    } catch (err) {
        res.status(401).send("error " + err)
    }

})
app.post("/user", async (req, res) => {

    try {
        await validuser(req.body)
        await User.create(req.body);
        res.status(200).send("User created successfully")
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