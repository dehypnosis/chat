import { observable, computed } from 'mobx'

class State {
  @observable user = null;
  @observable rooms = [];
  @observable activeRoomId = null;
  @observable roomFixed = false;
  @computed get activeRoom() {
    return this.activeRoomId && this.rooms.find(room => room.id == this.activeRoomId);
  }

  constructor({ activeRoomId = null } = {}) {
    if (!isNaN(activeRoomId)) {
      this.activeRoomId = activeRoomId;
      this.roomFixed = true;
    }
  }
}

export default State;
