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
  createAuthor,
);

router.put(
  '/:id',
  [
    param('id').isInt(),
    body('name').optional().isString().notEmpty(),
    body('birthdate').optional().isISO8601(),
    validationErrors,
  ],
  updateAuthor,
);

router.delete('/:id', [param('id').isInt(), validationErrors], deleteAuthor);

export default router;
