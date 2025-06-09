import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";

export default function Clearance() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    },
  });

  // Filter products that have discounts (clearance items)
  const clearanceProducts = products?.filter(product => product.discountPrice !== null) || [];

  // Calculate average discount percentage for display
  const averageDiscount = clearanceProducts.length > 0 
    ? Math.round(clearanceProducts.reduce((sum, product) => {
        const discount = product.discountPrice 
          ? ((product.price - product.discountPrice) / product.price) * 100 
          : 0;
        return sum + discount;
      }, 0) / clearanceProducts.length)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Badge className="bg-red-500 text-white text-lg px-4 py-2">
            CLEARANCE SALE
          </Badge>
          <Badge variant="outline" className="text-red-600 border-red-600 text-lg px-4 py-2">
            Up to {averageDiscount}% OFF
          </Badge>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Clearance Items
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing deals on quality products! These discounted items are available for a limited time. 
          Perfect for budget-conscious shoppers looking for great value.
        </p>
      </div>

      {/* Products Grid */}
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
      ) : clearanceProducts.length > 0 ? (
        <>
          <div className="mb-6 text-center">
            <p className="text-gray-600">
              <span className="font-semibold text-red-600">{clearanceProducts.length}</span> clearance items available
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clearanceProducts.map((product) => (
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
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No Clearance Items Available</h3>
          <p className="text-gray-600">
            Check back soon for new clearance deals and discounted items.
          </p>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-16 bg-gray-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">About Our Clearance Sale</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Limited Quantities</h3>
              <p className="text-gray-600">
                Clearance items are available while supplies last. Don't miss out on these deals!
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All clearance items maintain our high quality standards with full warranty coverage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Store Pickup Available</h3>
              <p className="text-gray-600">
                All clearance items are available for convenient store pickup at our downtown location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}