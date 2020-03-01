//const socket = new WebSocket('ws://localhost:3001');
const socket = new WebSocket(
  "wss://gpqiufp5b5.execute-api.us-east-1.amazonaws.com/prod"
);

export function send(msg) {
  socket.send(JSON.stringify({ msg }));
}

export function addWSListener(listener) {
  socket.addEventListener("message", reply => listener(JSON.parse(reply.data)));
}

export function removeWSListener(listener) {
  socket.removeEventListener("message", listener);
}
