# Chatty App Project

Chatty App is a full-stack application utilizing React and WebSockets that allows users to chat with each other in real-time.

Users are able to change their username and can send text and/or images to other users.

New users are assigned a random colour for their username upon connection to the application.

## Final Product

![chat screen](https://github.com/andydlindsay/chatty-app/blob/master/docs/chat-screen.png)

![chat image](https://github.com/andydlindsay/chatty-app/blob/master/docs/chat-image.png)

## Dependencies

* react
* react-dom
* react-favicon
* express
* uuid
* ws

## Getting Started

1. Clone the repo locally.
2. Inside the `chatty-app` directory:
  * Install the front-end dependencies with `npm install`.
  * Run `npm start` to start the React application.
4. Inside the `chatty-app/chatty-server` directory:
  * Install the server-side dependencies with `npm install`.
  * Run `npm start` to start the websocket server.
5. Navigate to `localhost:3000` in a browser.
