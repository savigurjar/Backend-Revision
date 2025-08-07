const express = require("express");
const app = express();

const restaurant = [
  { id: 1, foodname: "dal bati", price: 300 },
  { id: 2, foodname: "noodles", price: 50 },
  { id: 3, foodname: "momos", price: 30 },
];
// parser
app.use(express.json());

app.get("/food", (req, res) => {
  res.send(restaurant);
});
app.get("/food/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const Food = restaurant.find((info) => info.id === id);
  res.send(Food);
});
app.post("/food", (req, res) => {
  restaurant.push(req.body);
  res.send("Data saved Successfully");
});
app.patch("/food", (req, res) => {
  console.log(req.body);
  const Food = restaurant.find((info) => (info.id = req.body.id));
  if (req.body.foodname) {
    Food.foodname = req.body.foodname;
  }
  res.send("patch updated");
});
app.put("/food", (req, res) => {
  const Food = restaurant.find((info) => info.id === req.body.id);
  Food.foodname = req.body.foodname;
  Food.price = req.body.price;
  res.send("put updated successfully");
});
app.delete("/food/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = restaurant.findIndex((info) => info.id === id);
  restaurant.splice(index, 1);
  res.send("delete successfully");
});
app.listen(5000, (req, res) => {
  console.log("listening at 5000");
});
