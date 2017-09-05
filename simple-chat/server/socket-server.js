const io = require('socket.io')(3000);
const Events = require('./events');

io.on(Events.CONNECT, socket => {
  // Timeout we'll use for determining when to send the "stop-typing" event.
  let timeout;

  socket
    .on(Events.MESSAGE, message => {
      /* This is different from the standard emit event; it will broadcast
      to all connected sockets *except* the sender. See
      https://socket.io/docs/emit-cheatsheet/ for more info.
      */
      socket.broadcast.emit(Events.MESSAGE, message);
    })
    .on(Events.TYPING, () => {
      socket.broadcast.emit(Events.TYPING)

      clearTimeout(timeout);

      timeout = setTimeout(function() {
        socket.broadcast.emit(Events.STOP_TYPING);
      }, 320);
    })
});
