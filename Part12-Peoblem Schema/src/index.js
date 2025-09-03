const express = require("express");
const app = express();
const main = require("./database/db")
const redisClient = require("./database/redis")
require("dotenv").config()
const authRouter = require("./routes/userRouter")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

app.use("/user",authRouter);




const IntializeConnection = async (req, res) => {
    try {
        await Promise.all([main(), redisClient.connect()]);
        console.log("DB connected")

        app.listen(process.env.PORT, () => {
            console.log(`listing at port ${process.env.PORT}`)
        })
    } catch (err) {
        console.log("Error " + err)
    }
}
IntializeConnection()



// main()
// .then(() => {
//     app.listen(4000, (req, res) => {
//         console.log("`listing at port 4000")
//     })
// }).catch(() => {
//     console.log("Error " + err)
// })