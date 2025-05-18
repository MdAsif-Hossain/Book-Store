
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { books } from "@/data/books";
import FeaturedBooks from "@/components/FeaturedBooks";
import { Book, BookOpen, ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bookstore-light-purple to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Discover Your Next Favorite Book
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                From bestsellers to hidden gems, find the perfect book for every moment 
                at our online bookstore.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/books">
                  <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white">
                    Browse Books
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-bookstore-purple text-bookstore-purple hover:bg-bookstore-light-purple">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
                  alt="Books"
                  className="rounded-lg shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks books={books} />

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Fiction", "Non-Fiction", "Science Fiction", "Biography", "Self-Help", "Mystery"].map(
              (category) => (
                <Link
                  key={category}
                  to={`/books?category=${category}`}
                  className="bg-bookstore-light-purple hover:bg-purple-100 rounded-lg p-6 text-center transition-colors duration-200"
                >
                  <h3 className="font-medium">{category}</h3>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-bookstore-soft-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Why Choose PageTurner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Thousands of books across all genres, from bestsellers to rare finds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Easy Shopping
              </h3>
              <p className="text-gray-600">
                Simple and secure checkout process with multiple payment options.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Expert Recommendations
              </h3>
              <p className="text-gray-600">
                Curated selections and personalized book recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
