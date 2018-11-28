import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty Appy</a>
                <span className="user-total">
                    { this.props.currentUsers === 1 ? '1 user' : `${this.props.currentUsers} users` } online
                </span>
            </nav>
        );
    }
}

export default NavBar;
