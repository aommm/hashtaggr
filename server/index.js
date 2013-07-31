var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , _ = require('underscore');

app.listen(80);

var handler = function(req, res) {};

var clients = [];

io.sockets.on('connection', function (socket) {

  // Super-secure handshaking algorithm
  socket.emit('welcome', "How ya doing? Welcome to the neighbourhood!");
  socket.on('thanks', function (data) {
    clients.push(socket);
    console.log("Client connected. Clients online:", clients.length);
  });
  socket.on('disconnect', function() {
    var index = clients.indexOf(socket);
    if (index>=0) {
      clients.splice(index, 1);
      console.log("Client disconnected. Clients online:", clients.length);
    }
  });


  // Actions!
  socket.on('get connected count', function() {
    socket.emit('connected count', clients.length);
  });

});