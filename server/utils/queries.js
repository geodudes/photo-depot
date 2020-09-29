const queries = {};

queries.getImages = `
SELECT *
FROM photos
`

queries.getTags = `
SELECT *
FROM tags
`

module.exports = queries;
