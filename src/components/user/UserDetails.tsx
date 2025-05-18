
import React from "react";
import { User } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface UserDetailsProps {
  user: User;
}

const UserDetails = ({ user }: UserDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-20 w-20 bg-bookstore-light-purple rounded-full flex items-center justify-center text-2xl font-semibold text-bookstore-purple">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-medium">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          {user.isAdmin && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-1">
              Admin
            </span>
          )}
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium w-1/3">Full Name</td>
                <td className="py-3 px-4">{user.name}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 bg-gray-50 font-medium">Email Address</td>
                <td className="py-3 px-4">{user.email}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 bg-gray-50 font-medium">Account Type</td>
                <td className="py-3 px-4">{user.isAdmin ? "Administrator" : "Customer"}</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
