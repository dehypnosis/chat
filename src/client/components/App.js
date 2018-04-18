import React from 'react';
import { observer } from 'mobx-react';
import Prompt from './Prompt';
import Lobby from './Lobby';
import Room from './Room';

@observer
export default class App extends React.Component {
  render() {
    const { state } = this.props;

    if (!state.user) {
      return (
        <Prompt
          setUser={state.setUser}
        />
      )

    } else if (!state.activeRoomId) {
      return (
        <Lobby
          user={state.user}
          rooms={state.rooms}
          setRooms={state.setRooms}
          setActiveRoomId={state.setActiveRoomId}
        />
      )

    } else {
      return (
        <Room
          user={state.user}
          roomId={state.activeRoomId}
          room={state.activeRoom}
          update={state.updateActiveRoom}
          exit={() => state.setActiveRoomId(null)}
        />
      )
    }
  }
}
