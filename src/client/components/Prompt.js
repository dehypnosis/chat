import React from 'react';
import { observer } from 'mobx-react';
import { avatarUrls } from '../core/data';

@observer
export default class Prompt extends React.Component {
  state = { loading: false, avatarUrl: avatarUrls[0], nickname: null };

  setAvatarUrl = (avatarUrl) => {
    if (this.state.loading) return;
    this.setState(state => ({...state, avatarUrl}))
  }

  setNickname = (nickname) => {
    if (this.state.loading) return;
    this.setState(state => ({...state, nickname}))
  }

  submit = (e) => {
    e.preventDefault();

    const { avatarUrl, nickname, loading } = this.state;
    if (loading) return;

    this.setState(state => ({...state, loading: true }))

    // TODO: login as and set this.props.state.user
    setTimeout(() => {
      this.props.setUser({ id: 9999, nickname, avatarUrl });
    }, 500);
  }

  componentDidMount() {
    this.nicknameInputRef.focus();
  }

  render() {
    return (
      <div className='chat-prompt'>
        <h1>PROMPT</h1>
        <form onSubmit={this.login}>
          <div>
            <input
              ref={ref => this.nicknameInputRef = ref}
              type='text'
              value={this.state.nickname}
              placeholder='이름'
              onChange={(e) => this.setNickname(e.target.value)}
            />
          </div>
          <div>
            <ul>
              {avatarUrls.map((avatarUrl, key) => (
                <li key={key}>
                  <img
                    src={avatarUrl}
                    width={this.state.avatarUrl == avatarUrl ? 80 : 40}
                    onClick={() => this.setAvatarUrl(avatarUrl)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              type='submit'
              onClick={this.submit}
              value='입장하기'
              disabled={this.state.loading}
            />
          </div>
        </form>
      </div>
    )
  }
}
