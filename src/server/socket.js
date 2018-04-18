import Room from './Room';

const LOBBY_ROOM_ID = 'LOBBY';

export default function createSocketHanlder(io) {

  // ** clear empty rooms in interval globally
  if (global.clearEmptyRoomsInterval) clearInterval(global.clearEmptyRoomsInterval);
  global.clearEmptyRoomsInterval = setInterval(() => {
    Room.clearEmptyRooms();
    io.to(LOBBY_ROOM_ID).emit('rooms', Room.instances);
  }, 1000);

  return function socketHandler(socket) {

    // 1: login (connected) -> emit logined with userData
    const { nickname, avatarUrl } = socket.handshake.query;
    const user = { id: socket.id, nickname, avatarUrl };
    socket.emit('logined', { user });

    // 2: enterLobby -> join LOBBY channel, and initially emit rooms with roomsData
    socket.on('enterLobby', () => {
      socket.join(LOBBY_ROOM_ID, () => {
        socket.emit('rooms', Room.instances);
      })
    })

    // 2.5: leaveLobby -> leave LOBBY channel
    socket.on('leaveLobby', () => {
      socket.leave(LOBBY_ROOM_ID);
    })

    // 3: createRoom -> emit room with RoomData
    socket.on('createRoom', ({ title }) => {
      const room = Room.create({ title, user });
      if (room) {
        socket.join(room.id, () => {
          socket.emit('room', room)
          socket.to(LOBBY_ROOM_ID).emit('rooms', Room.instances);
        })
      }
    })

    // 4: enterRoom -> broadcast room with RoomData
    socket.on('enterRoom', ({ id }) => {
      const room = Room.enter({ id, user });
      if (room) {
        socket.join(room.id, () => {
          socket.emit('room', room) // to self
          socket.to(room.id).emit('room', room) // to other members
          socket.to(LOBBY_ROOM_ID).emit('rooms', Room.instances); // to lobby
        })
      }
    })

    // 5: leaveRoom -> broadcast room with RoomData
    const leaveRoomHandler = () => {
      const room = Room.leave({ user });
      if (room) {
        socket.leave(room.id, () => {
          socket.to(room.id).emit('room', room); // to other members
          socket.to(LOBBY_ROOM_ID).emit('rooms', Room.instances); // to lobby
        })
      }
    };

    socket.on('leaveRoom', leaveRoomHandler)

    // unexpected disconnection
    socket.on('disconnect', leaveRoomHandler);


    // 6: message -> broadcast room with RoomData (messages)
    socket.on('message', ({ id, content }) => {
      const message = Room.message({ id, user, content });
      if (message) {
        const roomData = { message };
        socket.emit('room', roomData); // to self
        socket.to(id).emit('room', roomData); // to other members
      }
    })
  }
}
