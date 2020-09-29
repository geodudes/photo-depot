const db = require('../models/model');
const queries = require('../utils/queries');

const imageController = {};

imageController.getImages = (req, res, next) => {

  db.query(queries.getImages)
    .then(photos => {
      db.query(queries.getTags)
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

module.exports = imageController;
