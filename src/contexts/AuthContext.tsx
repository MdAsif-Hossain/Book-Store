import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  sendEmail: (to: string, subject: string, content: string) => Promise<boolean>;
}

// Sample users for demo purposes
const sampleUsers: User[] = [
  {
    id: "1",
    email: "admin@bookstore.com",
    name: "Admin User",
    isAdmin: true,
  },
  {
    id: "2",
    email: "user@example.com",
    name: "Regular User",
    isAdmin: false,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("bookstoreUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Find user by email (simplified for demo)
      const user = sampleUsers.find((u) => u.email === email);

      if (user) {
        setCurrentUser(user);
        localStorage.setItem("bookstoreUser", JSON.stringify(user));
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if user already exists (simplified for demo)
      if (sampleUsers.some((u) => u.email === email)) {
        throw new Error("Email already in use");
      }

      // Create new user (in a real app, this would be handled by the backend)
      const newUser: User = {
        id: (sampleUsers.length + 1).toString(),
        email,
        name,
        isAdmin: false,
      };

      // Add to sample users (for demo purposes)
      sampleUsers.push(newUser);

      // Log in the new user
      setCurrentUser(newUser);
      localStorage.setItem("bookstoreUser", JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("bookstoreUser");
  };

  const sendEmail = async (to: string, subject: string, content: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call for sending email
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Email sent to: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content: ${content}`);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isLoading,
    error,
    sendEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
