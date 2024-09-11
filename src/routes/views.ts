import express from 'express';
import {
  getAuthorsWithBooks,
  getAuthorDetail,
  getBookDetail,
} from '../controllers/views';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/authors-with-books', getAuthorsWithBooks,authenticate);
router.get('/author/:id', getAuthorDetail, authenticate);
router.get('/book/:id', getBookDetail, authenticate);

export default router;
