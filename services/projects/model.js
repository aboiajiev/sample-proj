const db = require('../../db/database');

async function getAll() {
  return await db('Project').select('*');
}

module.exports = { getAll };
