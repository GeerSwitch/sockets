const io = require('socket.io')(3000);
const Events = require('./events');

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dictum nec justo eu tincidunt. Mauris laoreet sollicitudin justo a gravida. Sed et nunc velit. Sed sodales at nisl vel sollicitudin. In varius non est non dictum.'.split('.');

io.on(Events.CONNECT, socket => {
  socket.emit(Events.MESSAGE, 'Socket connected.');

  /*
   * Iterate over the lorem array and emit a new message
   * every second. Disconnect when no more messages exist.
   */
  let index = 0;
  const interval = setInterval(() => {
    if (index == lorem.length) {
      clearInterval(interval);
      socket.disconnect();
      return;
    }
    socket.emit(Events.MESSAGE, lorem[index]);
    index++;
  }, 1000);
})