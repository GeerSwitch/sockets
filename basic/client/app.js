(function() {
  // Same port as the server
  const socket = io('http://localhost:3000/');
  const messageList = document.getElementById('messages');

  socket
    .on('message', msg => {
      messageList.appendChild(getMessageNode(msg));
    })
    .on('disconnect', () => {
      messageList.appendChild(getMessageNode('No more messages.'));
    });

  /**
   * Appends a new element to the DOM populated with the message.
   * @param {string} msg
   * @return {HTMLElement}
   */
  function getMessageNode(msg) {
    const elem = document.createElement('p');
    const text = document.createTextNode(msg);
    elem.appendChild(text);
    return elem;
  }
})();
