import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/ui/cart-drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, MapPin } from "lucide-react";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { itemCount } = useCart();
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-30">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p className="text-sm font-medium">Free store pickup on all orders! 🎉</p>
          <p className="text-sm hidden sm:block">Store Hours: Mon-Sat 9AM-8PM</p>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>DiscountMart</span>
          </Link>
        </div>
        
        {/* Search Bar */}
        <div className="w-full md:w-1/2 relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
        
        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-700 hover:text-primary relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
          <Link href="/store-info">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary">
              <MapPin className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Category Navigation */}
      <nav className="bg-gray-100 py-3 overflow-x-auto whitespace-nowrap">
        <div className="container mx-auto px-4 flex space-x-6">
          <Link href="/" className={`font-medium px-1 ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            All Products
          </Link>
          <Link href="/category/clothing" className={`font-medium px-1 ${location === '/category/clothing' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            Clothing
          </Link>
          <Link href="/category/tableware" className={`font-medium px-1 ${location === '/category/tableware' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            Tableware
          </Link>
          <Link href="/category/kitchen" className={`font-medium px-1 ${location === '/category/kitchen' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            Kitchen
          </Link>
          <Link href="/category/home-decor" className={`font-medium px-1 ${location === '/category/home-decor' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            Home Decor
          </Link>
          <Link href="/new-arrivals" className={`font-medium px-1 ${location === '/new-arrivals' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            New Arrivals
          </Link>
          <Link href="/clearance" className={`font-medium px-1 ${location === '/clearance' ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}>
            Clearance
          </Link>
        </div>
      </nav>
      
      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
