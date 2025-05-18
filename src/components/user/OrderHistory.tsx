
import React, { useState, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface OrderHistoryProps {
  userId: string;
}

// Mock order data (in a real app, this would come from the database)
const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "2", // Regular user ID from AuthContext sample data
    items: [
      {
        book: {
          id: "book-1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          description: "A classic novel about the American Dream",
          price: 12.99,
          coverImage: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
          categories: ["Fiction", "Classic"],
          inStock: 10,
          pages: 180,
          publishYear: 1925,
          isbn: "978-0743273565",
          language: "English"
        },
        quantity: 1
      }
    ],
    total: 12.99,
    status: "completed",
    createdAt: "2023-12-15T14:20:00Z"
  },
  {
    id: "order2",
    userId: "2",
    items: [
      {
        book: {
          id: "book-2",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          description: "A story about racial injustice and moral growth",
          price: 14.99,
          coverImage: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
          categories: ["Fiction", "Classic"],
          inStock: 15,
          pages: 281,
          publishYear: 1960,
          isbn: "978-0061120084",
          language: "English"
        },
        quantity: 1
      }
    ],
    total: 14.99,
    status: "completed",
    createdAt: "2024-01-20T10:15:00Z"
  }
];

const OrderHistory = ({ userId }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { sendEmail } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch user orders
  useEffect(() => {
    // In a real app, this would be an API call
    const userOrders = mockOrders.filter((order) => order.userId === userId);
    setOrders(userOrders);
  }, [userId]);

  const handleRequestReceipt = async (order: Order) => {
    setIsLoading(true);
    try {
      // In a real app, this would generate a proper receipt
      const items = order.items.map(item => `${item.book.title} (${item.quantity}x): $${(item.book.price * item.quantity).toFixed(2)}`).join('\n');
      
      const emailContent = `
Dear Customer,

Thank you for your order with PageTurner Books!

Order #: ${order.id}
Date: ${formatDate(new Date(order.createdAt))}
Total: $${order.total.toFixed(2)}

Items:
${items}

We appreciate your business!

PageTurner Books Team
      `;
      
      await sendEmail(
        "customer@example.com", // In a real app, this would be the user's email
        "Your PageTurner Receipt",
        emailContent
      );
      
      toast({
        title: "Receipt Sent",
        description: "Check your email for the receipt",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send receipt",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
        <Button asChild>
          <a href="/books">Browse Books</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b bg-gray-50 flex flex-wrap justify-between items-center gap-2">
              <div>
                <div className="text-sm text-gray-500">Order #{order.id}</div>
                <div className="font-medium">{formatDate(new Date(order.createdAt))}</div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`${
                  order.status === "completed" ? "bg-green-100 text-green-800" : 
                  order.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleRequestReceipt(order)}
                  disabled={isLoading}
                >
                  Get Receipt
                </Button>
              </div>
            </div>
            
            <div className="divide-y">
              {order.items.map((item: CartItem) => (
                <div key={item.book.id} className="p-4 flex items-center">
                  <div className="w-12 h-16 overflow-hidden rounded mr-4 flex-shrink-0">
                    <img 
                      src={item.book.coverImage} 
                      alt={item.book.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.book.title}</h4>
                    <div className="text-sm text-gray-600">{item.book.author}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-gray-50 text-right">
              <div className="font-medium">Total: ${order.total.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;
