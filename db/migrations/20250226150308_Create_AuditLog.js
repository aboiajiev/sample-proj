exports.up = function (knex) {
  return knex.schema.createTable('AuditLog', function (table) {
    table.increments('id').primary();
    table.string('action').notNullable();
    table.jsonb('data');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('AuditLog');
};
