
import React, { forwardRef } from "react";
import { PaymentSlip as PaymentSlipType } from "@/types";
import { formatDate } from "@/lib/utils";

interface PaymentSlipProps {
  paymentData: PaymentSlipType;
}

const PaymentSlip = forwardRef<HTMLDivElement, PaymentSlipProps>(({ paymentData }, ref) => {
  const { customerName, customerEmail, amount, paymentDate, receiptNumber, items } = paymentData;
  
  return (
    <div ref={ref} className="bg-white p-8 max-w-2xl mx-auto border border-gray-200 shadow-lg rounded-lg">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-bookstore-purple mb-1">PageTurner Bookstore</h1>
          <p className="text-gray-500">123 Book Street, Reading City</p>
          <p className="text-gray-500">contact@pageturner.com</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">Payment Receipt</h2>
          <p className="text-gray-500">#{receiptNumber}</p>
          <p className="text-gray-500">{formatDate(new Date(paymentDate))}</p>
        </div>
      </div>
      
      <div className="border-t border-b border-gray-200 py-4 my-4">
        <h3 className="font-semibold mb-2">Bill To:</h3>
        <p>{customerName}</p>
        <p>{customerEmail}</p>
      </div>
      
      <table className="w-full mb-6">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2">Item</th>
            <th className="text-center py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2">{item.name}</td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-right py-2">${item.price.toFixed(2)}</td>
              <td className="text-right py-2">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="text-right font-semibold py-4">Total:</td>
            <td className="text-right font-bold py-4">${amount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      <div className="text-center mt-8 text-gray-600 text-sm">
        <p>Thank you for your purchase!</p>
        <p className="mt-1">For any questions, contact our support team at support@pageturner.com</p>
      </div>
    </div>
  );
});

PaymentSlip.displayName = "PaymentSlip";

export default PaymentSlip;
