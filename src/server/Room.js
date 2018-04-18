class Room {
  static instances = [];

  constructor({ title, user }) {
    this.id = Room.instances.length + 1; // count from 1
    this.title = title;
    this.users = [user];
    this.messages = [];
    Room.instances.unshift(this);
  }
}

export default Room;
