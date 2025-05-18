
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Book className="h-5 w-5 text-bookstore-purple" />
              <span className="font-serif font-bold text-xl">PageTurner</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Your destination for discovering new worlds through books. From bestsellers to rare finds, we have everything for book lovers.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-bookstore-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-bookstore-purple transition-colors">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-bookstore-purple transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-bookstore-purple transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div>
            <h4 className="font-serif font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">
                123 Book Street, Reading City
              </li>
              <li className="text-gray-600">
                contact@pageturner.com
              </li>
              <li className="text-gray-600">
                +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PageTurner Books. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
