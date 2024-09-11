import { Request, Response } from 'express';
import knex from '../db';

// Get a list of all authors
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await knex('authors').select('*');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve authors' });
  }
};

// Get details of a single author by ID
export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await knex('authors').where({ id: req.params.id }).first();
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
    const [authorId] = await knex('authors').insert({
      name,
      bio,
      birthdate,
    });

    const newAuthor = await knex('authors').where({ id: authorId }).first();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create author' });
  }
};

// Update an existing author
export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name, bio, birthdate } = req.body;
    const authorId = req.params.id;

    const updatedRows = await knex('authors').where({ id: authorId }).update({
      name,
      bio,
      birthdate,
    });

    if (updatedRows === 0)
      return res.status(404).json({ error: 'Author not found' });

    const updatedAuthor = await knex('authors').where({ id: authorId }).first();
    res.json(updatedAuthor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update author' });
  }
};

// Delete an author
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const authorId = req.params.id;

    const deletedRows = await knex('authors').where({ id: authorId }).del();

    if (deletedRows === 0)
      return res.status(404).json({ error: 'Author not found' });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};
