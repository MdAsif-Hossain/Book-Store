
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { User as UserType } from "@/types";

interface DesktopNavProps {
  currentUser: UserType | null;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ currentUser }) => (
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
);
