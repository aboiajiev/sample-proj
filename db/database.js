const config = require('../knexfile');
const knex = require('knex')(config.development);

// TODO: Custom methods to handle different database operations can be developed here and be used across the application.
module.exports = knex;
