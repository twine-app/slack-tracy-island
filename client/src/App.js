import React, { Component } from "react";
import Client from "./Client"

class App extends Component {
  state = {
    connected: false
  };

  componentDidMount() {
      Client.connect(response => {
          this.setState({
              connected: response.connected
          });
      });
  }

  render() {

    return (
      <div className="App">
        <div className="ui text container">
            {this.state.connected ? 'yeah' : 'nah'}
        </div>
      </div>
    );
  }
}

export default App;
