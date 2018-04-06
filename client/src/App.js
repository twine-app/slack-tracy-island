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
                    <h1>Browser London & Twine</h1>

                    <h4 className="ui header header--tag">
                        <img className="ui image" src="/tracy_island2.svg" />
                        <div className="content">
                            Slack Tracy Island
                        </div>
                    </h4>

                    <h3 className="ui center aligned icon header">
                        <i className="circular users icon"></i>
                        Reporting for duty
                    </h3>
                    <div className="ui stackable four column grid">
                        {this.renderActiveGallery(true)}
                    </div>
                    <h3 className="ui center aligned icon header">
                        <i className="circular bell slash icon"></i>
                        Away
                    </h3>
                    <div className="ui stackable four column grid gallery--inactive">
                        {this.renderActiveGallery(false)}
                    </div>
                    <footer className="ui">
                        <p><strong>About:</strong> Slack Tracy Island is akin to Thunderbird’s portrait gallery. However we couldn’t
                            get the eyes to light up in the two day hackathon.<br/>
                            Fork the repo on <a href="#">Bitbucket</a> to getting it working for your team. F.A.B.</p>
                        <hr/>
                        <button className="ui circular twitter icon button big" onClick={()=>{window.location = 'https://twitter.com/intent/tweet?text=Slack+Tracy+Island%20by+@tweetsbytwine'}}>
                            <i className="twitter icon"></i>
                        </button>
                        <div className="ui basic blue button big" onClick={()=>{window.location = 'http://bitbucket.org/browserlondon/'}}>
                            <i className="fork icon"></i> Fork on Bitbucket
                        </div>
                        <div className="ui button big green button--logo" onClick={()=>{window.location = 'http://www.twineintranet.com'}}>
                            Workplace tools by <img src="http://www.twineintranet.com/wp-content/themes/twine2016/assets/img/twine-logo-white.svg" alt="Twine Intranet" />
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
