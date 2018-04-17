import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DevTool from 'mobx-react-devtools';

@observer
export default class App extends React.Component {
  render() {
    return (
      <div>
        <DevTool />
        <h1>{JSON.stringify(toJS(this.props.state))}</h1>
      </div>
    );
  }
}
