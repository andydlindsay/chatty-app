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
      currentUser: { name: 'Anon Nimus' },
      socket: {},
      currentUsers: 0,
      color: 'orange'
    };
    this.newMessage = this.newMessage.bind(this);
  }

  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001');

    webSocket.onmessage = ({ data }) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'setColor') {
        this.setState({ color: parsedData.color });
        return;
      }
      if (parsedData.currentUsers) {
        this.setState({
          currentUsers: parsedData.currentUsers
        });
      }
      const oldMessages = this.state.messages;
      const messages = [...oldMessages, parsedData ];
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
        type: 'incomingMessage',
        color: this.state.color
      };
      event.target.elements['message'].value = '';
      this.state.socket.send(JSON.stringify(message));
    }
  }

  render() {
    return (
      <Fragment>
        <Favicon url="./build/favicon.ico" />
        <NavBar currentUsers={this.state.currentUsers } />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } newMessage={ this.newMessage } />
      </Fragment>
    );
  }

}

export default App;
