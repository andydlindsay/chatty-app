import React, {Component, Fragment} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Favicon from 'react-favicon';

import { runInThisContext } from 'vm';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentUser: { name: 'MarbleToast' },
      socket: {}
    };
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001');

    webSocket.onmessage = ({ data }) => {
      const oldMessages = this.state.messages;
      const messages = [...oldMessages, JSON.parse(data) ];
      this.setState({ messages });
    };
    this.setState({ socket: webSocket });
  }

  newMessage(event) {
    event.preventDefault();
    const username = event.target.elements['username'].value;
    if (username !== this.state.currentUser.name) {
      const message = {
        type: 'incomingNotification',
        content: `${this.state.currentUser.name} has changed their name to ${username}`
      }
      this.state.socket.send(JSON.stringify(message));
      this.setState({ currentUser: { name: username }});
    }
    const content = event.target.elements['message'].value;
    if (content.length > 0) {
      const message = {
        username,
        content,
        type: 'incomingMessage'
      };
      event.target.elements['message'].value = '';
      this.state.socket.send(JSON.stringify(message));
    }
  }

  render() {
    return (
      <Fragment>
        <Favicon url="./build/favicon.ico" />
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } newMessage={ this.newMessage } />
      </Fragment>
    );
  }

}

export default App;
