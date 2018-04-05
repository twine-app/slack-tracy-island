import React, { Component } from "react";
import Client from "./Client"
import GalleryItem from "./GalleryItem"


class App extends Component {
    state = {
        connected: false,
        users: []
    };

  componentDidMount() {
      Client.connect(response => {
          this.setState({
              connected: response.connected,
              users: response.users
          });
      });
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <div className="ui text container">
            {this.state.connected ? 'yeah' : 'nah'}
            <ul>
                {this.state.users.map(function(user){
                    if (
                        !user.is_bot &&
                        user.name !== 'slackbot' &&
                        !user.profile.image_24.includes('secure.gravatar.com')
                    ) {
                        return <GalleryItem user={user}/>;
                    }

                })}
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
