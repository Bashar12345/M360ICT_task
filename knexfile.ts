import { Knex } from 'knex';
require('dotenv').config();


// console.log('Knex Configuration:', {
//   client: process.env.DB_CLIENT || 'mysql2',
//   connection: {
//     host: process.env.DB_HOST || '127.0.0.1',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || 'new_password',
//     database: process.env.DB_NAME || 'bookstore',
//   },
// });

const Configurations: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT || 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'new_password',
      database: process.env.DB_NAME || 'bookstore',
    },
    migrations: {
      directory: './migrations',
    },
  },
};

export default Configurations;
