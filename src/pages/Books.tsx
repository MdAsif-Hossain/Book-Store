
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);

  // Extract all unique categories from books
  const allCategories = useMemo(() => {
    const categories = books.flatMap((book) => book.categories);
    return [...new Set(categories)].sort();
  }, []);

  // Filter books based on search criteria
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search term filter (title, author)
      const matchesSearch =
        searchTerm === "" ||
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        book.categories.some((category) => selectedCategories.includes(category));

      // Price filter
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategories, priceRange]);

  // Handle category checkbox change
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL search params if needed
  };

  return (
    <div className="min-h-screen bg-bookstore-soft-bg py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4">Browse Books</h1>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <div className="lg:w-1/4 bg-white rounded-lg p-6 shadow-sm h-fit">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif font-medium text-xl">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm text-gray-500 flex items-center"
              >
                <X className="h-4 w-4 mr-1" /> Clear All
              </Button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {allCategories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm font-normal"
                    >
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="number"
                  min="0"
                  max="999"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="text-sm"
                />
                <span>to</span>
                <Input
                  type="number"
                  min="0"
                  max="999"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="text-sm"
                />
              </div>
              <Button
                className="w-full mt-2"
                size="sm"
                onClick={() => {
                  // Apply price filter logic
                }}
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Books grid */}
          <div className="lg:w-3/4">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-xl text-gray-500 font-medium mb-4">No books found</p>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
