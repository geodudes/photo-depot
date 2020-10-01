const {
  sendMessage
} = require('../utils/websockets')

const websocketController = {};

websocketController.sendImage = (req, res, next) => {

  sendMessage({
    data: res.locals.websocket,
    type: "newimage"
  }, res.locals.clients)
  return next();
}

module.exports = websocketController;
