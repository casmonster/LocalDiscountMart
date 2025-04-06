import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { CheckCircle, AlertCircle } from "lucide-react";

type ProductCardProps = {
  id: number;
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
  stockLevel: string;
  isNew?: boolean;
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
}: ProductCardProps) {
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  const isInStock = stockLevel === "In Stock";
  const isLowStock = stockLevel === "Low Stock";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition group">
      <Link href={`/product/${slug}`}>
        <div className="relative aspect-[4/3]">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          {discountPrice && (
            <div className="absolute top-3 left-3 bg-secondary text-white text-sm font-bold px-2 py-1 rounded">
              {Math.round(((price - discountPrice) / price) * 100)}% OFF
            </div>
          )}
          {isNew && !discountPrice && (
            <div className="absolute top-3 left-3 bg-primary text-white text-sm font-bold px-2 py-1 rounded">
              NEW
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-900/30 backdrop-blur-sm py-2 px-3 text-white opacity-0 group-hover:opacity-100 transition">
            Quick View
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-1 text-gray-900">{name}</h3>
          <div className="flex items-center mb-2">
            {discountPrice ? (
              <>
                <span className="text-secondary font-bold mr-2">${discountPrice.toFixed(2)}</span>
                <span className="text-gray-500 text-sm line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold mr-2">${price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex justify-between items-center mt-3">
            {isInStock ? (
              <span className="text-sm text-success flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" /> In Stock
              </span>
            ) : isLowStock ? (
              <span className="text-sm text-warning flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> Low Stock
              </span>
            ) : (
              <span className="text-sm text-error flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> Out of Stock
              </span>
            )}
            <Button 
              size="sm"
              onClick={handleAddToCart}
              disabled={isLoading || !isInStock}
              className="bg-primary text-white py-1.5 px-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
