import React from "react";


class GalleryItem extends React.Component {
    render() {
        let d = new Date()
        d.setTime(d.getTime() + ((d.getTimezoneOffset() * 60)*1000) + (this.props.user.tz_offset * 1000))

        let timezone = `${((this.props.user.tz_offset / 60) + d.getTimezoneOffset()) / 60}hr`
        timezone = this.props.user.tz_offset > 0 ? `+${timezone}` : `${timezone}`

        return (
            <div className="column">
                <div className="frame">
                    <img className="gallery_item" alt={this.props.user.real_name} src={this.props.user.profile.image_192} />
                </div>
                <div className="ui label">
                    {this.props.user.real_name}<span className="detail">{this.props.user.profile.title}</span>
                    {this.props.user.tz !== 'Europe/London' && <div>🌎 {`${d.getHours()}:${d.getMinutes()}` } ({timezone})</div> }
                </div>
            </div>
        );
    }
}

export default GalleryItem;
