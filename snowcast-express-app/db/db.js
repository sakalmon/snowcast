const pg = require('pg');
const dbName = 'snowcast';

const db = new pg.Pool({
  database: dbName
});

module.exports = db;