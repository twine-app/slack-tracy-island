import React from "react";


class GalleryItem extends React.Component {
    render() {
        return (
            <li>
                <img alt={this.props.user.real_name} src={this.props.user.profile.image_192} />
            </li>
        );
    }
}

export default GalleryItem;
