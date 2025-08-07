const express = require("express");
const app = express();
const main = require("./db");
const User = require("./models/ppl");

app.use(express.json());

app.get("/add", async (req, res) => {
  res.status(200).send("Hello Coder Army");
});

app.post("/add", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).send("Successfully added");
  } catch (err) {
    res.status(401).send("error" + err);
  }
});
app.delete("/add", async (req, res) => {
  try {
    await User.deleteOne({ name: "savi" });
    res.status(200).send("delete successfullly");
  } catch (err) {
    res.status(401).send("error" + err);
  }
});
app.put("/add", async (req, res) => {
  try {
    await User.updateOne({ name: "hiii" }, { age: 19 });
    res.status(200).send("update successfullly");
  } catch (err) {
    res.status(401).send("error" + err);
  }
});
main()
  .then(() => {
    console.log("connected to db");
    app.listen(4000, () => {
      console.log("listen at port 4000");
    });
  })
  .catch((err) => console.log("error " + err));
