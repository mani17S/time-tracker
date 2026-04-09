require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.TEST_USER || 'test_user',
      password: process.env.TEST_PASSWORD || 'test_password',
      database: process.env.TEST_DB || 'awdt_timers',
      ssl: false,
    },
    pool: {
      min: 1,
      max: 4,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './backend/db/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      user: process.env.TEST_USER || 'test_user',
      password: process.env.TEST_PASSWORD || 'test_password',
      database: process.env.TEST_DB || 'awdt_timers',
      ssl: false,
    },
    pool: {
      min: 1,
      max: 4,
      acquireTimeoutMillis: 30000,
      idleTimeoutMillis: 30000,
      createTimeoutMillis: 30000,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './backend/db/migrations',
    },
  }
};