import { Book } from './book';

export interface Checkout {
  id: string;
  borrowerFirstName: string;
  borrowerLastName: string;
  borrowedBook: Book;
  checkedOutDate: string;
  dueDate: string;
  returnedDate: number;
}

export interface CheckoutError {
  error: any;
  headers: any;
  message: string;
  status: string;
  statusText: string;
  ok: boolean;
  content: Book;
  url: string;
}
