const WebSocket = require("ws");
const server = new WebSocket.Server({
  port: 3406,
});
const app = require("./app").module;
const servePort = 3407;

app.listen(servePort, (err) => {
  err ? console.log(err) : console.log(`Listening on port ${servePort}.`);
});

let sockets = [];
server.on("connection", function (socket) {
  sockets.push(socket);

  // When you receive a message, send that message to every socket.
  socket.on("message", function (msg) {
    sockets.forEach((s) => s.send(msg));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on("close", function () {
    sockets = sockets.filter((s) => s !== socket);
  });
});
