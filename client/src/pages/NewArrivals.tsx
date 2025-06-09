import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import FeaturedProductShowcase from "@/components/product/FeaturedProductShowcase";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import type { Product } from "@shared/schema";

export default function NewArrivals() {
  const [sortBy, setSortBy] = useState<string>("default");

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/new"],
    queryFn: async () => {
      const response = await fetch("/api/products/new");
      if (!response.ok) throw new Error('Failed to fetch new products');
      return response.json();
    },
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">New Arrivals</h1>
        <p className="text-gray-600">Check out our newest products just added to our store</p>
      </div>
      
      <div className="flex justify-end mb-6">
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
      
      {productsLoading ? (
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
          {/* Featured New Arrival Showcase */}
          {sortedProducts.length > 0 && (
            <FeaturedProductShowcase 
              product={{
                ...sortedProducts[0],
                description: sortedProducts[0].description || "Be among the first to experience this brand new addition to our collection. Just arrived and already turning heads!"
              }}
              properties={[
                { name: 'Release Date', value: 'New This Week' },
                { name: 'Available In Store', value: 'Yes' },
                { name: 'Collection', value: 'Spring 2025' },
                { name: 'Limited Edition', value: 'Yes' }
              ]}
            />
          )}
          
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
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No new products found</h3>
          <p className="text-gray-600">
            Check back soon for our newest arrivals!
          </p>
        </div>
      )}
    </div>
  );
}