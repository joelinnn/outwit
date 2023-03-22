require('dotenv').config();
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");

const app = express()
const server = http.createServer();

// ------------------- CONNECT TO DATABASE -------------------------- //
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
})

// ------------------- CONNECT TO SOCKET.IO SERVER -------------------------- //
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    io.emit("message", message); // broadcast message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3001, () => {
  console.log("Socket.io server listening on port 3001");
});

// ------------------- EXPRESS MIDDLEWARE -------------------------- //

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(3002, () => {
  console.log("Server listening on port 3002");
})