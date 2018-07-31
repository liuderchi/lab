var io = require('socket.io')();
var jwt = require('jsonwebtoken');

io.use(function(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(
      err,
      decoded,
    ) {
      if (err) return next(new Error('Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', function(socket) {
  // Connection now authenticated to receive further events

  socket.on('message', function(message) {
    io.emit('message', message);
  });
});
