# Bookstore API

A RESTful API for managing a bookstore. This API allows users to perform CRUD (Create, Read, Update, Delete) operations on books and authors.

## Features

- Manage authors: Create, read, update, and delete authors.
- Manage books: Create, read, update, and delete books.
- Query books by author.
- Validation and error handling.
- TypeScript for type safety.
- Express for the web framework.
- Knex for query building with MySQL or PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Running the Project](#running-the-project)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/M360ICT_task.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bookstore-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your environment variables:

   ```env
   PORT=3000
   DATABASE_URL=mysql://newuser:password@localhost:3306/bookstore_db
   ```

   Replace `mysql://user:password@localhost:3306/bookstore` with your actual database connection string. Adjust for PostgreSQL if needed.

2. Set up the database schema:

   - Ensure MySQL or PostgreSQL is installed and running.
   - Run the database migrations to set up the schema. (Refer to your specific migration tool documentation for exact commands.)

## API Endpoints

### Authors

- **GET /authors**: Retrieve a list of all authors.
- **GET /authors/:id**: Retrieve details of a single author.
- **POST /authors**: Create a new author.
- **PUT /authors/:id**: Update an existing author.
- **DELETE /authors/:id**: Delete an author.

### Books

- **GET /books**: Retrieve a list of all books. Optionally filter by author using the `author` query parameter.
- **GET /books/:id**: Retrieve details of a single book.
- **POST /books**: Create a new book.
- **PUT /books/:id**: Update an existing book.
- **DELETE /books/:id**: Delete a book.

## Error Handling

Errors are returned with appropriate HTTP status codes and JSON responses. For validation errors, a 400 status code is returned with details of the validation issues.

## Running the Project

1. Start the server:

   ```bash
   npm run dev
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Testing

To test the API, you can use tools like Postman or cURL to make requests to the endpoints. Ensure that your database is properly set up and running before testing.

Here are the sample JSONs for testing each endpoint in your RESTful API:

Here is a list of all the endpoints you can test using **Postman**, along with example request bodies and query parameters. Make sure your server is running on `http://localhost:3000/` (adjust the port if it's different in your setup).

### 1. **Authors**

#### a) **Get All Authors (with pagination and search)**
**GET** `/authors`
- URL Example: 
  ```
  http://localhost:3000/authors?page=1&limit=10&name=John
  ```
- Parameters:
  - `page` (optional): The page number, defaults to 1.
  - `limit` (optional): The number of results per page, defaults to 10.
  - `name` (optional): Search authors by name.

#### b) **Get Author by ID**
**GET** `/authors/:id`
- URL Example: 
  ```
  http://localhost:3000/authors/1
  ```

#### c) **Create New Author**
**POST** `/authors`
- URL Example:
  ```
  http://localhost:3000/authors
  ```
- JSON Body:
  ```json
  {
    "name": "John Doe",
    "bio": "A renowned author.",
    "birthdate": "1970-01-01"
  }
  ```

#### d) **Update Author**
**PUT** `/authors/:id`
- URL Example:
  ```
  http://localhost:3000/authors/1
  ```
- JSON Body (optional fields):
  ```json
  {
    "name": "John Doe Updated",
    "bio": "An updated biography.",
    "birthdate": "1971-02-01"
  }
  ```

#### e) **Delete Author**
**DELETE** `/authors/:id`
- URL Example:
  ```
  http://localhost:3000/authors/1
  ```

---

### 2. **Books**

#### a) **Get All Books (with pagination, search, and filter by author)**
**GET** `/books`
- URL Example:
  ```
  http://localhost:3000/books?page=1&limit=10&title=JavaScript&author=1
  ```
- Parameters:
  - `page` (optional): The page number, defaults to 1.
  - `limit` (optional): The number of results per page, defaults to 10.
  - `title` (optional): Search books by title.
  - `author` (optional): Filter books by author ID.

#### b) **Get Book by ID**
**GET** `/books/:id`
- URL Example:
  ```
  http://localhost:3000/books/1
  ```

#### c) **Create New Book**
**POST** `/books`
- URL Example:
  ```
  http://localhost:3000/books
  ```
- JSON Body:
  ```json
  {
    "title": "Learn JavaScript",
    "description": "A detailed guide on JavaScript.",
    "published_date": "2023-01-15",
    "author_id": 1
  }
  ```

#### d) **Update Book**
**PUT** `/books/:id`
- URL Example:
  ```
  http://localhost:3000/books/1
  ```
- JSON Body (optional fields):
  ```json
  {
    "title": "Learn JavaScript Updated",
    "description": "Updated description of the JavaScript book.",
    "published_date": "2024-02-20",
    "author_id": 2
  }
  ```

#### e) **Delete Book**
**DELETE** `/books/:id`
- URL Example:
  ```
  http://localhost:3000/books/1
  ```

---

### 3. **Authentication (JWT)**

#### a) **Login (Generate Token)**
**POST** `/auth/login`
- URL Example:
  ```
  http://localhost:3000/auth/login
  ```
- JSON Body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### b) **Protected Routes (using JWT Token)**
You need to pass the JWT token in the **Authorization** header as `Bearer <token>` for the protected routes.

Example request with a token:
```bash
curl -X GET http://localhost:3000/authors \
     -H "Authorization: Bearer <your_jwt_token>"
```

---

### Example Workflow for Testing:
1. **Create an Author**:
    - Use the **POST** `/authors` endpoint to create a new author.
    - Example Response:
      ```json
      {
        "id": 1,
        "name": "John Doe",
        "bio": "A renowned author.",
        "birthdate": "1970-01-01"
      }
      ```

2. **Create a Book**:
    - Use the **POST** `/books` endpoint to create a new book, referencing the author ID from the previous step.
    - Example Response:
      ```json
      {
        "id": 1,
        "title": "Learn JavaScript",
        "description": "A detailed guide on JavaScript.",
        "published_date": "2023-01-15",
        "author_id": 1
      }
      ```

3. **Search and Paginate Authors/Books**:
    - Use the **GET** `/authors` or `/books` with search or pagination parameters to fetch specific records.

4. **Authenticate**:
    - Use the **POST** `/auth/login` to generate a token, then use that token to access protected routes by passing it in the `Authorization` header as `Bearer <token>`.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.




