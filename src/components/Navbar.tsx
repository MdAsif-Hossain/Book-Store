
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

// Import our new components
import { Logo } from "./navbar/Logo";
import { SearchBar } from "./navbar/SearchBar";
import { DesktopNav } from "./navbar/DesktopNav";
import { DesktopActions } from "./navbar/DesktopActions";
import { MobileMenu } from "./navbar/MobileMenu";
import { MobileMenuToggle } from "./navbar/MobileMenuToggle";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { currentUser, logout } = useAuth();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav currentUser={currentUser} />

          {/* Desktop Actions */}
          <DesktopActions 
            currentUser={currentUser}
            itemCount={itemCount}
            toggleSearch={toggleSearch}
            logout={logout}
          />

          {/* Mobile Menu Toggle */}
          <MobileMenuToggle 
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Search Bar */}
        <SearchBar isOpen={isSearchOpen} />

        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          currentUser={currentUser}
          itemCount={itemCount}
          logout={logout}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
};

export default Navbar;
