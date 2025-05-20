
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Book } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = "" }) => {
  const { addToCart } = useCart();
  // Convert price from USD to BDT (1$ = 120 BDT)
  const priceBDT = book.price * 120;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden book-card transition-all duration-300 hover:shadow-xl ${className}`}
    >
      <Link to={`/books/${book.id}`} className="block">
        <div className="h-64 overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {book.featured && (
            <Badge className="bg-bookstore-purple text-white animate-pulse">Featured</Badge>
          )}
          {book.language && (
            <Badge variant="outline" className="border-bookstore-dark-purple text-bookstore-dark-purple">
              {book.language}
            </Badge>
          )}
        </div>
        <Link to={`/books/${book.id}`} className="block">
          <h3 className="font-serif font-medium text-lg mb-1 line-clamp-1 transition-colors duration-200 hover:text-bookstore-purple">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-bookstore-dark-text">{priceBDT.toFixed(0)} ৳</span>
          <Button
            size="sm"
            onClick={() => addToCart(book)}
            className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white transform transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
