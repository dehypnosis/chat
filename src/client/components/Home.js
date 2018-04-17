import React from 'react';
import {observer} from 'mobx-react';

@observer 
export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Hello from Home Component</h2>
      </div>
    )
  }
}