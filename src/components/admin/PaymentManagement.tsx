
import React, { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Mail, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import PaymentSlip from "@/components/admin/PaymentSlip";
import { PaymentSlip as PaymentSlipType, Order } from "@/types";
import { generateReceiptNumber } from "@/lib/utils";
import html2canvas from "html2canvas";

// Sample orders for demonstration
const sampleOrders: Order[] = [
  {
    id: "ord-001",
    userId: "2",
    items: [
      {
        book: {
          id: "1",
          title: "The Midnight Library",
          author: "Matt Haig",
          description: "A novel about regret, hope, and second chances",
          price: 14.99,
          coverImage: "/placeholder.svg",
          categories: ["Fiction"],
          inStock: 15,
          pages: 304,
          publishYear: 2020,
          isbn: "978-0525559474",
        },
        quantity: 1,
      },
      {
        book: {
          id: "2",
          title: "Atomic Habits",
          author: "James Clear",
          description: "Tiny Changes, Remarkable Results",
          price: 11.98,
          coverImage: "/placeholder.svg",
          categories: ["Self Help"],
          inStock: 10,
          pages: 320,
          publishYear: 2018,
          isbn: "978-0735211292",
        },
        quantity: 1,
      },
    ],
    total: 26.97,
    status: "completed",
    createdAt: "2023-05-15T14:30:00Z",
  },
  {
    id: "ord-002",
    userId: "2",
    items: [
      {
        book: {
          id: "3",
          title: "Project Hail Mary",
          author: "Andy Weir",
          description: "A lone astronaut must save humanity",
          price: 16.99,
          coverImage: "/placeholder.svg",
          categories: ["Science Fiction"],
          inStock: 8,
          pages: 496,
          publishYear: 2021,
          isbn: "978-0593135204",
        },
        quantity: 1,
      },
    ],
    total: 16.99,
    status: "pending",
    createdAt: "2023-05-16T09:45:00Z",
  },
];

// Sample user data for the receipts
const userMap = {
  "2": { name: "Regular User", email: "user@example.com" }
};

const PaymentManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();
  const { sendEmail } = useAuth();
  const paymentSlipRef = useRef<HTMLDivElement>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const createPaymentSlip = (order: Order): PaymentSlipType => {
    const user = userMap[order.userId as keyof typeof userMap];
    
    return {
      id: `slip-${order.id}`,
      orderId: order.id,
      amount: order.total,
      customerName: user.name,
      customerEmail: user.email,
      paymentDate: order.createdAt,
      receiptNumber: generateReceiptNumber(),
      items: order.items.map(item => ({
        name: item.book.title,
        quantity: item.quantity,
        price: item.book.price
      }))
    };
  };

  const handleViewPaymentSlip = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleSendEmail = async (order: Order) => {
    setSendingEmail(true);
    
    try {
      const paymentSlip = createPaymentSlip(order);
      const user = userMap[order.userId as keyof typeof userMap];
      
      // In a real application, you would generate an HTML email template
      // For this demo, we'll simulate sending an email with basic information
      const emailSubject = `Your PageTurner Receipt #${paymentSlip.receiptNumber}`;
      const emailContent = `
        Dear ${user.name},
        
        Thank you for your order at PageTurner Bookstore!
        
        Order Details:
        Receipt #: ${paymentSlip.receiptNumber}
        Date: ${new Date(paymentSlip.paymentDate).toLocaleDateString()}
        Total Amount: $${paymentSlip.amount.toFixed(2)}
        
        For more details, please check the attachment or log in to your account.
        
        Best regards,
        PageTurner Bookstore Team
      `;
      
      const success = await sendEmail(user.email, emailSubject, emailContent);
      
      if (success) {
        toast({
          title: "Email Sent",
          description: `Payment slip has been sent to ${user.email}`,
        });
      } else {
        toast({
          title: "Failed to Send Email",
          description: "There was a problem sending the email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send payment slip email",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handleSavePaymentSlip = async () => {
    if (!paymentSlipRef.current || !selectedOrder) return;
    
    setGeneratingPdf(true);
    
    try {
      const paymentSlip = createPaymentSlip(selectedOrder);
      
      // Use html2canvas to convert the payment slip to an image
      const canvas = await html2canvas(paymentSlipRef.current);
      
      // Convert the canvas to a data URL
      const imgData = canvas.toDataURL('image/png');
      
      // Create a link to download the image
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `PageTurner-Receipt-${paymentSlip.receiptNumber}.png`;
      link.click();
      
      toast({
        title: "Payment Slip Saved",
        description: "The payment slip has been saved as an image."
      });
    } catch (error) {
      console.error("Error generating payment slip:", error);
      toast({
        title: "Error",
        description: "Failed to generate payment slip",
        variant: "destructive",
      });
    } finally {
      setGeneratingPdf(false);
    }
  };

  const closeSlip = () => {
    setSelectedOrder(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>Manage customer orders and payment slips</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedOrder ? (
          <div className="animate-fade-in">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Payment Slip</h3>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleSavePaymentSlip}
                  disabled={generatingPdf}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {generatingPdf ? "Generating..." : "Save as Image"}
                </Button>
                <Button onClick={closeSlip} variant="outline">Close</Button>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-gray-50">
              <PaymentSlip 
                ref={paymentSlipRef} 
                paymentData={createPaymentSlip(selectedOrder)} 
              />
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((order) => {
                  const user = userMap[order.userId as keyof typeof userMap];
                  return (
                    <TableRow key={order.id} className="animate-fade-in">
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {user?.name || "Unknown"}
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{order.items.length}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full 
                          ${order.status === 'completed' ? 'bg-green-100 text-green-800' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleViewPaymentSlip(order)}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleSendEmail(order)}
                            disabled={sendingEmail}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentManagement;
