
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { books } from "@/data/books";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  // Find the book by ID
  const book = books.find((book) => book.id === id);

  // Handle if book is not found
  if (!book) {
    return (
      <div className="min-h-screen bg-bookstore-soft-bg py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif font-bold mb-6">Book Not Found</h1>
          <p className="mb-6">The book you're looking for doesn't exist or has been removed.</p>
          <Link to="/books">
            <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Add to cart with notification
  const handleAddToCart = () => {
    addToCart(book);
    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-bookstore-soft-bg py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/books"
            className="inline-flex items-center text-gray-600 hover:text-bookstore-purple"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Books
          </Link>
        </div>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {/* Book Cover */}
            <div className="p-6 flex justify-center md:col-span-1">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full max-w-xs rounded-md shadow-md"
              />
            </div>

            {/* Book Information */}
            <div className="p-6 md:col-span-2 lg:col-span-3">
              <h1 className="font-serif text-3xl font-bold mb-2">{book.title}</h1>
              <h2 className="text-xl text-gray-600 mb-4">by {book.author}</h2>

              <div className="mb-6">
                <div className="inline-block bg-bookstore-light-purple text-bookstore-purple px-3 py-1 rounded-full text-sm">
                  {book.categories[0]}
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold mr-4">${book.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">
                  {book.inStock > 0 ? `${book.inStock} in stock` : "Out of stock"}
                </span>
              </div>

              <div className="mb-8">
                <Button 
                  onClick={handleAddToCart}
                  className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white"
                  disabled={book.inStock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-serif font-medium text-lg mb-4">Description</h3>
                <p className="text-gray-700 mb-6">{book.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Pages</h4>
                    <p>{book.pages}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Publication Year</h4>
                    <p>{book.publishYear}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">ISBN</h4>
                    <p>{book.isbn}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500">Categories</h4>
                    <p>{book.categories.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
