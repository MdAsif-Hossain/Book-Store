
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/types";
import BookCard from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FeaturedBooksProps {
  books: Book[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  // Filter to only featured books and limit to 4
  const featuredBooks = books
    .filter((book) => book.featured)
    .slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl font-serif font-bold">Featured Books</h2>
          <Link to="/books">
            <Button 
              variant="outline" 
              className="border-bookstore-purple text-bookstore-purple hover:bg-bookstore-light-purple transition-all duration-300"
            >
              View All Books
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuredBooks.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </motion.div>
        
        {featuredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-8"
          >
            <p className="text-gray-500">No featured books available at the moment.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;
