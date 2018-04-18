import { observable, computed, action } from 'mobx'
import User from './User';
import Message from './Message';

class Room {
  @observable users = [];
  @observable messages = [];

  @action update = ({ title, users, message, messages }) => {
    if (title) this.title = title;
    if (users) this.users = users.map(userData => new User(userData));
    if (message) this.messages.push(new Message(message));
    if (messages) {
      const currentLastMessage = this.messages[this.messages.length - 1] || { id: -1 };
      this.messages = this.messages.concat(
        messages.filter(message => message.id > currentLastMessage.id).map(message => new Message(message))
      );
    }
  }

  constructor({ id, title, users, messages }) {
    this.id = id;
    this.update({ title, users, messages });
  }
}

export default Room;
