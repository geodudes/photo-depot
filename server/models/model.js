const {
  Pool
} = require('pg');

const DB_URL = process.env.NODE_ENV !== 'test' ? process.env.PG_URI : process.env.PG_URI_TEST

const pool = new Pool({
  connectionString: DB_URL,
  connectionLimit: 300,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
