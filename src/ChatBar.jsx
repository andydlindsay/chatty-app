import React, { Component } from 'react';

class ChatBar extends Component {
    render() {
        const { name } = this.props.currentUser;
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={ name } placeholder="Your Name (Optional)" />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        );
    }
}

export default ChatBar;
