module.exports = {
  //function for sending to all clients
  sendMessage: (json, clients) => {
    Object.keys(clients).map((client) => {
      clients[client].sendUTF(JSON.stringify(json));
    });
  }

}
