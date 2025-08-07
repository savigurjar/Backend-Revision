const express = require("express");
const app = express();
const main = require("./db");
const User = require("./models/user");

app.use(express.json());

app.get("/hello", async (req, res) => {
  // res.send("Say The Name");
  const ans = await User.find({});
  res.status(200).send(ans);
});
app.post("/info", async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).send("added successfully");
  } catch (err) {
    res.status(400).send("err " + err);
  }
});
app.put("/info/:name", async (req, res) => {
  try {
    // await User.updateOne({ name: "sawako" }, { age: 22 });
    const ut = req.params.name;

    await User.updateOne({ name: ut }, { age: 21 });
    res.status(200).send("update successfully");
  } catch (err) {
    res.status(400).send("err " + err);
  }
});
app.delete("/info/:name", async (req, res) => {
  try {
    // await User.deleteOne({ name: "savi" });
    const dt = req.params.name;
    await User.deleteOne({ name: dt });
    res.status(200).send("delete successfully");
  } catch (err) {
    res.status(400).send("err " + err);
  }
});

main()
  .then(() => {
    console.log("Connected to DB");
    app.listen(4000, (req, res) => {
      console.log("listening at port 4000");
    });
  })
  .catch((err) => console.log("err " + err));
