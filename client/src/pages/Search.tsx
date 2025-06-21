import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Search() {
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  // Extract search query from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const query = params.get('q') || '';
    setSearchQuery(query);
    setActiveQuery(query);
  }, [location]);

  const { data: searchResults, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/search`, activeQuery],
    queryFn: async () => {
      if (!activeQuery.trim()) return [];
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(activeQuery)}`);
      if (!response.ok) throw new Error('Failed to search products');
      return response.json();
    },
    enabled: !!activeQuery.trim()
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Products</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-4 max-w-md">
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!searchQuery.trim()}>
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>

      {/* Search Results */}
      {activeQuery && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Search Results for "{activeQuery}"
          </h2>
          {!isLoading && searchResults && (
            <p className="text-gray-600">
              Found {searchResults.length} {searchResults.length === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search Results Grid */}
      {!isLoading && searchResults && searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              discountPrice={product.discountPrice}
              stockLevel={product.stockLevel}
              isNew={product.isNew}
              setPieces={product.setPieces || 1}
              unitType={product.unitType || "piece"}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && activeQuery && searchResults && searchResults.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products matching "{activeQuery}". Try adjusting your search terms.
          </p>
          <Button onClick={() => navigate("/")}>
            Browse All Products
          </Button>
        </div>
      )}

      {/* Initial State - No Search */}
      {!activeQuery && (
        <div className="text-center py-12">
          <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Your Search
          </h3>
          <p className="text-gray-600">
            Enter keywords to find your favorite products
          </p>
        </div>
      )}
    </div>
  );
}