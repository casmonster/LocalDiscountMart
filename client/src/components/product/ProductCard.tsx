import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CheckCircle, AlertCircle, ShoppingCart, Eye, Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import ProductQuickView from "./ProductQuickView";
import { convertToRwandanFrancs, formatRwandanFrancs } from "@/lib/currency";

type ProductCardProps = {
  id: number;
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
  stockLevel: string;
  isNew?: boolean;
  setPieces?: number;
  unitType?: string;
};

export default function ProductCard({
  id,
  slug,
  name,
  imageUrl,
  price,
  discountPrice,
  stockLevel,
  isNew = false,
  setPieces = 1,
  unitType = "piece",
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { toast } = useToast();

  const inWishlist = isInWishlist(id);

  // Fetch product details when quick view is opened
  const { data: productDetail } = useQuery({
    queryKey: [`/api/products/${slug}`],
    queryFn: async () => {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch product details');
      return response.json();
    },
    enabled: isQuickViewOpen, // Only fetch when the modal is open
  });

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    try {
      await addToCart(id, 1);
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleWishlist({
      id,
      slug,
      name,
      imageUrl,
      price,
      discountPrice
    });
    
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist 
        ? `${name} has been removed from your wishlist.`
        : `${name} has been added to your wishlist.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const isInStock = stockLevel === "In Stock";
  const isLowStock = stockLevel === "Low Stock";
  const discountPercentage = discountPrice 
    ? Math.round(((price - discountPrice) / price) * 100) 
    : 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
        <div className="block h-full">
          <div className="relative aspect-square overflow-hidden bg-gray-50">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Sale tag */}
            {discountPrice && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {discountPercentage}% OFF
              </div>
            )}

            {/* New tag */}
            {isNew && !discountPrice && (
              <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                NEW
              </div>
            )}

            {/* Wishlist button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-colors ${
                inWishlist 
                  ? 'text-secondary hover:text-secondary/80' 
                  : 'text-gray-600 hover:text-secondary'
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart 
                className="h-4 w-4" 
                fill={inWishlist ? 'currentColor' : 'none'} 
              />
            </Button>

            {/* Overlay with buttons */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Button
                  size="sm"
                  variant="secondary"
                  className="flex-1 rounded-full shadow-md backdrop-blur-sm bg-white/90 hover:bg-white text-primary hover:text-primary flex items-center justify-center gap-1.5 border-0"
                  onClick={handleQuickView}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Quick View</span>
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAddToCart}
                  disabled={isAdding || !isInStock}
                  className="flex-1 rounded-full shadow-md bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-1.5"
                >
                  {isAdding ? (
                    <span className="flex items-center">
                      <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1.5"></div>
                      Adding...
                    </span>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Link href={`/product/${slug}`} className="block">
            <div className="p-4 flex flex-col flex-grow">
              {/* Stock status above title */}
              <div className="mb-1.5">
                {isInStock ? (
                  <span className="text-xs text-green-600 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    <span>In Stock</span>
                  </span>
                ) : isLowStock ? (
                  <span className="text-xs text-amber-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Low Stock</span>
                  </span>
                ) : (
                  <span className="text-xs text-red-500 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Out of Stock</span>
                  </span>
                )}
              </div>
              
              {/* Product name */}
              <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-primary transition-colors text-base/tight flex-grow">
                {name}
              </h3>
              
              {/* Set information */}
              {setPieces > 1 && (
                <div className="mt-1">
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    {setPieces} {unitType === "set" ? "pieces per set" : `${unitType}s included`}
                  </span>
                </div>
              )}
              
              {/* Price display - Rwandan Francs */}
              <div className="flex items-center mt-2">
                {discountPrice ? (
                  <>
                    <span className="text-blue-800 font-bold mr-2 text-lg">
                      {formatRwandanFrancs(convertToRwandanFrancs(discountPrice * setPieces))}
                    </span>
                    <span className="text-gray-400 text-sm line-through">
                      {formatRwandanFrancs(convertToRwandanFrancs(price * setPieces))}
                    </span>
                  </>
                ) : (
                  <span className="text-blue-800 font-bold mr-2 text-lg">
                    {formatRwandanFrancs(convertToRwandanFrancs(price * setPieces))}
                  </span>
                )}
                {setPieces > 1 && (
                  <span className="text-xs text-gray-500">per {unitType}</span>
                )}
              </div>

              {/* Pill-shaped tag showing product status */}
              <div className="mt-3">
                {isInStock ? (
                  <span className="inline-block text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    Ready for Pickup
                  </span>
                ) : isLowStock ? (
                  <span className="inline-block text-xs text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                    Limited Availability
                  </span>
                ) : (
                  <span className="inline-block text-xs text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
                    Currently Unavailable
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView 
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
        product={productDetail}
      />
    </>
  );
}
