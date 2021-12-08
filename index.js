const path = require("path");
const express = require("express");
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Start server
const server = app.listen(app.get("port"), () => {
  console.log(`server on http://localhost:${app.get("port")}`);
});

const SocketIO = require("socket.io");
const io = SocketIO(server);

// Websockets
io.on("connection", (socket) => {
  console.log("New Connection", socket.id);

  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    // broadcast antes del emit es para emitir a todos menos a mi
    socket.broadcast.emit("chat:typing", data);
  });
});
