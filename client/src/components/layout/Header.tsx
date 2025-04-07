import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/ui/cart-drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, MapPin, Heart } from "lucide-react";
import logoPath from "@/assets/logo.svg";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount } = useCart();
  
  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  return (
    <header className={`bg-white sticky top-0 z-30 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="flex items-center text-white/90 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <p className="text-sm font-medium">Free store pickup on all orders! 🎉</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm hidden sm:flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Store Hours: Mon-Sat 9AM-8PM
            </p>
            <a href="tel:+250780152723" className="text-sm hidden md:flex items-center hover:text-white/80 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +(250)780152723
            </a>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-primary flex items-center group">
            <img src={logoPath} alt="RwandaShop Logo" className="h-12 mr-2" />
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
                className="w-full py-2 px-4 pr-10 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
        
        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          <Link href="/wishlist">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700 hover:text-secondary relative p-2 hover:bg-secondary/5 rounded-full transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-700 hover:text-primary relative p-2 hover:bg-primary/5 rounded-full transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                {itemCount}
              </span>
            )}
          </Button>
          <Link href="/store-info">
            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary p-2 hover:bg-primary/5 rounded-full transition-colors">
              <MapPin className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Category Navigation */}
      <nav className={`bg-white border-t border-gray-100 py-3 overflow-x-auto whitespace-nowrap transition-shadow duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
        <div className="container mx-auto px-4 flex space-x-8">
          <Link 
            href="/" 
            className={`font-medium relative px-1 transition-colors ${location === '/' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>All Products</span>
            {location === '/' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/category/clothing" 
            className={`font-medium relative px-1 transition-colors ${location === '/category/clothing' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>Clothing</span>
            {location === '/category/clothing' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/category/tableware" 
            className={`font-medium relative px-1 transition-colors ${location === '/category/tableware' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>Tableware</span>
            {location === '/category/tableware' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/category/kitchen" 
            className={`font-medium relative px-1 transition-colors ${location === '/category/kitchen' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>Kitchen</span>
            {location === '/category/kitchen' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/category/home-decor" 
            className={`font-medium relative px-1 transition-colors ${location === '/category/home-decor' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>Home Decor</span>
            {location === '/category/home-decor' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/new-arrivals" 
            className={`font-medium relative px-1 transition-colors ${location === '/new-arrivals' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span>New Arrivals</span>
            {location === '/new-arrivals' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-primary rounded-full"></span>}
          </Link>
          <Link 
            href="/clearance"
            className={`font-medium relative px-1 transition-colors ${location === '/clearance' 
              ? 'text-primary' 
              : 'text-gray-600 hover:text-primary'}`}
          >
            <span className="text-secondary">Clearance</span>
            {location === '/clearance' && <span className="absolute bottom-[-12px] left-0 w-full h-0.5 bg-secondary rounded-full"></span>}
          </Link>
        </div>
      </nav>
      
      {/* Cart Drawer */}
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
