
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Book, DollarSign, ShoppingBag, Users } from "lucide-react";
import { books } from "@/data/books";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Sample data for charts
const monthlySalesData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 1398 },
  { month: "Mar", sales: 9800 },
  { month: "Apr", sales: 3908 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 3800 },
  { month: "Jul", sales: 4300 },
];

const topSellingBooks = [
  { name: "The Midnight Library", sales: 85 },
  { name: "Project Hail Mary", sales: 72 },
  { name: "Atomic Habits", sales: 65 },
  { name: "The Vanishing Half", sales: 58 },
  { name: "The Four Winds", sales: 45 },
];

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  // Check if user is admin, redirect if not
  if (!currentUser?.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-4">You don't have permission to access this page.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate book statistics
  const bookStats = useMemo(() => {
    const totalBooks = books.length;
    const outOfStock = books.filter((book) => book.inStock === 0).length;
    const lowStock = books.filter((book) => book.inStock > 0 && book.inStock < 10).length;

    // Calculate total inventory value
    const inventoryValue = books.reduce((total, book) => {
      return total + book.price * book.inStock;
    }, 0);

    return {
      totalBooks,
      outOfStock,
      lowStock,
      inventoryValue,
    };
  }, []);

  return (
    <div className="min-h-screen bg-bookstore-soft-bg py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4 md:mb-0">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link to="/admin/manage-books">
              <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white">
                Manage Books
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-100 p-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">$24,780</div>
                  <p className="text-xs text-gray-500">+12% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-2">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-gray-500">+8% from last month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-purple-100 p-2">
                  <Book className="h-6 w-6 text-bookstore-purple" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{bookStats.totalBooks}</div>
                  <p className="text-xs text-gray-500">
                    {bookStats.outOfStock} out of stock
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-orange-100 p-2">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">189</div>
                  <p className="text-xs text-gray-500">+24 new this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
              <CardDescription>Sales performance over the past 7 months</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#9b87f5"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Selling Books</CardTitle>
              <CardDescription>Best performing titles this month</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSellingBooks} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest 5 customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Order ID</th>
                    <th className="py-3 text-left font-medium">Customer</th>
                    <th className="py-3 text-left font-medium">Date</th>
                    <th className="py-3 text-left font-medium">Total</th>
                    <th className="py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">#ORD-12345</td>
                    <td className="py-3">John Smith</td>
                    <td className="py-3">May 15, 2023</td>
                    <td className="py-3">$89.97</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">#ORD-12344</td>
                    <td className="py-3">Sarah Johnson</td>
                    <td className="py-3">May 14, 2023</td>
                    <td className="py-3">$32.99</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">#ORD-12343</td>
                    <td className="py-3">Michael Brown</td>
                    <td className="py-3">May 14, 2023</td>
                    <td className="py-3">$68.50</td>
                    <td className="py-3">
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">#ORD-12342</td>
                    <td className="py-3">Emily Wilson</td>
                    <td className="py-3">May 13, 2023</td>
                    <td className="py-3">$124.75</td>
                    <td className="py-3">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">#ORD-12341</td>
                    <td className="py-3">David Lee</td>
                    <td className="py-3">May 12, 2023</td>
                    <td className="py-3">$54.99</td>
                    <td className="py-3">
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Cancelled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
