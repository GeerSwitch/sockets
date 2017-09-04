(function() {
  // Create two connections referencing two different namespaces
  const global = io('http://localhost:3000/global');
  const users = io('http://localhost:3000/users');

  const messageList = document.getElementById('messages');

  // Global namespace events
  global.on('message', msg => {
    messageList.appendChild(getMessageNode(msg));
  });

  // User namespace events
  users.on('message', msg => {
    messageList.appendChild(getMessageNode(msg, 'user'));
  });

  /**
   * Appends a new element to the DOM populated with the message.
   * @param {string} msg Type of message, either "user" or "global"
   * @return {HTMLElement}
   */
  function getMessageNode(msg, type) {
    const className = type == 'user' ? 'msg--user' : 'msg--global';

    const elem = document.createElement('p');
    const text = document.createTextNode(msg);

    elem.className = className;
    elem.appendChild(text);
    return elem;
  }
})();
