import { Request, Response } from 'express';
import * as authorModel from '../models/authorModel';

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);

    const authors = await authorModel.getAuthors({
      name: name ? String(name) : undefined,
      page: pageNum,
      limit: limitNum,
    });

    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve authors' });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await authorModel.getAuthorById(Number(req.params.id));
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve author' });
  }
};

// Create a new author
export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio, birthdate } = req.body;

    // Insert new author into database
    const newAuthor = await authorModel.createAuthor({ name, bio, birthdate });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create author' });
  }
};

// Update an existing author
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio, birthdate } = req.body;
    const authorId = Number(req.params.id);

    const updatedAuthor = await authorModel.updateAuthor(authorId, {
      name,
      bio,
      birthdate,
    });

    if (!updatedAuthor)
      return res.status(404).json({ error: 'Author not found' });

    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update author' });
  }
};

// Delete an author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = Number(req.params.id);

    const result = await authorModel.deleteAuthor(authorId);

    if (!result) return res.status(404).json({ error: 'Author not found' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};
