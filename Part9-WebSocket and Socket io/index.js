const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");

const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (data) => {
    // io.emit("new-message", data); // send message to everyone
    socket.broadcast.emit("new-message", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(4000, () => {
  console.log("listening at port 4000");
});
