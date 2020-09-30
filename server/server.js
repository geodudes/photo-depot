require('dotenv').config()
const express = require('express');
const app = express();
// const ws = require('ws');
const webSocketServer = require('websocket').server;
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

const path = require('path');

const imageRouter = require("./routes/images")
const tagRouter = require("./routes/tags")
const apiRouter = require("./routes/api")

// JSON parser:
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

// Set up a headless websocket server that prints any
// events that come in.
// const wsServer = new ws.Server({
//   noServer: true
// });
// wsServer.on('connection', socket => {
//   socket.on('message', message => console.log(message));
// });

// Webpack production
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  // statically serve everything in the dist folder on the route
  app.use('/dist', express.static(path.resolve(process.cwd(), './dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(process.cwd(), './client/src/index.html'));
  });
}

// IMAGES ROUTER
app.use('/images', imageRouter);

// // TAGS ROUTER
app.use('/tags', tagRouter);

// API ROUTER
app.use('/api', apiRouter);

// catch-all endpoint handler
app.use((req, res) => {
  return res.status(400).send('Page not found.')
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unkown middleware error!',
    status: 500,
    message: {
      err: 'An error occurred!'
    }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
})

// `server` is a vanilla Node.js HTTP server, so use
// the same ws upgrade process described here:
// https://www.npmjs.com/package/ws#multiple-servers-sharing-a-single-https-server
const server = app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

const wsServer = new webSocketServer({
  httpServer: server
});

// server.on('upgrade', (request, socket, head) => {
//   console.log("Client connected")
//   wsServer.handleUpgrade(request, socket, head, socket => {
//     wsServer.emit('connection', socket, request);
//   });
// });

// Generates unique ID for every new connection
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

// I'm maintaining all active connections in this object
const clients = {};
// I'm maintaining all active users in this object
const users = {};
// The current editor content is maintained here.
let editorContent = null;
// User activity history.
let userActivity = [];

const sendMessage = (json) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
}

const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
}

wsServer.on('request', function (request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = {
        type: dataFromClient.type
      };
      if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userID] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined to edit the document`);
        json.data = {
          users,
          userActivity
        };
      } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
        editorContent = dataFromClient.content;
        json.data = {
          editorContent,
          userActivity
        };
      }
      sendMessage(JSON.stringify(json));
    }
  });
  // user disconnected
  connection.on('close', function (connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    const json = {
      type: typesDef.USER_EVENT
    };
    userActivity.push(`${users[userID].username} left the document`);
    json.data = {
      users,
      userActivity
    };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});

module.exports = app;

// const webSocketsServerPort = 8000;

// const http = require('http');
// Spinning the http server and the websocket server.
// const server = http.createServer();
// server.listen(webSocketsServerPort);
