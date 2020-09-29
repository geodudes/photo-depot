const queries = {};

queries.getImages = `
SELECT *
FROM photos`

queries.getTags = `
SELECT *
FROM tags`

queries.addImage = `
INSERT INTO photos(url, userid, date, rating)
VALUES($1, $2, $3, 0)
RETURNING photoid`


module.exports = queries;
