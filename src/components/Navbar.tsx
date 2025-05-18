import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  User,
  Search,
  Book,
  Menu,
  X,
  History,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Book className="h-6 w-6 text-bookstore-purple" />
            <span className="font-serif font-bold text-xl">PageTurner</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
            >
              Books
            </Link>
            {currentUser && (
              <Link
                to="/dashboard"
                className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors flex items-center gap-1"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
            )}
            {currentUser?.isAdmin && (
              <Link
                to="/admin/dashboard"
                className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-bookstore-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {currentUser ? (
              <div className="relative group">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm">{currentUser.name.split(" ")[0]}</span>
                </Button>
                <div className="absolute right-0 w-48 mt-2 bg-white shadow-lg rounded-md p-2 border border-gray-100 hidden group-hover:block">
                  <div className="py-2 px-4 text-sm text-gray-500">{currentUser.email}</div>
                  <hr className="my-1" />
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-bookstore-light-purple rounded-md w-full text-left flex items-center gap-2"
                  >
                    <History className="h-4 w-4" />
                    My Dashboard
                  </Link>
                  {currentUser.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-bookstore-light-purple rounded-md w-full text-left"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-bookstore-light-purple rounded-md w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="text-bookstore-purple border-bookstore-purple hover:bg-bookstore-light-purple">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="py-4 border-t mt-3 border-gray-100 animate-accordion-down">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Search for books, authors..."
                className="w-full"
              />
              <Button>Search</Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t mt-3 border-gray-100 animate-accordion-down">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/books"
                className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Books
              </Link>
              {currentUser && (
                <Link
                  to="/dashboard"
                  className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              )}
              {currentUser?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              <Link
                to="/cart"
                className="flex items-center justify-between"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors">
                  Cart
                </span>
                {itemCount > 0 && (
                  <span className="bg-bookstore-purple text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="pt-2 flex">
                {currentUser ? (
                  <Button
                    variant="outline"
                    className="text-bookstore-purple border-bookstore-purple hover:bg-bookstore-light-purple w-full"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Link
                    to="/login"
                    className="w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="outline"
                      className="text-bookstore-purple border-bookstore-purple hover:bg-bookstore-light-purple w-full"
                    >
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
