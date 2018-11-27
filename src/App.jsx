import React, {Component, Fragment} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Favicon from 'react-favicon';

import data from './data/data.json';
import { runInThisContext } from 'vm';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: data,
      currentUser: { name: 'MarbleToast' }
    };
    this.newMessage = this.newMessage.bind(this);
  }

  newMessage(event) {
    event.preventDefault();
    const username = event.target.elements['username'].value || this.state.currentUser.name;
    const content = event.target.elements['message'].value;
    const message = {
      username,
      content,
      type: 'incomingMessage'
    };
    event.target.elements['message'].value = '';
    const messages = [...this.state.messages, message];
    this.setState({ messages })
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
