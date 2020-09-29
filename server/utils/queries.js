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

queries.updateImage = `
UPDATE photos
SET rating=$2
WHERE photoid=$1
`;

queries.deleteImage = `
DELETE FROM photos
WHERE photoid=$1
`;


module.exports = queries;
