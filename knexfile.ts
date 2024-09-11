import { Knex } from 'knex';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const Configurations: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'new_password',
      database: process.env.DB_NAME || 'bookstore',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations', // Ensure that migrations directory exists
    },
    seeds: {
      directory: './seeds', // Optionally, specify seeds directory
    },
  },

  // Add production/test configurations as needed
  production: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'new_password',
      database: process.env.DB_NAME || 'bookstore',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

export default Configurations;
