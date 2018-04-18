import React from 'react';
import { observer } from 'mobx-react';
import { Card, Header, Form, Button, Input, Image, Dimmer, Loader, List } from 'semantic-ui-react';

@observer
export default class Lobby extends React.Component {
  state = { loading: true, creatingRoom: false, roomTitle: null };

  componentDidMount() {
    this.props.enterLobby()
      .then(rooms => {
        this.setState(state => ({...state, loading: false}))
        if (this.props.rooms.length == 0) {
          this.roomTitleInputRef.focus();
        }
      })
  }

  componentWillUnmount() {
    this.props.leaveLobby();
  }

  enterRoom = (room) => {
    this.props.enterRoomById(room.id);
  }

  createRoom = (e) => {
    e.preventDefault();

    const title = this.state.roomTitle && this.state.roomTitle.trim();

    if (this.state.creatingRoom || !title) return this.roomTitleInputRef.focus();

    this.setState(state => ({...state, creatingRoom: true}))
    this.props.createRoom({ title });
  }

  setRoomTitle = (roomTitle) => {
    this.setState(state => ({...state, roomTitle}))
  }

  render() {
    const { rooms } = this.props;

    return (
      <Card fluid raised>
        <Card.Content
          header={
            <Header content='입장 할 채팅방을 선택하세요.' icon='comments' />
          }
          description={
            <Dimmer.Dimmable className='flex-vert'>
              <Dimmer active={this.state.loading && rooms.length == 0} inverted>
                <Loader size='large' />
              </Dimmer>

              <List selection relaxed='very' className='flex-top'>
                {rooms.length > 0 ? rooms.map(room => (
                  <List.Item
                    key={room.id}
                    onClick={() => this.enterRoom(room)}
                  >
                    <List.Content>
                      <List.Header as='h3' className='elipsis'>{room.title}</List.Header>
                      <List.Description>{room.users.length.toLocaleString()}명 접속 중</List.Description>
                    </List.Content>
                  </List.Item>
                )) : (
                  <List.Item style={{cursor: 'default', background: 'none'}}>
                    <List.Content>
                      <List.Description>개설된 채팅방이 없습니다.</List.Description>
                    </List.Content>
                  </List.Item>
                )}
              </List>

              <List.Item className='flex-bottom'>
                <form onSubmit={this.createRoom}>
                  <Input
                    fluid
                    ref={ref => this.roomTitleInputRef = ref}
                    size='large'
                    action={{content: '개설하기', color: !this.state.loading && rooms.length == 0 ? 'blue' : null}}
                    placeholder='또는 개설 할 채팅방의 제목을 입력하세요.'
                    value={this.state.roomTitle}
                    onChange={e => this.setRoomTitle(e.target.value)}
                  />
                  <input type='submit' style={{display: 'none'}} />
                </form>
              </List.Item>
            </Dimmer.Dimmable>
          }
        />
      </Card>
    )
  }
}
