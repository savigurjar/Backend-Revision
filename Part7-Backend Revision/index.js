const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./aichat");
const Box = require("./models/users");
const dbb = require("./database")

app.use(express.json());

app.post("/talk", async (req, res) => {
  try {
    const { id, msg } = req.body;

    // Find chat by userId or create a new one
    let chat = await Box.findOne({ userId: id });
    if (!chat) {
      chat = new Box({ userId: id, history: [] });
    }

    // Construct prompt with history
    const promptMsg = [
      ...chat.history,
      {
        role: "user",
        parts: [{ text: msg }],
      },
    ];

    const answer = await main(promptMsg);

    //   ques insert
    chat.history.push({ role: "user", parts: [{ text: msg }] });
    //   response
    chat.history.push({ role: "model", parts: [{ text: answer }] });

    await chat.save();
    res.status(200).send(answer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

dbb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
