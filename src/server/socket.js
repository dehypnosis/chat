export default function socketHandler(socket) {

  // 1: login (connected)
  const { nickname, avatarUrl } = socket.handshake.query;
  const id = socket.id;

  // 1: login -> emit logined with userData
  socket.emit('logined', { id, nickname, avatarUrl });
}
