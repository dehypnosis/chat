import Room from './Room';

export default function socketHandler(socket) {

  // 1: login (connected) -> emit logined with userData
  const { nickname, avatarUrl } = socket.handshake.query;
  const user = { id: socket.id, nickname, avatarUrl };
  socket.emit('logined', { user });

  // 2: fetchRooms -> emit rooms with roomsData
  socket.on('fetchRooms', () => {
    socket.emit('rooms', Room.instances);
  })

  // 3: createRoom -> emit room with RoomData
  socket.on('createRoom', ({ title }) => {
    const room = Room.create({ title, user });
    if (room) {
      socket.join(room.id, () => {
        socket.emit('room', room)
      })
    }
  })

  // 4: enterRoom -> broadcast room with RoomData
  socket.on('enterRoom', ({ id }) => {
    const room = Room.enter({ id, user });
    if (room) {
      socket.join(room.id, () => {
        socket.emit('room', room) // to self
        socket.to(room.id).emit('room', room) // to others
      })
    }
  })

  // 5: leaveRoom -> broadcast room with RoomData
  const leaveRoomHandler = () => {
    const room = Room.leave({ user });
    if (room) {
      socket.leave(room.id, () => {
        socket.to(room.id).emit('room', room);
      })
    }
  };

  socket.on('leaveRoom', leaveRoomHandler)

  // unexpected disconnection
  socket.on('disconnect', leaveRoomHandler);
}
