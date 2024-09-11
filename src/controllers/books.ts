import { Request, Response } from 'express';
import * as bookModel from '../models/bookModel';


export const getBooks = async (req: Request, res: Response) => {
  try {
    const { author, title, page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const books = await bookModel.getBooks({
      authorId: author ? Number(author) : undefined,
      title: title ? String(title) : undefined,
      page: pageNum,
      limit: limitNum,
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookModel.getBookById(Number(req.params.id));
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const author = await bookModel.getAuthorById(book.author_id);
    res.json({ ...book, author });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve book' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, published_date, author_id } = req.body;
    const newBook = await bookModel.createBook({
      title,
      description,
      published_date,
      author_id,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create book' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, description, published_date, author_id } = req.body;
    const bookId = Number(req.params.id);

    const updatedBook = await bookModel.updateBook(bookId, {
      title,
      description,
      published_date,
      author_id,
    });
    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update book' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    const result = await bookModel.deleteBook(bookId);
    if (!result) return res.status(404).json({ error: 'Book not found' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};
