var socket = io.connect('http://localhost');

// Super-secure handshake algorithm
socket.on('welcome', function (data) {
  console.log("Server welcomed us");
  socket.emit('thanks', "Thanks a lot!");
});


// Actions!
socket.on('connected count', function(count) {
  alert("total connections to server:",count);
})


// Ask for total # of connections
window.getConnectedCount = function() {
  socket.emit('get connected count');
}