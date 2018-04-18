import React from 'react';
import { observer } from 'mobx-react';
import { dummyRooms } from '../core/data';

@observer
export default class Lobby extends React.Component {
  state = { loading: true, creatingRoom: false, roomTitle: null };

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

  createRoom = () => {
    if (this.state.creatingRoom) return;
    this.setState(state => ({...state, creatingRoom: true}))
    // TODO: create room and enter room
  }

  setRoomTitle = (roomTitle) => {
    this.setState(state => ({...state, roomTitle}))
  }

  render() {
    const { rooms } = this.props;

    return (
      <div className='chat-lobby'>
        <h1>LOBBY</h1>
        <ul>
          {this.state.loading && rooms.length == 0 ? (
            <li>채팅방 목록을 불러오는 중...</li>
          ) : rooms.map(room => (
            <li
              key={room.id}
              onClick={() => this.enterRoom(room)}
            >
              <span>{room.title} <small>({room.users.length.toLocaleString()})</small></span>
            </li>
          ))}
          <li>
            <input
              type='text'
              value={this.state.roomTitle}
              onChange={e => this.setRoomTitle(e.target.value)}
              placeholder='새로운 채팅방 제목'
            />
            <button onClick={this.createRoom}>개설하기</button>
          </li>
        </ul>
      </div>
    )
  }
}
