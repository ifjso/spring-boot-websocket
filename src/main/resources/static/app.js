let stompClient = null;

document.addEventListener('DOMContentLoaded', init);

function init() {
  document.querySelectorAll('form').forEach(form =>
      form.addEventListener('submit', function(e) {
        e.preventDefault();
      }));
  document.getElementById('connect').addEventListener('click', function() { connect(); });
  document.getElementById('disconnect').addEventListener('click', function() { disconnect(); });
  document.getElementById('send').addEventListener('click', function() { sendName(); });
}

function connect() {
  const socket = new SockJS('/gs-guide-websocket');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/greetings', function (greeting) {
      showGreeting(JSON.parse(greeting.body).content);
    });
  });
}

function showGreeting(message) {
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.innerHTML = message;
  tr.appendChild(td);
  document.getElementById('greetings').appendChild(tr);
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  console.log('Disconnected');
}

function setConnected(connected) {
  document.getElementById('connect').disabled = connected;
  document.getElementById('disconnect').disabled = !connected;
  if (connected) {
    document.getElementById('conversation').style.display = 'table';
  } else {
    document.getElementById('conversation').style.display = 'none';
  }
  document.getElementById('greetings').innerHTML = '';
}

function sendName() {
  stompClient.send('/app/hello',
      {},
      JSON.stringify({ name: document.getElementById('name').value }))
}
