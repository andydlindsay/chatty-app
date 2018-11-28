import React, { Component, Fragment } from 'react';

class Message extends Component {
    render() {
        const { type, content, username, color } = this.props.message;
        return (
            <div className={ type === 'incomingMessage' ? 'message' : 'message system' }>
                { type === 'incomingMessage' && <Fragment>
                    <span style={{ color }}className="message-username">{ username }</span>
                    <span className="message-content">{ content }</span>
                </Fragment>}
                { type === 'incomingNotification' && <span>{ content }</span>}
            </div>
        );
    }
}

export default Message;
