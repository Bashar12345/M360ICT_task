import { Request, Response } from 'express';
import knex from '../db';

// Retrieve a list of authors along with their respective books
export const getAuthorsWithBooks = async (req: Request, res: Response) => {
  try {
    const authors = await knex('authors').select('*');
    const authorsWithBooks = await Promise.all(
      authors.map(async (author) => {
        const books = await knex('books').where({ author_id: author.id });
        return { ...author, books };
      }),
    );
    res.json(authorsWithBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve authors with books' });
  }
};

// Detailed view of an author with their books
export const getAuthorDetail = async (req: Request, res: Response) => {
  try {
    const author = await knex('authors').where({ id: req.params.id }).first();
    if (!author) return res.status(404).json({ error: 'Author not found' });

    const books = await knex('books').where({ author_id: author.id });
    res.json({ ...author, books });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve author details' });
  }
};

// Detailed view of a book with author information
export const getBookDetail = async (req: Request, res: Response) => {
  try {
    const book = await knex('books').where({ id: req.params.id }).first();
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const author = await knex('authors').where({ id: book.author_id }).first();
    res.json({ ...book, author });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book details' });
  }
};
