const socket = new WebSocket(__WS_URL__);

export function send(msg) {
  socket.send(JSON.stringify({ msg }));
}

export function addWSListener(listener) {
  socket.addEventListener("message", reply => listener(JSON.parse(reply.data)));
}

export function removeWSListener(listener) {
  socket.removeEventListener("message", listener);
}
