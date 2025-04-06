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

export default function NewArrivals() {
  const [sortBy, setSortBy] = useState<string>("default");

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products/new"],
  });

  const getSortedProducts = () => {
    if (!products) return [];
    
    const productsCopy = [...products];
    
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
      <div className="relative rounded-xl overflow-hidden mb-10 bg-gradient-to-r from-primary/90 to-primary/70">
        <div className="absolute inset-0 opacity-15 bg-pattern-dots"></div>
        <div className="relative py-12 px-8 text-white max-w-3xl">
          <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm mb-3">
            Just Added
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">New Arrivals</h1>
          <p className="text-white/90 text-lg max-w-xl mb-6">
            Discover our latest products with amazing discounts. Be the first to shop our newest styles before they're gone!
          </p>
          <div className="inline-block">
            <span className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Limited Time Offers
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Latest Products</h2>
          <p className="text-gray-600">Check out our newest collection</p>
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="name-a-z">Name: A to Z</SelectItem>
            <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            <SelectItem value="discount">Biggest Discount</SelectItem>
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
              isNew={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No new products found</h3>
          <p className="text-gray-600">
            Check back soon for our new arrivals.
          </p>
        </div>
      )}
    </div>
  );
}