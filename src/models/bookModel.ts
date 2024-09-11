import knex from '../db';

// Get a list of all books, optionally filtering by author
export const getBooks = async (authorId?: number) => {
  let query = knex('books').select('*');

  if (authorId) {
    query = query.where('author_id', authorId);
  }

  return query;
};

// Get details of a single book by ID
export const getBookById = async (id: number) => {
  return knex('books').where({ id }).first();
};

// Create a new book
export const createBook = async (book: {
  title: string;
  description?: string;
  published_date: string;
  author_id: number;
}) => {
  const [bookId] = await knex('books').insert(book);
  return knex('books').where({ id: bookId }).first();
};

// Update an existing book
export const updateBook = async (
  id: number,
  bookUpdates: {
    title?: string;
    description?: string;
    published_date?: string;
    author_id?: number;
  },
) => {
  const updatedRows = await knex('books').where({ id }).update(bookUpdates);

  if (updatedRows === 0) return null;

  return knex('books').where({ id }).first();
};

// Delete a book
export const deleteBook = async (id: number) => {
  const deletedRows = await knex('books').where({ id }).del();
  return deletedRows > 0;
};

// Optionally, you could add a method to fetch author by ID, if needed
export const getAuthorById = async (authorId: number) => {
  return knex('authors').where({ id: authorId }).first();
};
