
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

export const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <Book className="h-6 w-6 text-bookstore-purple" />
    <span className="font-serif font-bold text-xl">Isfahan</span>
  </Link>
);
