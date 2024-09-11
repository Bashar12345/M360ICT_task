import express from 'express';
import {
  getAuthorsWithBooks,
  getAuthorDetail,
  getBookDetail,
} from '../controllers/views';

const router = express.Router();

router.get('/authors-with-books', getAuthorsWithBooks);
router.get('/author/:id', getAuthorDetail);
router.get('/book/:id', getBookDetail);

export default router;
