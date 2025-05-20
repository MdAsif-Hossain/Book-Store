
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  isOpen: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
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
  );
};
