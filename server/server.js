require('dotenv').config()
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

const path = require('path');

const wsServer = require("./wsServer")

const imageRouter = require("./routes/images")
const tagRouter = require("./routes/tags")
const apiRouter = require("./routes/api")

// JSON parser:
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

//*** WEBSOCKETS ****/
// I'm maintaining all active ws connections in this object
const clients = {};
// I'm maintaining all active ws users in this object
const users = {};
//install client and users to global middleware
app.use((req, res, next) => {
  res.locals.clients = clients;
  res.locals.users = users;
  return next()
})

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

//start web socket server
wsServer(server, clients, users);

module.exports = app;
