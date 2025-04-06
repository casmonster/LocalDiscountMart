import { Link } from "wouter";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, Trash2, ChevronLeft } from "lucide-react";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddToCart = async (productId: number, productName: string) => {
    setAddingToCart(productId);
    try {
      await addToCart(productId);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Shopping
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          My Wishlist
          <Heart className="h-6 w-6 text-secondary" fill="currentColor" />
        </h1>
        <p className="text-gray-600 mt-1">
          {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved to your wishlist
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Save your favorite items to your wishlist so you can easily find them later.
          </p>
          <Link href="/">
            <Button className="px-6">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="relative">
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-medium text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mb-4">
                  {product.discountPrice ? (
                    <>
                      <span className="text-secondary font-bold mr-2">${product.discountPrice.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm line-through">${product.price.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <Button
                  className="w-full rounded-full"
                  onClick={() => handleAddToCart(product.id, product.name)}
                  disabled={addingToCart === product.id}
                >
                  {addingToCart === product.id ? (
                    <span className="flex items-center">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Adding...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </span>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}