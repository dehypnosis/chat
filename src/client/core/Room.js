import { observable, computed, action } from 'mobx'
import User from './User';
import Message from './Message';

class Room {
  @observable users = [];
  @observable messages = [];

  @action update = ({ title, users, messages }) => {
    if (title) this.title = title;
    if (users) this.users = users.map(userData => new User(userData));
    if (messages) this.messages = messages.map(messageData => new Message(messageData));
  }

  @action appendMessage = (messageData = {}) => {
    this.messages = [...this.messages, new Message(messageData)]
  }

  constructor({ id, title, users, messages }) {
    this.id = id;
    this.update({ title, users, messages });
  }
}

export default Room;
