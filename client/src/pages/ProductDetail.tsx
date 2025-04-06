import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, AlertCircle, Minus, Plus, Heart, MessageCircle, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@shared/schema";

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  const { data: relatedProducts, isLoading: relatedLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/category", product?.categoryId],
    enabled: !!product?.categoryId,
  });

  useEffect(() => {
    if (product === null) {
      setLocation("/not-found");
    }
  }, [product, setLocation]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked 
        ? `${product?.name} has been removed from your favorites.` 
        : `${product?.name} has been added to your favorites.`,
    });
  };
  
  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment feature will be available soon!",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share",
      description: "Share feature will be available soon!",
    });
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
                <span className="text-2xl text-secondary font-bold mr-3">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-lg line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
                  {discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
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
          
          <p className="text-gray-700 mb-4">
            {product.description}
          </p>
          
          {/* Product Specifications */}
          <div className="mb-6 space-y-4">
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:border-primary cursor-pointer transition"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:border-primary cursor-pointer transition"
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Material and Texture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.material && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Material</h3>
                  <p className="text-sm text-gray-700">{product.material}</p>
                </div>
              )}
              
              {product.texture && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Texture</h3>
                  <p className="text-sm text-gray-700">{product.texture}</p>
                </div>
              )}
            </div>
            
            {/* Dimensions and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.dimensions && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Dimensions</h3>
                  <p className="text-sm text-gray-700">{product.dimensions}</p>
                </div>
              )}
              
              {product.weight && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Weight</h3>
                  <p className="text-sm text-gray-700">{product.weight}</p>
                </div>
              )}
            </div>
            
            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Features</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
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
            <Button 
              variant="outline" 
              size="icon" 
              className={`${isLiked ? 'text-red-500 bg-red-50 border-red-200' : 'text-gray-500'} hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors`}
              onClick={handleToggleLike}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
            </Button>
          </div>
          
          {/* Social Action Bar */}
          <div className="flex justify-between mb-6 border bg-gray-50 rounded-lg p-2">
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-red-500 hover:bg-red-50/50"
              onClick={handleToggleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
            </Button>
            
            <Separator orientation="vertical" className="h-8 my-auto" />
            
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-blue-500 hover:bg-blue-50/50"
              onClick={handleComment}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Comment</span>
            </Button>
            
            <Separator orientation="vertical" className="h-8 my-auto" />
            
            <Button 
              variant="ghost" 
              className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-green-500 hover:bg-green-50/50"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
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
                            <span className="text-secondary font-bold mr-2">${related.discountPrice.toFixed(2)}</span>
                            <span className="text-gray-500 text-sm line-through">${related.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-bold">${related.price.toFixed(2)}</span>
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
    </div>
  );
}
