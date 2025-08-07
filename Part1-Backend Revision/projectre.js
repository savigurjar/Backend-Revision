const express = require("express");
const app = express();

const Band = [
  { id: 1, name: "BTS", company: "BigHit", worth: 700000000000 },
  { id: 2, name: "Seventeen", company: "Pledis", worth: 2200000000 },
  { id: 3, name: "Blackpink", company: "YG", worth: 120000000000 },
  { id: 4, name: "TXT", company: "BigHit", worth: 50000000 },
  { id: 5, name: "Got7", company: "JYP", worth: 670000000 },
  { id: 6, name: "Twice", company: "SM", worth: 500000000 },
];

app.use(express.json());
const AddToList = [];

// admin
app.get("/kband", (req, res) => {
  res.status(200).send(Band);
  
});
app.post("/admin", (req, res) => {
  try {
    Band.push(req.body);
    res.status(201).send("K Group added successfully");
  } catch (err) {
    res.status(401).send("Error : " + err);
  }
});

app.listen(3000, (req, res) => {
  console.log("listening at port 3000");
});
