import knex from '../db';

interface GetBooksParams {
  authorId?: number;
  title?: string;
  page: number;
  limit: number;
}

export const getBooks = async ({
  authorId,
  title,
  page,
  limit,
}: GetBooksParams) => {
  let query = knex('books').select('*');

  if (authorId) {
    query = query.where('author_id', authorId);
  }

  if (title) {
    query = query.where('title', 'like', `%${title}%`);
  }

  const offset = (page - 1) * limit;
  query = query.limit(limit).offset(offset);

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
