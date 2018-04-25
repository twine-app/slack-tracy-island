import React from "react";


class GalleryItem extends React.Component {
    render() {

        // TODO: Ew, should have used a date library.
        let d = new Date()
        d.setTime(d.getTime() + ((d.getTimezoneOffset() * 60)*1000) + (this.props.user.tz_offset * 1000))

        const isMorning = d.getHours() < 12

        let timezone = `${((this.props.user.tz_offset / 60) + d.getTimezoneOffset()) / 60}hr`
        timezone = this.props.user.tz_offset > 0 ? `+${timezone}` : `${timezone}`

        return (
            <div className="four wide computer eight wide mobile eight wide tablet column">
                <div className="frame">
                    <img id={`image-${this.props.user.id}`} className="gallery_item" alt={this.props.user.real_name} src={this.props.user.profile.image_192} />
                </div>
                <div className="ui label label--frame">
                    {this.props.user.real_name && this.props.user.real_name !== '' &&
                        <span className="label__real_name">{this.props.user.real_name}</span>
                    }
                    {this.props.user.profile.title && this.props.user.profile.title !== '' &&
                        <span className="label__title">{this.props.user.profile.title}</span>
                    }
                    {this.props.user.tz !== 'Europe/London' &&
                        <span className="label__tz">🌎 {`${d.getHours()}:${d.getMinutes()}${isMorning ? 'AM' : 'PM'}` } ({timezone})</span>
                    }
                </div>
            </div>
        );
    }
}

export default GalleryItem;
