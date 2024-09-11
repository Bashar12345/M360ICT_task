import knex from '../db';
import db from '../db';

interface GetAuthorsParams {
  name?: string;
  page: number;
  limit: number;
}

export const getAuthors = async ({ name, page, limit }: GetAuthorsParams) => {
  const offset = (page - 1) * limit;
  let query = knex('authors').select('*').offset(offset).limit(limit);

  if (name) {
    query = query.where('name', 'like', `%${name}%`);
  }

  return await query;
};


// Define the types for Author
export interface Author {
  id: number;
  name: string;
  bio?: string;
  birthdate: string; // ISO date string
}

export const getAllAuthors = async () => {
  return db<Author>('authors').select('*');
};

export const getAuthorById = async (id: number) => {
  return db<Author>('authors').where({ id }).first();
};

export const createAuthor = async (author: Omit<Author, 'id'>) => {
  return db<Author>('authors').insert(author).returning('*');
};

export const updateAuthor = async (
  id: number,
  updates: Partial<Omit<Author, 'id'>>,
) => {
  return db<Author>('authors').where({ id }).update(updates).returning('*');
};

export const deleteAuthor = async (id: number) => {
  return db<Author>('authors').where({ id }).del();
};
