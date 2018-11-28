import React, { Component, Fragment } from 'react';

// https://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr
const regexIndexOf = function(regex, string) {
    var indexOf = string.substring(0).search(regex);
    return indexOf;
}

// image url regexp
const regexImageUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/gi;

class Message extends Component {
    render() {
        const { type, username, color } = this.props.message;
        let { content } = this.props.message;
        let imageElement;
        const imageUrlIndex = regexIndexOf(regexImageUrl, content);
        if (imageUrlIndex >= 0) {
            // content contains an image url
            const imageUrlStart = imageUrlIndex === 0 ? 0 : imageUrlIndex - 1;
            const imageUrl = content.slice(imageUrlStart);
            content = content.slice(0, imageUrlStart);
            imageElement = <img src={imageUrl} className="message-image" />;
        }
        return (
            <div className={ type === 'incomingMessage' ? 'message' : 'message system' }>
                { type === 'incomingMessage' && <Fragment>
                    <span style={{ color }}className="message-username">{ username }</span>
                    <span className="message-content">{ content }<br/>{ imageElement }</span>
                </Fragment>}
                { type === 'incomingNotification' && <span>{ content }</span>}
            </div>
        );
    }
}

export default Message;
