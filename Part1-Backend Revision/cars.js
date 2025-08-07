const express = require("express");
const app = express();
const Auth = require("./middleware/Auth");

const carMenu = [
  { id: 1, name: "tesla", price: 300000, company: "tesla" },
  { id: 2, name: "mustang", price: 250000, company: "ford" },
  { id: 3, name: "civic", price: 180000, company: "honda" },
  { id: 4, name: "corolla", price: 170000, company: "toyota" },
  { id: 5, name: "model S", price: 400000, company: "tesla" },
  { id: 6, name: "camry", price: 210000, company: "toyota" },
  { id: 7, name: "accord", price: 220000, company: "honda" },
  { id: 8, name: "f-150", price: 260000, company: "ford" },
  { id: 9, name: "x5", price: 320000, company: "bmw" },
  { id: 10, name: "a4", price: 310000, company: "audi" },
  { id: 11, name: "model 3", price: 280000, company: "tesla" },
  { id: 12, name: "elantra", price: 190000, company: "hyundai" },
  { id: 13, name: "sonata", price: 200000, company: "hyundai" },
  { id: 14, name: "cx-5", price: 210000, company: "mazda" },
  { id: 15, name: "e-class", price: 350000, company: "mercedes" },
  { id: 16, name: "mustang mach-e", price: 300000, company: "ford" },
  { id: 17, name: "panamera", price: 600000, company: "porsche" },
  { id: 18, name: "land cruiser", price: 500000, company: "toyota" },
  { id: 19, name: "g-wagon", price: 700000, company: "mercedes" },
  { id: 20, name: "i8", price: 650000, company: "bmw" },
  { id: 21, name: "huracan", price: 900000, company: "lamborghini" },
];

app.use(express.json());
const addToCart = [];

app.get("/car", (req, res) => {
  res.status(200).send(carMenu);
});
// middleware, authentication
app.use("/admin", Auth);

app.post("/admin", (req, res) => {
  carMenu.push(req.body);
  res.status(201).send("Item added successfully");
});

app.put("/admin", (req, res) => {
  const id = req.body.id;
  const car = carMenu.find((info) => info.id === id);

  if (car) {
    car.name = req.body.name;
    car.company = req.body.company;
    car.price = req.body.price;
    res.status(200).send("update successfully");
  } else {
    res.status(404).send("item not found");
  }
});

app.delete("/admin/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = carMenu.findIndex((item) => item.id === id);
  if (index == -1) {
    res.status(400).send("item not found");
  } else {
    carMenu.splice(index, 1);
    res.status(200).send("sucessfully deleted");
  }
});

// Add to Cart
app.post("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const caritem = carMenu.find((item) => item.id === id);
  if (caritem) {
    addToCart.push(caritem);
    res.status(201).send("Item added to cart successfully");
  } else {
    res.status(404).send("Item not found");
  }
});

// Remove from Cart
app.delete("/user/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = addToCart.findIndex((item) => item.id === id);

  if (index === -1) {
    res.status(404).send("Item not found in cart");
  } else {
    addToCart.splice(index, 1);
    res.status(200).send("Item deleted from cart successfully");
  }
});

// View Cart
app.get("/user", (req, res) => {
  if (addToCart.length === 0) {
    res.send("Cart is empty");
  } else {
    res.send(addToCart);
  }
});


app.listen(4000, (req, res) => {
  console.log("listen at port 4000");
});
