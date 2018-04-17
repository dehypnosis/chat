import React from 'react';
import {observer} from 'mobx-react';

import DevTool from 'mobx-react-devtools';

@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <DevTool />
        <h1>Hello from App Component!</h1>
        {this.props.children}
      </div>
    );
  }
}