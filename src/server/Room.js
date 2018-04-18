class Room {
  static instances = [];

  static clearEmptyRooms() {
    const at = parseInt((new Date()).getTime()/1000) - 60*60; // 60min ago
    for (let i = 0; i < Room.instances.length; i++) {
      let room = Room.instances[i];
      if (room.users.length > 0) continue;

      const lastMessage = room.messages[room.messages.length - 1];
      if (!lastMessage || lastMessage.at < at) {
        Room.instances.splice(i, 1);
        i--;
      }
    }
  }

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

  static message({ id, user, content }) {
    const room = Room.instances.find(room => room.id == id);
    if (room) {
      const message = {
        id: (room.messages[room.messages.length - 1] || { id: 0}).id + 1,
        user,
        content,
        at: parseInt((new Date()).getTime()/1000),
      };
      room.messages = room.messages.slice(-9).concat(message);

      return message;
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
