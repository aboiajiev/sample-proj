const db = require('../../db/database');

async function getAll() {
  return db('User').select('*');
}

module.exports = { getAll };
