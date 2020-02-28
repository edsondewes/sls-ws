const socket = new WebSocket('ws://localhost:3001');

export function send(msg) {
  socket.send(JSON.stringify({ msg }));
}

export function addWSListener(listener) {
  socket.addEventListener('message', (reply) => listener(JSON.parse(reply.data)));
}

export function removeWSListener(listener) {
  socket.removeEventListener('message', listener);
}