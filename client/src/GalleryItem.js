import React from "react";


class GalleryItem extends React.Component {
    componentDidMount() {

        if (this.props.blinkyEyeMode) {
            this.setupBlinkEyeMode()
        }
    }

    setupBlinkEyeMode() {
        const imgId = `image-${this.props.user.id}`
        const img = document.getElementById(imgId)

        let tracker = new window.tracking.ObjectTracker(['eye'])
        tracker.setStepSize(1.7)
        setTimeout(() => {
            window.tracking.track(`#${imgId}`, tracker)
            tracker.on('track', (event) => {
                event.data.forEach((rect) => {
                    console.log('found an eye') // Ha!
                    window.plot(img, rect.x, rect.y, rect.width, rect.height)
                })
            })

        }, 1000)

        window.plot = function(img, x, y, w, h) {

            var blink = document.createElement('div')
            img.parentNode.appendChild(blink)

            blink.classList.add('blink')
            let adjuster = 10
            blink.style.width = (w - adjuster) + 'px'
            blink.style.height = (h - adjuster) + 'px'
            blink.style.left = (img.offsetLeft + x + (adjuster/2)) + 'px'
            blink.style.top = (img.offsetTop + y + (adjuster/2)) + 'px'

        }
    }

    render() {

        // TODO: Ew, should have used a date library.
        let d = new Date()
        d.setTime(d.getTime() + ((d.getTimezoneOffset() * 60)*1000) + (this.props.user.tz_offset * 1000))

        const isMorning = d.getHours() < 12

        let timezone = `${((this.props.user.tz_offset / 60) + d.getTimezoneOffset()) / 60}hr`
        timezone = this.props.user.tz_offset > 0 ? `+${timezone}` : `${timezone}`

        const imageSrc = this.props.blinkyEyeMode ?
            `/api/image-passthru?url=${this.props.user.profile.image_192}` : this.props.user.profile.image_192

        return (
            <div className="column">
                <div className="frame">
                    <img id={`image-${this.props.user.id}`} className="gallery_item" alt={this.props.user.real_name} src={imageSrc} />
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
