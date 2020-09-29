const db = require('../models/model');
const queries = require('../utils/queries');

const imageController = {};

//GETS ALL USERS IMAGES FROM THE DATABASE
imageController.getImages = (req, res, next) => {

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

          res.locals.data = photos.rows.map(photo => {
            photo.tags = tagObj[photo.photoid] || []
            return photo;
          })
          return next();
        })
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.getImages: ${err}`,
        message: {
          err: 'An error occured with SQL when getting images.'
        },
      });
    })
}

//ADDS AN IMAGE TO THE DATABASE
imageController.addImage = (req, res, next) => {

  //deconstruct url from body
  const {
    url
  } = req.body;

  //dummy id until cookies are set up
  const userid = 1;

  // define new date/time
  const now = new Date();
  const date = `${now.toDateString()}-${now.toTimeString().split(' ')[0]}`;

  db.query(queries.addImage, [url, userid, date])
    .then(data => {
      res.locals.data = data.rows[0];
      console.log(res.locals.data)
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.addImage: ${err}`,
        message: {
          err: 'An error occured with SQL when saving an image.'
        },
      });
    })
}

//ADDS RATING TO THE IMAGE
imageController.updateImage = (req, res, next) => {

  //deconstruct url from params
  const {
    photoid
  } = req.params;

  //deconstruct url from query
  const {
    rating
  } = req.query;

  db.query(queries.updateImage, [photoid, rating])
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.updateImage: ${err}`,
        message: {
          err: 'An error occured with SQL when updating an image.'
        },
      });
    })
}

//REMOVES USERS IMAGE
imageController.deleteImage = (req, res, next) => {

  //deconstruct url from params
  const {
    photoid
  } = req.params;

  db.query(queries.deleteImage, [photoid])
    .then(data => {
      return next();
    })
    .catch(err => {
      return next({
        log: `Error occurred with queries.deleteImage: ${err}`,
        message: {
          err: 'An error occured with SQL when deleting an image.'
        },
      });
    })
}

module.exports = imageController;
