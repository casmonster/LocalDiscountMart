import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import RecentlyViewedProducts from "@/components/product/RecentlyViewedProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Minus, Plus, Heart } from "lucide-react";
import { convertToRwandanFrancs, formatRwandanFrancs } from "@/lib/currency";
import type { Product } from "@shared/schema";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    }
  });

  const { data: relatedProducts, isLoading: relatedLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/category", product?.categoryId],
    enabled: !!product?.categoryId,
    queryFn: async () => {
      const res = await fetch(`/api/products/category/${product?.categoryId}`);
      if (!res.ok) throw new Error('Related products not found');
      return res.json();
    }
  });

  // Add product to recently viewed when it loads
  useEffect(() => {
    if (product && product.id) {
      addToRecentlyViewed({
        id: product.id,
        slug: product.slug,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        discountPrice: product.discountPrice,
        stockLevel: product.stockLevel,
        categoryId: product.categoryId
      });
    }
  }, [product, addToRecentlyViewed]);

  useEffect(() => {
    if (product === null) {
      setLocation("/not-found");
    }
  }, [product, setLocation]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const isInStock = product?.stockLevel === "In Stock";
  const isLowStock = product?.stockLevel === "Low Stock";
  const discountPercentage = product?.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <Skeleton className="w-full aspect-square rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const filteredRelatedProducts = relatedProducts?.filter(p => p.id !== product.id).slice(0, 4) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            {product.discountPrice ? (
              <>
                <span className="text-2xl text-blue-800 font-bold mr-3">
                  {formatRwandanFrancs(convertToRwandanFrancs(product.discountPrice))}
                </span>
                <span className="text-gray-500 text-lg line-through">
                  {formatRwandanFrancs(convertToRwandanFrancs(product.price))}
                </span>
                <span className="ml-2 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl text-blue-800 font-bold">
                {formatRwandanFrancs(convertToRwandanFrancs(product.price))}
              </span>
            )}
          </div>
          
          <div className="mb-4">
            {isInStock ? (
              <span className="text-success flex items-center">
                <CheckCircle className="h-5 w-5 mr-1" /> In Stock
              </span>
            ) : isLowStock ? (
              <span className="text-warning flex items-center">
                <AlertCircle className="h-5 w-5 mr-1" /> Low Stock
              </span>
            ) : (
              <span className="text-error flex items-center">
                <AlertCircle className="h-5 w-5 mr-1" /> Out of Stock
              </span>
            )}
          </div>
          
          <p className="text-gray-700 mb-6">
            {product.description}
          </p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="rounded-r-none"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="px-4 py-2 border-t border-b border-gray-300 text-center w-12">
                {quantity}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-l-none"
                onClick={incrementQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 mb-6">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={isCartLoading || !isInStock}
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="text-gray-500">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-bold mb-4">Store Pickup Details</h3>
              <p className="text-sm text-gray-700 mb-2">
                This item is available for in-store pickup. Once your order is placed, we'll prepare it for pickup at our store.
              </p>
              <p className="text-sm text-gray-700">
                You'll receive an email notification when your order is ready for pickup, typically within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mt-12">
          <Separator className="mb-6" />
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          
          {relatedLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[4/3]">
                  <Skeleton className="w-full h-full rounded-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((related) => (
                <div key={related.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
                  <a href={`/product/${related.slug}`} className="block">
                    <div className="aspect-[4/3]">
                      <img 
                        src={related.imageUrl} 
                        alt={related.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-1">{related.name}</h3>
                      <div className="flex items-center">
                        {related.discountPrice ? (
                          <>
                            <span className="text-blue-800 font-bold mr-2">
                              {formatRwandanFrancs(convertToRwandanFrancs(related.discountPrice))}
                            </span>
                            <span className="text-gray-500 text-sm line-through">
                              {formatRwandanFrancs(convertToRwandanFrancs(related.price))}
                            </span>
                          </>
                        ) : (
                          <span className="text-blue-800 font-bold">
                            {formatRwandanFrancs(convertToRwandanFrancs(related.price))}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Recently Viewed Products */}
      <RecentlyViewedProducts />
    </div>
  );
}
