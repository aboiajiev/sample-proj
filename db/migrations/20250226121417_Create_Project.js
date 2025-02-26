exports.up = function (knex) {
  return knex.schema.createTable('Project', (table) => {
    table.increments('idProject').primary();
    table.string('name', 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Project');
};
