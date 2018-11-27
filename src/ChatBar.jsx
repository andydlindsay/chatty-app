import React, { Component } from 'react';

class ChatBar extends Component {
    render() {
        const { name } = this.props.currentUser;
        return (
            <form onSubmit={ this.props.newMessage }>
                <footer className="chatbar">
                        <input name="username" className="chatbar-username" defaultValue={ name } placeholder="Your Name (Optional)" />
                        <input name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
                        <button className="hidden-button" type="submit"></button>
                </footer>
            </form>
        );
    }
}

export default ChatBar;
