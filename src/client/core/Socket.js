import io from 'socket.io-client';

class Socket {
  constructor({ state }) {
    this.io = null;
    this.state = state;
  }

  login = ({ nickname, avatarUrl }) => {
    return new Promise((resolve, reject) => {

      // connect to ws server
      console.log('login', { nickname, avatarUrl })
      this.io = io(window.location.origin, {
        query: { nickname, avatarUrl },
      });

      // wait logined event
      this.io.once('logined', (userData) => {
        console.log('logined', userData);
        this.state.setUser(userData);
        resolve();
      })
    })
  }

  fetchRooms = () => {
    return new Promise((resolve, reject) => {
      console.log('fetchRooms')
      this.io.emit('fetchRooms');

      this.io.once('rooms', (roomsData) => {
        console.log('rooms', roomsData);
        this.state.setRooms(roomsData);
        resolve();
      })
    })
  }

  createRoom = ({ title }) => {
    return new Promise((resolve, reject) => {
      console.log('createRoom', { title })
      this.io.emit('createRoom', { title })

      this.io.once('room', (roomData) => {
        console.log('createRoom -> room', roomData);
        this.state.createRoom(roomData);

        this.io.on('room', (roomData) => {
          console.log('room', roomData);
          this.state.updateActiveRoom(roomData);
        })
      })
    })
  }

  enterRoom = ({ id }) => {
    return new Promise((resolve, reject) => {
      console.log('enterRoom', { id })
      this.io.emit('enterRoom', { id })

      this.io.once('room', (roomData) => {
        console.log('enterRoom -> room', roomData);
        this.state.setActiveRoomId(id);
        this.state.updateActiveRoom(roomData);

        this.io.on('room', (roomData) => {
          console.log('room', roomData);
          this.state.updateActiveRoom(roomData);
        })
      })
    })
  }

  leaveRoom = () => {
    return new Promise((resolve, reject) => {
      console.log('leaveRoom')
      this.io.emit('leaveRoom');
      this.io.off('room');
      this.state.setActiveRoomId(null);
    })
  }
}

export default Socket;
