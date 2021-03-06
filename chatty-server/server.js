const express = require('express');
const WebSocket = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;

const server = express()
    .use(express.static('public'))
    .listen(PORT, () => {
        console.log(`websocket server listening on port ${PORT}`);
    });

const wss = new WebSocket.Server({ server });

function sendMessage(messageObj) {
    messageObj.id = uuidv4();
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(messageObj));
            console.log('sending message to client(s)');
        }
    });
}

function convertToBase16(input) {
    const list = '0123456789abcdef';
    let result = '';
    let numDigits = 2;
    const base = 16;
    while (numDigits) {
        result += list[Math.floor((input / (Math.pow(base, numDigits - 1))) % base)];
        numDigits--;
    }
    return result;
}

function chooseRandomColor() {
    const red = convertToBase16(Math.floor(Math.random() * 256));
    const green = convertToBase16(Math.floor(Math.random() * 256));
    const blue = convertToBase16(Math.floor(Math.random() * 256));
    return `#${red}${green}${blue}`;
}

wss.on('connection', (ws) => {
    console.log('Client connected');
    // on first connection, send a random color to user
    ws.send(JSON.stringify({ type: 'setColor', color: chooseRandomColor() }));

    // notify users that a new user has joined chat
    sendMessage({
        type: 'incomingNotification',
        content: 'A user has joined the chat',
        currentUsers: wss.clients.size
    });

    // notify users that a user has left the chat
    ws.on('close', () => {
        console.log('Client disconnected');
        const message = {
            type: 'incomingNotification',
            content: 'A user has left the chat',
            currentUsers: wss.clients.size
        }
        sendMessage(message);
    });

    // bounce any message back to all users
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        sendMessage(message);
    });

});
