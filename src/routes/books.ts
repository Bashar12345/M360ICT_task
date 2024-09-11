import express from 'express';
import { body, param, query } from 'express-validator';
import { validationErrors } from '../middleware/validationErrors';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all books or filter by author
router.get(
  '/',
  [
    query('author').optional().isInt(), // Optional query parameter for author filtering
    validationErrors,
  ],
  getBooks,
);

// Get a single book by ID
router.get('/:id', [param('id').isInt(), validationErrors], getBookById);

// Create a new book
router.post(
  '/',
  [
    body('title').isString().notEmpty(),
    body('published_date').isISO8601(),
    body('author_id').isInt(),
    validationErrors,
    authenticate
  ],
  createBook,
);

// Update an existing book
router.put(
  '/:id',
  [
    param('id').isInt(),
    body('title').optional().isString().notEmpty(),
    body('published_date').optional().isISO8601(),
    body('author_id').optional().isInt(),
    validationErrors,
    authenticate
  ],
  updateBook,
);

// Delete a book by ID
router.delete('/:id', [param('id').isInt(), validationErrors], deleteBook);

export default router;
