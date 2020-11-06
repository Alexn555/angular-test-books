import { BookStatus } from './book-status';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  added: string;
  checkOutCount: number;
  status: BookStatus;
  dueDate: string;
  comment: string;
}

export interface BooksError<T> {
  message: string;
  content: T[];
}

export interface BookError {
  error: any;
  headers: any;
  message: string;
  status: string;
  statusText: string;
  ok: boolean;
  content: Book;
  url: string;
}
