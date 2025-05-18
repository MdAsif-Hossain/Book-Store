
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/types";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  // Filter to only featured books and limit to 4
  const featuredBooks = books
    .filter((book) => book.featured)
    .slice(0, 4);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold">Featured Books</h2>
          <Link to="/books">
            <Button variant="outline" className="border-bookstore-purple text-bookstore-purple hover:bg-bookstore-light-purple">
              View All Books
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        
        {featuredBooks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured books available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
