
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MinusCircle,
  PlusCircle,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to complete your purchase.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    // Simulating a checkout process
    toast({
      title: "Order Completed",
      description: "Your order has been placed successfully!",
    });
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bookstore-soft-bg py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4 flex justify-center">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Link to="/books">
              <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white">
                Browse Books
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="font-serif text-xl font-medium mb-6">
                    Cart Items ({cartItems.length})
                  </h2>

                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.book.id}
                        className="flex flex-col sm:flex-row gap-4 pb-6 border-b last:border-0"
                      >
                        <div className="sm:w-20 flex-shrink-0">
                          <img
                            src={item.book.coverImage}
                            alt={item.book.title}
                            className="w-full h-auto rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                            <div>
                              <Link
                                to={`/books/${item.book.id}`}
                                className="font-medium hover:text-bookstore-purple"
                              >
                                {item.book.title}
                              </Link>
                              <p className="text-sm text-gray-500">
                                {item.book.author}
                              </p>
                            </div>
                            <div className="mt-2 sm:mt-0 font-medium">
                              ${(item.book.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.book.id,
                                    Math.max(1, item.quantity - 1)
                                  )
                                }
                                className="text-gray-500 hover:text-bookstore-purple"
                              >
                                <MinusCircle className="h-5 w-5" />
                              </button>
                              <span className="px-2">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.book.id, item.quantity + 1)
                                }
                                className="text-gray-500 hover:text-bookstore-purple"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.book.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
                <h2 className="font-serif text-xl font-medium mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-4 font-medium">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-bookstore-purple hover:bg-bookstore-dark-purple text-white"
                >
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="mt-6 text-center">
                  <Link
                    to="/books"
                    className="text-bookstore-purple hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
