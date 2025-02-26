module.exports = {
  development: {
    client: 'mssql',
    connection: {
      server: 'Your-Server-Name',
      user: 'Your-User',
      password: 'Your-Password',
      database: 'Your-Database-Name',
      port: 'Database Port. Default port: 1433',
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
