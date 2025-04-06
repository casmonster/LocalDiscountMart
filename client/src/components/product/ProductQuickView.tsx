import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Heart, 
  ShoppingCart, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  Minus,
  Plus
} from "lucide-react";

interface ProductQuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: number;
    slug: string;
    name: string;
    imageUrl: string;
    price: number;
    discountPrice: number | null;
    stockLevel: string;
    description: string;
    categoryId: number;
    isNew?: boolean;
  } | null;
}

export default function ProductQuickView({ 
  open, 
  onOpenChange,
  product 
}: ProductQuickViewProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  // Reset quantity when modal opens with new product
  useEffect(() => {
    if (open && product) {
      setQuantity(1);
    }
  }, [open, product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const isInStock = product.stockLevel === "In Stock";
  const isLowStock = product.stockLevel === "Low Stock";
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const handleAddToCart = async () => {
    if (!isInStock) return;
    
    setIsAdding(true);
    try {
      await addToCart(product.id, quantity);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      onOpenChange(false);
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

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      discountPrice: product.discountPrice
    });
    
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: inWishlist 
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    });
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[850px] p-0 gap-0 max-h-[90vh] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative bg-gray-50">
            <div className="relative aspect-square">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Sale/New Badge */}
              {product.discountPrice && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-secondary to-secondary/80 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center">
                  <span>{discountPercentage}% OFF</span>
                </div>
              )}
              {product.isNew && !product.discountPrice && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center">
                  <span>NEW</span>
                </div>
              )}
            </div>
            
            {/* Close Button */}
            <DialogClose className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 shadow-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          
          {/* Product Details */}
          <div className="p-6 flex flex-col">
            {/* Product Info */}
            <div className="mb-6">
              <div className="mb-1">
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
              
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              
              <div className="flex items-center mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-secondary font-bold text-xl mr-2">${product.discountPrice.toFixed(2)}</span>
                    <span className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <span className="text-gray-900 font-bold text-xl">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="text-gray-600 mb-6 line-clamp-3 text-sm">
                {product.description || "No description available for this product."}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center mt-4 mb-6">
                <span className="text-sm text-gray-600 mr-3">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none text-gray-600"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-none text-gray-600"
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 w-full">
                  <Button
                    variant={inWishlist ? "outline" : "secondary"}
                    size="icon"
                    className={`rounded-full h-12 w-12 flex-shrink-0 ${
                      inWishlist 
                        ? 'text-secondary border-secondary hover:bg-secondary/10' 
                        : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                    }`}
                    onClick={handleToggleWishlist}
                  >
                    <Heart 
                      className="h-5 w-5" 
                      fill={inWishlist ? 'currentColor' : 'none'} 
                    />
                  </Button>
                  
                  <Button
                    className="flex-grow py-6 rounded-full shadow-sm flex items-center justify-center gap-2"
                    onClick={handleAddToCart}
                    disabled={isAdding || !isInStock}
                  >
                    {isAdding ? (
                      <span className="flex items-center">
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding...
                      </span>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </Button>
                </div>
                
                <Link href={`/product/${product.slug}`} onClick={() => onOpenChange(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-full"
                  >
                    View Full Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              {/* Pickup Information */}
              <div className="mt-6 bg-primary/5 p-4 rounded-lg flex items-start text-sm">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Available for Store Pickup</p>
                  <p className="text-gray-600 mt-1">
                    This item can be picked up at our store location. You'll receive an email when your order is ready.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}