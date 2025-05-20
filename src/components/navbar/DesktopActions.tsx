
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, User, ShieldCheck, History } from "lucide-react";
import { User as UserType } from "@/types";

interface DesktopActionsProps {
  currentUser: UserType | null;
  itemCount: number;
  toggleSearch: () => void;
  logout: () => void;
}

export const DesktopActions: React.FC<DesktopActionsProps> = ({
  currentUser,
  itemCount,
  toggleSearch,
  logout,
}) => (
  <div className="hidden md:flex items-center space-x-4">
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSearch}
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
      <div className="flex items-center gap-2">
        <Link to="/login">
          <Button variant="outline" className="text-bookstore-purple border-bookstore-purple hover:bg-bookstore-light-purple">
            Sign In
          </Button>
        </Link>
        <Link to="/admin-login">
          <Button variant="ghost" size="icon" className="text-bookstore-purple">
            <ShieldCheck className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    )}
  </div>
);
