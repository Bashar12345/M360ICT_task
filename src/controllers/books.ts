import { Request, Response } from 'express';
import knex from '../db';

// Get a list of all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { author } = req.query;
    let query = knex('books').select('*');

    if (author) {
      query = query.where('author_id', author);
    }

    const books = await query;
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// Get details of a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await knex('books').where({ id: req.params.id }).first();
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Fetch author details
    const author = await knex('authors').where({ id: book.author_id }).first();
    res.json({ ...book, author });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, published_date, author_id } = req.body;

    // Insert new book into database
    const [bookId] = await knex('books').insert({
      title,
      description,
      published_date,
      author_id,
    });

    const newBook = await knex('books').where({ id: bookId }).first();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create book' });
  }
};

// Update an existing book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, description, published_date, author_id } = req.body;
    const bookId = req.params.id;

    const updatedRows = await knex('books').where({ id: bookId }).update({
      title,
      description,
      published_date,
      author_id,
    });

    if (updatedRows === 0)
      return res.status(404).json({ error: 'Book not found' });

    const updatedBook = await knex('books').where({ id: bookId }).first();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update book' });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;

    const deletedRows = await knex('books').where({ id: bookId }).del();

    if (deletedRows === 0)
      return res.status(404).json({ error: 'Book not found' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
