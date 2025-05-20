
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { User as UserType } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  currentUser: UserType | null;
  itemCount: number;
  logout: () => void;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  currentUser,
  itemCount,
  logout,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pt-4 pb-6 border-t mt-3 border-gray-100 animate-accordion-down">
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/books"
          className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
          onClick={onClose}
        >
          Books
        </Link>
        {currentUser && (
          <Link
            to="/dashboard"
            className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors flex items-center gap-2"
            onClick={onClose}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        )}
        {currentUser?.isAdmin && (
          <Link
            to="/admin/dashboard"
            className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
            onClick={onClose}
          >
            Admin Dashboard
          </Link>
        )}
        <Link
          to="/cart"
          className="flex items-center justify-between"
          onClick={onClose}
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
        <Link
          to="/admin-login"
          className="text-bookstore-dark-text hover:text-bookstore-purple transition-colors"
          onClick={onClose}
        >
          Admin Login
        </Link>
        <div className="pt-2 flex">
          {currentUser ? (
            <Button
              variant="outline"
              className="text-bookstore-purple border-bookstore-purple hover:bg-bookstore-light-purple w-full"
              onClick={() => {
                logout();
                onClose();
              }}
            >
              Logout
            </Button>
          ) : (
            <Link
              to="/login"
              className="w-full"
              onClick={onClose}
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
  );
};
