const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on("chat_message", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit("chat_message", msg);
  });
});

const PORT = process.env.PORT || 7000;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
