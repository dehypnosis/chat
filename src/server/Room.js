class Room {
  static instances = [];

  static create(args) {
    return new Room(args);
  }

  static enter({ id, user }) {
    const room = Room.instances.find(room => room.id == id);
    if (room) {
      if (!room.users.find(u => u.id == user.id)) {
        room.users.push(user);
      }
      return room;
    }
    return null;
  }

  static leave({ user }) {
    let userIndex = -1;
    const room = Room.instances.find(room => {
      userIndex = room.users.findIndex(u => u.id == user.id);
      return userIndex != -1;
    });
    if (room) {
      room.users.splice(userIndex, 1);
      return room;
    }
    return null;
  }

  constructor({ title, user }) {
    this.id = Room.instances.length + 1; // count from 1
    this.title = title;
    this.users = [user];
    this.messages = [];
    Room.instances.unshift(this);
  }
}

// make Room.instances as global (for hot-reloading's sake)
if (!global.ROOM_INSTANCES) {
  global.ROOM_INSTANCES = [];
}
Room.instances = global.global.ROOM_INSTANCES;

export default Room;
