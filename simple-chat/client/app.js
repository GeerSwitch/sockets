(function() {
  // Same port as the server
  const socket = io('http://localhost:3000');

  const form = document.getElementById('chat-form');
  const messageInput = document.getElementById('message');

  form.addEventListener('submit', e => {
    e.preventDefault();

    socket.emit('message', messageInput.value);
    _appendMessage(messageInput.value);

    // Reset input value
    messageInput.value = '';
  });

  // Let the others know when we're typing. The server will take care of
  // the "stopped typing" as well.
  messageInput.addEventListener('input', () => {
    socket.emit('typing');
  })

  // When we get a notification from the server, add a new message item.
  const indicator = document.getElementById('indicator')
  socket
    .on('message', message => {
      _appendMessage(message, true);
      indicator.classList.add('kill');
    })
    .on('typing', () => {
      indicator.classList.remove('kill');
      indicator.classList.add('typing');
    })
    .on('stop-typing', () => {
      indicator.classList.remove('typing');
    });
})();
