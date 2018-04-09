import React, { Component } from "react";
import Client from "./Client"
import GalleryItem from "./GalleryItem"


class App extends Component {
    state = {
        connected: false,
        users: [],
        blinkyEyeMode: false
    };

    componentDidMount() {
        Client.connect(response => {
            this.setState({
                connected: response.connected,
                users: response.users
            });
            console.log('Got users from Slack:')
            console.log(this.state.users)
        });
        if (window.location.search.indexOf('experimental-blinky-eye-mode=true') !== -1) {
            console.log('Experimental blinky-eye mode')
            this.setState({
                blinkyEyeMode: true
            })
        }
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
                    return <GalleryItem key={user.id} user={user} blinkyEyeMode={this.state.blinkyEyeMode}/>;
                }
            }
            return null
        })
    }

    render() {
        return (
            <div className="App">
                <div className="ui container">
                    <h1>Browser London & Twine</h1>

                    <h4 className="ui header header--tag">
                        <img className="ui image" src="/tracy_island2.svg" alt="Slack Tracy Island logo" />
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
                        <p><strong>About:</strong> Slack Tracy Island is akin to Thunderbird’s <a
                            href="http://www.fanboy.com/wp-content/uploads/2011/08/thunderbirds.jpg">portrait
                            gallery</a> complete with <a
                            href="http://thunderbirds.wikia.com/wiki/File:Flashing_eyes.png">blinking eyes</a>.<br />
                            If your team makes use of Slack then you can get your own Slack Tracy Island running quick
                            sharp, <a href="https://bitbucket.org/browserlondon/slack-tracy-island">fork it on
                            Bitbucket.</a> F.A.B.
                        </p>
                        <hr className="most_incredible_separator"/>
                        <button className="ui circular twitter icon button big" onClick={()=>{window.location = 'https://twitter.com/intent/tweet?text=Slack+Tracy+Island%20by+@tweetsbytwine'}}>
                            <i className="twitter icon"></i>
                        </button>
                        <button className="ui basic blue button big" onClick={()=>{window.location = 'https://bitbucket.org/browserlondon/slack-tracy-island'}}>
                            <i className="fork icon"></i> Fork on Bitbucket
                        </button>
                        <button className={"ui button big " + (this.state.blinkyEyeMode ? 'active':'')} onClick={()=>{window.location = `/?experimental-blinky-eye-mode=${this.state.blinkyEyeMode ? 'false':'true'}`}}>
                            <i className="eye icon"></i>
                            Experimental blinky eye mode
                        </button>
                        <button className="ui button big green button--logo" onClick={()=>{window.location = 'http://www.twineintranet.com?ref=tracy-island'}}>
                            Workplace tools by <img src="http://www.twineintranet.com/wp-content/themes/twine2016/assets/img/twine-logo-white.svg" alt="Twine Intranet" />
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
