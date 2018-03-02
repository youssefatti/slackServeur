var express = require("express");
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server);

const messages = [];

app.get("/", function(req, res) {
  res.send("<html><body><h2>Welcome to Slack</h2></body></html>");
});

app.get("/about", function(req, res) {
  res.send("<html><body><h1>About page</h1></body></html>");
});

io.on("connection", function(socket) {
  console.log("Someone is connected");
  //console.log(socket);
  socket.on("new_message", data => {
    console.log("reception de message : ", data);

    messages.push(data.message);

    socket.message = messages;
    io.emit("send_message", socket.message);
    console.log("message qui sera transmit : ", socket.message);
  });
});

// d'autres écouteurs peuvent être créés ici `client.on(...);`

server.listen(3000, () => console.log(`Listening on port`));
