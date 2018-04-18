// In-memory database
import Room from './Room';

export default function socketHandler(socket) {

  // 1: login (connected) -> emit logined with userData
  const { nickname, avatarUrl } = socket.handshake.query;
  const id = socket.id;
  const user = { id, nickname, avatarUrl };

  socket.emit('logined', { id, nickname, avatarUrl });

  // 2: fetchRooms -> emit rooms with roomsData
  socket.on('fetchRooms', () => {
    socket.emit('rooms', Room.instances);
  })

  // 3: createRoom -> emit room with RoomData
  socket.on('createRoom', ({ title }) => {
    const room = new Room({ title, user });
    socket.emit('room', room)
  })
}
