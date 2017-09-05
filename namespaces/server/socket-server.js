const io = require('socket.io')(3000);
const Events = require('./events');

// Create our namespaces
const globalNs = io.of('/global');
const userNs = io.of('/users');

globalNs.on(Events.CONNECT, socket => {
  console.log('Global conenction');
  socket.emit(Events.MESSAGE, 'Connected to global socket.');

  // This namespace will get disconnected, but we are still receiving
  // events from the /users namespace.
  setTimeout(() => {
    socket.emit(Events.MESSAGE, 'Disconnected from the global pool.');
    socket.disconnect();
  }, 1000);
});

let usersOnline = 0;
userNs.on(Events.CONNECT, socket => {
  usersOnline++;
  socket.emit(Events.MESSAGE, `There are now ${usersOnline} user(s) here.`);

  // Clean up once a socket disconnects.
  socket.on(Events.DISCONNECT, () => {
    usersOnline = 0;
  });

  setTimeout(() => {
    socket.emit(Events.MESSAGE, `I see you're still here!`)
  }, 3000);
});
