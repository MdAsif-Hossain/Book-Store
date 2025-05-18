
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  categories: string[];
  featured?: boolean;
  inStock: number;
  pages: number;
  publishYear: number;
  isbn: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}
