import express from 'express';
import { body, param } from 'express-validator';
import { validationErrors } from '../middleware/validationErrors';
import {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/authors';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', getAuthors);

router.get('/:id', [param('id').isInt(), validationErrors], getAuthorById);

router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('birthdate').isISO8601(),
    validationErrors,
  ],
  createAuthor, authenticate
);

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('name').optional().isString().notEmpty(),
    body('birthdate').optional().isISO8601(),
    validationErrors,
  ],
  updateAuthor, authenticate
);

router.delete('/:id', [param('id').isInt(), validationErrors], deleteAuthor, authenticate);

export default router;
