
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { books } from "@/data/books";
import FeaturedBooks from "@/components/FeaturedBooks";
import { Book, BookOpen, ShoppingBag, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  // Get Bangla books for the special section
  const banglaBooks = books.filter(book => book.language === "Bangla").slice(0, 3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-bookstore-light-purple to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0 md:pr-8"
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Discover Your Next <span className="text-bookstore-dark-purple">Favorite Book</span>
              </h1>
              <p className="text-gray-700 text-lg mb-8">
                From bestsellers to hidden gems, find the perfect book for every moment 
                at our online bookstore.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/books">
                  <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white transition-all duration-300 transform hover:scale-105">
                    Browse Books
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-bookstore-purple text-bookstore-purple hover:bg-bookstore-light-purple transition-all duration-300">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-md">
                <img
                  src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg"
                  alt="Books"
                  className="rounded-lg shadow-xl w-full hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks books={books} />

      {/* Bangla Books Section */}
      <section className="py-16 bg-gradient-to-r from-bookstore-soft-bg to-bookstore-light-purple/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">Bangla Books Collection</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of classic and contemporary Bangla literature from renowned Bengali authors.
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          >
            {banglaBooks.map(book => (
              <motion.div key={book.id} variants={itemVariants} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={`/books/${book.id}`}>
                  <div className="h-64 overflow-hidden">
                    <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-semibold text-xl mb-2">{book.title}</h3>
                    <p className="text-bookstore-purple">{book.author}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link to="/books?category=Bangla">
              <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white transition-all duration-300 transform hover:scale-105">
                View All Bangla Books
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-serif font-bold text-center mb-12"
          >
            Browse by Category
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {["Fiction", "Non-Fiction", "Science Fiction", "Biography", "Bangla", "Mystery"].map(
              (category) => (
                <motion.div key={category} variants={itemVariants}>
                  <Link
                    to={`/books?category=${category}`}
                    className="bg-bookstore-light-purple hover:bg-purple-100 rounded-lg p-6 text-center transition-all duration-300 transform hover:scale-105 flex flex-col items-center gap-2 shadow-sm hover:shadow-md"
                  >
                    {category === "Bangla" ? (
                      <Globe className="h-6 w-6 text-bookstore-purple" />
                    ) : (
                      <BookOpen className="h-6 w-6 text-bookstore-purple" />
                    )}
                    <h3 className="font-medium">{category}</h3>
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-bookstore-soft-bg">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-serif font-bold text-center mb-12"
          >
            Why Choose PageTurner?
          </motion.h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Thousands of books across all genres, from bestsellers to rare finds.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Easy Shopping
              </h3>
              <p className="text-gray-600">
                Simple and secure checkout process with multiple payment options.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-bookstore-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-bookstore-purple" />
              </div>
              <h3 className="font-serif font-medium text-xl mb-4">
                Expert Recommendations
              </h3>
              <p className="text-gray-600">
                Curated selections and personalized book recommendations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
