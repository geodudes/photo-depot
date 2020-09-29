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

module.exports = imageController;
