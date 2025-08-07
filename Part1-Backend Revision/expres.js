const express = require("express");
const app = express();
// app.use((req, res) => {
// //   res.send("Hello Coder Army");
//   res.send({"name":"savi","age":21});
// });

app.use("/about", (req, res) => {
  res.send("i am about");
});
app.use("/contact", (req, res) => {
  res.send("i am contact");
});
app.use("/user/:id/:user", (req, res) => {
  console.log(req.params);
  res.send("i am user");
});
app.use("/", (req, res) => {
  res.send("i am home");
});
app.listen(3000, () => {
  console.log("listen at 3000");
});
