import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export default function Clearance() {
  const [sortBy, setSortBy] = useState<string>("discount");

  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["/api/products"],
  });

  // Filter products to only show ones with discounts
  const filteredProducts = allProducts ? allProducts.filter(product => product.discountPrice !== null) : [];

  const getSortedProducts = () => {
    if (!filteredProducts || filteredProducts.length === 0) return [];
    
    const productsCopy = [...filteredProducts];
    
    switch (sortBy) {
      case "price-low-high":
        return productsCopy.sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return aPrice - bPrice;
        });
      case "price-high-low":
        return productsCopy.sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return bPrice - aPrice;
        });
      case "name-a-z":
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-a":
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case "discount":
        return productsCopy.sort((a, b) => {
          const aDiscount = a.discountPrice ? (a.price - a.discountPrice) / a.price : 0;
          const bDiscount = b.discountPrice ? (b.price - b.discountPrice) / b.price : 0;
          return bDiscount - aDiscount;
        });
      default:
        return productsCopy;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden mb-10 bg-gradient-to-r from-secondary/90 to-secondary/70">
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'white', strokeWidth: 1, strokeOpacity: 0.2 }} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
          </svg>
        </div>
        <div className="relative py-12 px-8 text-white max-w-3xl">
          <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm mb-3">
            Limited Time
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Clearance Sale</h1>
          <p className="text-white/90 text-lg max-w-xl mb-6">
            Grab amazing deals with up to 70% off on selected items. Hurry, shop now while supplies last!
          </p>
          <div className="inline-block">
            <span className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Sale Ends Soon
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Discount Deals</h2>
          <p className="text-gray-600">Great products at even better prices</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="discount">Biggest Discount</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="name-a-z">Name: A to Z</SelectItem>
            <SelectItem value="name-z-a">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="aspect-[4/3]">
              <Skeleton className="w-full h-full rounded-lg" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                imageUrl={product.imageUrl}
                price={product.price}
                discountPrice={product.discountPrice}
                stockLevel={product.stockLevel}
                isNew={false}
              />
            ))}
          </div>
          
          {/* Sales Banner */}
          <div className="mt-16 mb-8 bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-gray-600 max-w-md">
                Be the first to know about new clearance items and exclusive deals!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No clearance products available</h3>
          <p className="text-gray-600">
            Check back soon for new clearance deals.
          </p>
        </div>
      )}
    </div>
  );
}