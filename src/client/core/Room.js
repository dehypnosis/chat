import { observable, computed } from 'mobx'

class Room {
  @observable users = [];
  @observable messages = [];

  constructor({ id, title, users, messages }) {
    this.id = id;
    this.title = title;
    this.users = users;
    this.messages = messages;
  }
}

export default Room;
