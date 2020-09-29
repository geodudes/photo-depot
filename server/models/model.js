const {
  Pool
} = require('pg');

const pool = new Pool({
  connectionString: 'postgres://dmrdamqb:zmSNi5oDQqrVDMLqo3bdsGEnnn9J1oip@lallah.db.elephantsql.com:5432/dmrdamqb',
  connectionLimit: 300,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
