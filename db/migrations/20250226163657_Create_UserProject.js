exports.up = function (knex) {
  return knex.schema.createTable('UserProject', (table) => {
    table.integer('user_id').unsigned().notNullable();
    table.integer('project_id').unsigned().notNullable();
    table.primary(['user_id', 'project_id']);
    table.foreign('user_id').references('idUser').inTable('User').onDelete('CASCADE');
    table.foreign('project_id').references('idProject').inTable('Project').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('UserProject');
};
