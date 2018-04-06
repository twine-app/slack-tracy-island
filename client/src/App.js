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
    isUserGalleryable(user) {
        return !user.is_bot &&
            user.name !== 'slackbot' &&
            !user.deleted
    }

    renderActiveGallery(displayActive) {
        return this.state.users.map((user) => {
            if (this.isUserGalleryable(user)) {
                if (
                    (displayActive && user.presence === 'active') ||
                    (!displayActive && user.presence !== 'active')
                ){
                    return <GalleryItem user={user}/>;
                }
            }
        })
    }

    render() {
        console.log(this.state.users)
        return (
            <div className="App">
                <div className="ui container">
                    <h1>Tracy Island</h1>
                    <h2>Active</h2>
                    <div className="ui stackable four column grid">
                        {this.renderActiveGallery(true)}
                    </div>
                    <h2>Away</h2>
                    <div className="ui stackable four column grid">
                        {this.renderActiveGallery(false)}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
