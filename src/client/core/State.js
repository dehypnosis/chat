import { observable, computed, action } from 'mobx'
import User from './User';
import Room from './Room';

class State {
  @observable user = null;
  @observable rooms = [];
  @observable activeRoomId = null;
  @observable roomFixed = false;

  @computed get activeRoom() {
    return this.activeRoomId && this.rooms.find(room => room.id == this.activeRoomId);
  }

  @action setUser = (userData = {}) => {
    this.user = new User(userData);
  }

  @action setRooms = (roomsData = []) => {
    this.rooms = roomsData.map(roomData => new Room(roomData));
  }

  @action setActiveRoomId = (id) => {
    this.activeRoomId = id;
  }

  @action updateActiveRoom = (roomData = {}) => {
    if (this.activeRoom) {
      this.activeRoom.update(roomData);
    }
  }

  @action createRoom = (roomData = {}) => {
    const room = new Room(roomData);
    this.rooms = [...this.rooms, room];
    this.activeRoomId = room.id;
  }

  constructor({ activeRoomId = null } = {}) {
    if (!isNaN(activeRoomId)) {
      this.activeRoomId = activeRoomId;
      this.roomFixed = true;
    }
  }
}

export default State;
