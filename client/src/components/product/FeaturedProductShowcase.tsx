import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Heart, ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { convertToRwandanFrancs, formatRwandanFrancs } from "@/lib/currency";

type ProductProperty = {
  name: string;
  value: string;
  type?: "color" | "size" | "texture" | "material" | "default";
};

type FeaturedProductShowcaseProps = {
  product: {
    id: number;
    slug: string;
    name: string;
    imageUrl: string;
    price: number;
    discountPrice: number | null;
    stockLevel: string;
    description: string;
    isNew?: boolean;
  };
  properties?: ProductProperty[];
};

export default function FeaturedProductShowcase({ 
  product, 
  properties = []
}: FeaturedProductShowcaseProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading: isCartLoading } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);
  
  const isInStock = product.stockLevel === "In Stock";
  const isLowStock = product.stockLevel === "Low Stock";
  
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));
  
  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };
  
  function renderPropertyValue(property: ProductProperty) {
    if (property.type === "color") {
      return (
        <div className="flex items-center">
          <div 
            className="w-6 h-6 rounded-full mr-2 border border-gray-300" 
            style={{ backgroundColor: property.value }}
          />
          <span>{property.value}</span>
        </div>
      );
    }
    
    if (property.type === "texture") {
      return (
        <div className="flex items-center">
          <div 
            className="w-10 h-10 rounded-md mr-2 border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${property.value})` }}
          />
          <span>{property.value.split('/').pop()?.split('.')[0]}</span>
        </div>
      );
    }
    
    return <span>{property.value}</span>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
      <div className="md:flex">
        <div className="md:w-1/2 relative">
          {product.isNew && (
            <Badge className="absolute top-4 right-4 bg-primary text-white">New</Badge>
          )}
          {product.discountPrice && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
              {discountPercentage}% OFF
            </Badge>
          )}
          <div className="h-80 md:h-full w-full overflow-hidden bg-gray-50">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        <div className="md:w-1/2 p-6 md:p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
                {product.name}
              </h2>
              
              <div className="flex items-center mt-2 mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl text-blue-800 font-bold mr-3">
                      {formatRwandanFrancs(convertToRwandanFrancs(product.discountPrice))}
                    </span>
                    <span className="text-gray-500 text-lg line-through">
                      {formatRwandanFrancs(convertToRwandanFrancs(product.price))}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl text-blue-800 font-bold">
                    {formatRwandanFrancs(convertToRwandanFrancs(product.price))}
                  </span>
                )}
              </div>
            </div>
            
            <Button
              variant={inWishlist ? "default" : "outline"}
              size="icon"
              className={inWishlist ? "text-white" : "text-gray-500"}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
            </Button>
          </div>
          
          <p className="text-gray-600 mt-2 mb-6 line-clamp-3">
            {product.description}
          </p>
          
          {properties.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Product Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {properties.map((prop, index) => (
                  <div key={index}>
                    <span className="text-gray-500 font-medium">{prop.name}: </span>
                    {renderPropertyValue(prop)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-5">
            <div className="flex items-center mb-2">
              {isInStock ? (
                <Badge variant="outline" className="text-success border-success">
                  In Stock
                </Badge>
              ) : isLowStock ? (
                <Badge variant="outline" className="text-warning border-warning">
                  Low Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-destructive border-destructive">
                  Out of Stock
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-r-none h-9 w-9"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="px-3 py-2 border-t border-b border-gray-300 text-center w-10">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-l-none h-9 w-9"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isCartLoading || !isInStock}
              >
                <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
              </Button>
            </div>
          </div>
          
          <Link href={`/product/${product.slug}`}>
            <Button variant="link" className="px-0 text-primary">
              View Full Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}