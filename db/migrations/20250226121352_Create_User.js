exports.up = function (knex) {
  return knex.schema.createTable('User', (table) => {
    table.increments('idUser').primary();
    table.string('firstName', 50).notNullable();
    table.string('lastName', 50).notNullable();
    table.string('email', 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('User');
};
