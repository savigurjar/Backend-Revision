const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./aichat");

app.use(express.json());

const chatHistory = {};

app.post("/talk", async (req, res) => {
  const { id, msg } = req.body;

  if (!chatHistory[id]) chatHistory[id] = [];

  //   history +current ques in array
  const History = chatHistory[id];
  const promptMsg = [
    ...History,
    {
      role: "user",
      parts: [{ text: msg }],
    },
  ];

  const answer = await main(promptMsg);

  //   ques insert
  History.push({ role: "user", parts: [{ text: msg }] });
  //   response
  History.push({ role: "model", parts: [{ text: answer }] });
  res.status(200).send(answer);
});

app.listen(process.env.PORT, () => {
  console.log(`listening at port ${process.env.PORT}`);
});
