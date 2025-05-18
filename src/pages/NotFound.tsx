
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Book } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bookstore-soft-bg">
      <div className="text-center p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-bookstore-light-purple rounded-full p-4">
            <Book className="h-12 w-12 text-bookstore-purple" />
          </div>
        </div>
        <h1 className="text-6xl font-serif font-bold text-bookstore-purple mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back to browsing books.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-bookstore-purple hover:bg-bookstore-dark-purple text-white w-full">
              Back to Home
            </Button>
          </Link>
          <Link to="/books">
            <Button variant="outline" className="border-bookstore-purple text-bookstore-purple hover:bg-bookstore-light-purple w-full">
              Browse Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
