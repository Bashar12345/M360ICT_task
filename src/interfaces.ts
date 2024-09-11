export interface Author {
  id: number;
  name: string;
  bio?: string;
  birthdate: string;
}

export interface Book {
  id: number;
  title: string;
  description?: string;
  published_date: string;
  author_id: number;
}
