// In-memory database
const rooms = [];


export default function socketHandler(socket) {

  // 1: login (connected) -> emit logined with userData
  const { nickname, avatarUrl } = socket.handshake.query;
  const id = socket.id;

  socket.emit('logined', { id, nickname, avatarUrl });

  // 2: fetchRooms -> emit rooms with roomData
  socket.on('fetchRooms', () => {
    socket.emit('rooms', rooms);
  })
}
