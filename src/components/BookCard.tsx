
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Book } from "@/types";
import { useCart } from "@/contexts/CartContext";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = "" }) => {
  const { addToCart } = useCart();

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden book-card ${className}`}>
      <Link to={`/books/${book.id}`} className="block">
        <div className="h-64 overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/books/${book.id}`} className="block">
          <h3 className="font-serif font-medium text-lg mb-1 line-clamp-1 hover:text-bookstore-purple transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-bookstore-dark-text">${book.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => addToCart(book)}
            className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
