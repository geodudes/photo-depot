const webSocketServer = require('websocket').server;
const db = require('./models/model');
const queries = require('./utils/queries');
const {
  sendMessage
} = require('./utils/websockets')

module.exports = (server, clients, users) => {

  const wsServer = new webSocketServer({
    httpServer: server
  });

  // Generates unique ID for every new connection
  const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };

  const typesDef = {
    GET_IMAGES: "getimages"
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
        console.log("message from client: ", userID, ". Message: ", dataFromClient)
        const json = {
          type: dataFromClient.type
        };
        if (dataFromClient.type === typesDef.GET_IMAGES) {
          //hard-code userid until sessions set up
          const userid = 1;

          db.query(queries.getImages, [userid])
            .then(photos => {
              db.query(queries.getAllImageTags, [userid])
                .then(tags => {
                  const tagObj = {};

                  tags.rows.forEach(tag => {
                    tagObj[tag.photoid] ? tagObj[tag.photoid].push(tag.tag) : tagObj[tag.photoid] = [tag.tag]
                  })

                  json.data = photos.rows.map(photo => {
                    photo.tags = tagObj[photo.photoid] || []
                    return photo;
                  })
                  sendMessage(json, clients);

                })
            })
        }
      }
    });
    // user disconnected
    connection.on('close', function (connection) {
      console.log((new Date()) + " Peer " + userID + " disconnected.");
      delete clients[userID];
      delete users[userID];
    });
  });
}
