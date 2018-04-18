import React from 'react';
import { observer } from 'mobx-react';
import { dummyRooms } from '../core/data';

@observer
export default class Lobby extends React.Component {
  state = { loading: true };

  componentDidMount() {
    // TODO: fetch rooms
    setTimeout(() => {
      this.props.setRooms(dummyRooms)
      this.setState(state => ({...state, loading: false}))
    }, 500)
  }

  enterRoom = (room) => {
    this.props.setActiveRoomId(room.id);
  }

  render() {
    const { rooms } = this.props;

    return (
      <div className='chat-lobby'>
        <h1>LOBBY</h1>
        <ul>
          {this.state.loading ? (
            <li>채팅방 목록을 불러오는 중...</li>
          ) : rooms.map(room => (
            <li
              key={room.id}
              onClick={() => this.enterRoom(room)}
            >
              <span>{room.title} <small>({room.users.length.toLocaleString()})</small></span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
