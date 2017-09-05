window._appendMessage = (function() {
  // DOM manipulation
  const messageList = document.getElementById('messages');
  // These are to be re-used
  const div = document.createElement('div');
  const p = document.createElement('p');
  /**
   * Appends a new element to the DOM populated with the message.
   * @param {string} msg
   * @param {boolean} isTheirs If this message was received from the other user.
   * @return {HTMLElement}
   */
  return function(msg, isTheirs) {
    const newDiv = div.cloneNode();
    const newP = p.cloneNode();
    const text = document.createTextNode(msg);

    newDiv.classList.add('message');
    if (isTheirs === true) {
      newDiv.classList.add('theirs');
    }
    newP.appendChild(text);
    newDiv.appendChild(newP);
    
    messageList.insertBefore(newDiv, indicator)
    newDiv.classList.add('animate')
  }
})();