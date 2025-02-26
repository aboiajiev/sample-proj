exports.up = function (knex) {
  return knex.schema.createTable('TimeLog', (table) => {
    table.increments('idTimelog').primary();
    table.integer('user_id').unsigned().notNullable().references('idUser').inTable('User');
    table.integer('project_id').unsigned().notNullable().references('idProject').inTable('Project');
    table.date('date').notNullable();
    table.float('hours').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('TimeLog');
};
