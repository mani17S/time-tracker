const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const environment = process.env.NODE_ENV || 'production';

// Create singleton instance
let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = knex(knexConfig[environment]);
  }
  return dbInstance;
}

module.exports = getDb();
