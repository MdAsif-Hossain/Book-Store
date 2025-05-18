
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { books as initialBooks } from "@/data/books";
import { Book } from "@/types";
import { Pencil, Trash2, PlusCircle, Search, ArrowLeft } from "lucide-react";

const ManageBooks = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You don't have permission to access this page.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle book deletion
  const handleDeleteBook = (bookId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBooks(books.filter((book) => book.id !== bookId));
      toast({
        title: "Book Deleted",
        description: "The book has been successfully removed.",
      });
      setIsLoading(false);
    }, 500);
  };

  // Handle bulk deletion
  const handleBulkDelete = () => {
    if (selectedBooks.length === 0) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBooks(books.filter((book) => !selectedBooks.includes(book.id)));
      toast({
        title: "Books Deleted",
        description: `${selectedBooks.length} books have been successfully removed.`,
      });
      setSelectedBooks([]);
      setIsLoading(false);
    }, 500);
  };

  // Toggle book selection for bulk actions
  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  // Toggle featured status
  const toggleFeatured = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId
          ? { ...book, featured: !book.featured }
          : book
      )
    );
    
    toast({
      title: "Book Updated",
      description: "Featured status has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-bookstore-soft-bg py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-bookstore-purple"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 md:mb-0">Manage Books</h1>
          <div className="flex gap-4">
            <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white">
              <PlusCircle className="mr-2 h-5 w-5" /> Add New Book
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              {selectedBooks.length > 0 && (
                <Button 
                  variant="destructive" 
                  onClick={handleBulkDelete}
                  disabled={isLoading}
                >
                  <Trash2 className="mr-2 h-5 w-5" />
                  Delete Selected ({selectedBooks.length})
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="py-4 px-6 text-left">
                    <Checkbox
                      checked={
                        filteredBooks.length > 0 &&
                        filteredBooks.every((book) =>
                          selectedBooks.includes(book.id)
                        )
                      }
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBooks(filteredBooks.map((book) => book.id));
                        } else {
                          setSelectedBooks([]);
                        }
                      }}
                    />
                  </th>
                  <th className="py-4 px-6 text-left">Book</th>
                  <th className="py-4 px-6 text-left">Author</th>
                  <th className="py-4 px-6 text-left">Price</th>
                  <th className="py-4 px-6 text-left">Stock</th>
                  <th className="py-4 px-6 text-left">Featured</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <Checkbox
                          checked={selectedBooks.includes(book.id)}
                          onCheckedChange={() => toggleBookSelection(book.id)}
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-10 h-14 object-cover mr-3 rounded"
                          />
                          <div>
                            <p className="font-medium line-clamp-1">{book.title}</p>
                            <p className="text-xs text-gray-500">ID: {book.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">{book.author}</td>
                      <td className="py-4 px-6">${book.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            book.inStock === 0
                              ? "bg-red-100 text-red-800"
                              : book.inStock < 10
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {book.inStock} in stock
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Checkbox
                            checked={book.featured || false}
                            onCheckedChange={() => toggleFeatured(book.id)}
                            id={`featured-${book.id}`}
                          />
                          <Label
                            htmlFor={`featured-${book.id}`}
                            className="ml-2 text-sm font-normal"
                          >
                            Featured
                          </Label>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteBook(book.id)}
                            disabled={isLoading}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">
                      No books found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
