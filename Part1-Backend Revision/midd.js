
const express = require("express");
const app = express();

app.use(express.json());

// First middleware
app.get("/user", (req, res, next) => {
  console.log("hello");
  next();
});

// Second middleware
app.get("/user", (req, res, next) => {
  console.log("second");
  next();
});

// Final handler (Corrected parameter order)
app.get("/user", (req, res) => {
  res.send("okkkay");
  console.log("third");
});

app.listen(3000, () => {
  console.log("listen at port 3000");
});
