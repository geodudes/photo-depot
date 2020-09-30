const db = require('../models/model');
const queries = require('../utils/queries');

const tagController = {};

//SENDS LIST OF TAGS BACK TO CLIENT
tagController.getTags = (req, res, next) => {

  //dummy id until cookies are set up
  const userid = 1;

  db.query(queries.getTags, [userid])
    .then(tags => {
      res.locals.data = tags.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.getTags: ${err}`,
        message: {
          err: 'An error occured with SQL when getting tags.'
        },
      });
    })
}

//ADDS A NEW TAG TO THE DATABASE
tagController.addTag = (req, res, next) => {

  //deconstruct tag name from body
  const {
    tag
  } = req.body;

  //dummy id until cookies are set up
  const userid = 1;

  db.query(queries.addTag, [tag, userid])
    .then(data => {
      res.locals.data = data.rows[0];
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.addTag: ${err}`,
        message: {
          err: 'An error occured with SQL when creating a new tag.'
        },
      });
    })
}

//ADDS A TAG TO THE GIVEN PHOTOID
tagController.updateTag = (req, res, next) => {

  //dummy id until cookies are set up
  const userid = 1;

  //deconstruct tagid from params
  const {
    tagid
  } = req.params;

  //deconstruct photoid from query
  const {
    photoid
  } = req.query;

  db.query(queries.updateTag, [userid, photoid, tagid])
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.updateTag: ${err}`,
        message: {
          err: 'An error occured with SQL when updating an image with a tag.'
        },
      });
    })
}

//REMOVES A TAG FROM THE GIVEN PHOTOID
tagController.deleteTag = (req, res, next) => {

  //dummy id until cookies are set up
  const userid = 1;

  //deconstruct tagid from params
  const {
    tagid
  } = req.params;

  //deconstruct photoid from query
  const {
    photoid
  } = req.query;

  db.query(queries.deleteTag, [userid, photoid, tagid])
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.deleteTag: ${err}`,
        message: {
          err: 'An error occured with SQL when removing a tag from an image.'
        },
      });
    })
}

module.exports = tagController;
