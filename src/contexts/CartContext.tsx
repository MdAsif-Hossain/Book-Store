
import React, { createContext, useContext, useState, useEffect } from "react";
import { Book, CartItem } from "../types";
import { toast } from "@/components/ui/use-toast";

// Currency conversion rate (1 USD = 120 BDT)
export const USD_TO_BDT_RATE = 120;

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("bookstoreCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookstoreCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book: Book, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.book.id === book.id);

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { book, quantity }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${book.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate cart total (in USD)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  // Calculate total number of items
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
