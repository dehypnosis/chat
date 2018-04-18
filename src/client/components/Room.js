import React from 'react';
import { observer } from 'mobx-react';
import { Card, Header, Form, Button, Input, Image, Dimmer, Loader, Feed, List } from 'semantic-ui-react';

@observer
export default class Room extends React.Component {
  state = { message: null, loading: false, sending: false };

  componentDidMount() {
    this.inputMessageInputRef.focus()
  }

  scrollMessagesContainerToBottom = () => {
    // smooth scroll
    if (this.messagesContainerRef.scrollIntoView) {
      const lastMessageRef = this.messagesContainerRef.lastElementChild.lastElementChild;
      if (lastMessageRef && lastMessageRef.scrollIntoView) {
        lastMessageRef.scrollIntoView({behavior: 'smooth'})
        return;
      }
    }

    // fallback
    this.messagesContainerRef.scrollTo(0, this.messagesContainerRef.scrollHeight);
  }

  setMessage = (message) => {
    this.setState(state => ({...state, message}))
  }

  submit = (e) => {
    e.preventDefault();

    if (this.state.sending) return;

    const message = this.state.message && this.state.message.trim();
    if (!message) return;

    this.setState(state => ({...state, sending: true}));

    // TODO: send message to server
    setTimeout(() => {
      this.props.room.appendMessage({
        id: this.props.room.messages.length + 1000,
        user: JSON.parse(JSON.stringify(this.props.user)),
        content: message,
        at: parseInt((new Date).getTime()/1000),
      })
      this.setState(state => ({...state, message: null}))
      this.scrollMessagesContainerToBottom();
      this.inputMessageInputRef.focus();

      // forbide too much talker
      setTimeout(() => {
        this.setState(state => ({...state, sending: false}))
      }, 500)
    }, 200);
  }

  render() {
    const { room } = this.props;

    return (
      <Card fluid raised>
        <Card.Content
          header={
            <Header
              icon='comments'
              style={{position: 'relative'}}
              content={
                !room ? '...' : (
                  <div>
                    <Button style={{position: 'absolute', right: '0'}} compact size='mini' onClick={this.props.leave}>나가기</Button>
                    <span>{room.title}</span>
                  </div>
                )
              }
            />
          }
          description={
            <Dimmer.Dimmable className='flex-vert'>
              <Dimmer active={this.state.loading} inverted>
                <Loader size='large' />
              </Dimmer>

              <div className='flex-top flex-hori'>
                <div className='flex-left' ref={ref => this.messagesContainerRef = ref}>
                  <Feed size='small'>
                    {room && room.messages.map(message => (
                      <Feed.Event
                        key={message.id}
                      >
                        <Feed.Label image={message.user.avatarUrl} />
                        <Feed.Content>
                          <Feed.Summary>
                            {message.user.nickname}
                            <Feed.Date>{message.at.toLocaleString()}</Feed.Date>
                          </Feed.Summary>
                          <Feed.Extra text>{message.content}</Feed.Extra>
                        </Feed.Content>
                      </Feed.Event>
                    ))}
                  </Feed>
                </div>

                <div className='flex-right'>
                  <Header size='small'>
                    <span>{room ? room.users.length.toLocaleString() : 0}명 접속 중</span>
                  </Header>
                  <List>
                    {room && room.users.map(user => (
                      <List.Item key={user.id}>
                        <div className='elipsis'>
                          <Image avatar src={user.avatarUrl} width={20} />
                          <span>{user.nickname}</span>
                        </div>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </div>

              <form onSubmit={this.submit} className='flex-bottom'>
                <Input
                  fluid
                  action={{content: '보내기', color: 'blue', icon: 'send'}}
                  size='large'
                  ref={ref => this.inputMessageInputRef = ref}
                  placeholder='메세지를 입력하세요.'
                  value={this.state.message}
                  onChange={e => this.setMessage(e.target.value)}
                  disabled={this.state.loading}
                />
              </form>
            </Dimmer.Dimmable>
          }
        />
      </Card>
    )
  }
}
