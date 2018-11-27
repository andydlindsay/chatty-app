import React, {Component, Fragment} from 'react';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

import data from './data/data.json';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: data,
      currentUser: { name: 'MarbleToast' }
    };
  }

  componentDidMount() {
    document.title = 'Chatty App';
  }

  render() {
    return (
      <Fragment>
        <NavBar />
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } />
      </Fragment>
    );
  }

}

export default App;
