
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
  language?: string;
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

export interface PaymentSlip {
  id: string;
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentDate: string;
  receiptNumber: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}
