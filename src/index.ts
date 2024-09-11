import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authorRoutes from './routes/authors';
import authenticationRoutes from './routes/authentication';
import bookRoutes from './routes/books';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/auth', authenticationRoutes);
app.use('/authors', authorRoutes);
app.use('/books', bookRoutes);

// Properly type the error handling middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
