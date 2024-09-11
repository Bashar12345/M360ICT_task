import knex from 'knex';
import Configurations from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = Configurations[environment];

const db = knex(config);

export default db;
