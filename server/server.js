const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

const imageRouter = require("./routes/images")
const tagRouter = require("./routes/tags")

// JSON parser:
app.use(express.json());

// Webpack production
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the dist folder on the route
  app.use('/dist', express.static(path.resolve(process.cwd(), './dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(process.cwd(), './client/src/index.html'));
  });
}

// IMAGES ROUTER
app.use('/images', imageRouter);

// // TAGS ROUTER
// app.use('/tags', tagRouter);

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

app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});

module.exports = app;
