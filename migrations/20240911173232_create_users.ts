import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create the "users" table
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary(); // Auto-incrementing ID
    // table.string('name', 255).notNullable(); // User name
    table.string('email', 255).notNullable().unique(); // Email (unique)
    table.string('password', 255).notNullable(); // Hashed password
    // table.string('role', 50).defaultTo('user'); // Role (e.g., 'user', 'admin')
    table.timestamp('created_at').defaultTo(knex.fn.now()); // Timestamp for record creation
    table.timestamp('updated_at').defaultTo(knex.fn.now()); // Timestamp for last update
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop the "users" table
  return knex.schema.dropTable('users');
}
