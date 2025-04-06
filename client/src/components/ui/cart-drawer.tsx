import { useCart, CartItemWithProduct } from "@/context/CartContext";
import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, X, ShoppingCart, AlertCircle } from "lucide-react";
import { convertToRwandanFrancs, formatRwandanFrancs } from "@/lib/currency";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [, navigate] = useLocation();
  const { 
    cartItems, 
    isLoading, 
    removeItem, 
    updateQuantity,
    getCartTotal,
    getTaxAmount,
    getFinalTotal,
    itemCount
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    onClose();
  };

  const formatCurrency = (amount: number) => {
    return formatRwandanFrancs(convertToRwandanFrancs(amount));
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0 border-l shadow-xl">
        <SheetHeader className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center text-xl">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              Your Cart 
              {itemCount > 0 && (
                <span className="ml-2 bg-primary/10 text-primary text-sm px-2 py-0.5 rounded-full">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="text-center max-w-xs">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Look like you haven't added any items to your cart yet.
              </p>
              <Button 
                onClick={handleContinueShopping}
                className="rounded-full px-6"
              >
                Start Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col gap-4 justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-gray-500">Loading your cart...</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onRemove={removeItem}
                      onUpdateQuantity={updateQuantity}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50/80">
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium">{formatCurrency(getTaxAmount())}</span>
                </div>
                <Separator className="my-2 bg-gray-200" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-primary">{formatCurrency(getFinalTotal())}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full rounded-full font-medium py-6 shadow-sm flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 transition-colors"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  <span>Proceed to Checkout</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-gray-300 hover:bg-gray-50 text-gray-700 transition-colors"
                  onClick={handleContinueShopping}
                  disabled={isLoading}
                >
                  Continue Shopping
                </Button>
              </div>
              
              <div className="mt-4 bg-primary/5 p-3 rounded-lg flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-600">
                  Items will be available for pickup at our store location. You'll receive an email when your order is ready.
                </p>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

type CartItemProps = {
  item: CartItemWithProduct;
  onRemove: (id: number) => Promise<void>;
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>;
};

function CartItem({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await onRemove(item.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === item.quantity) return;
    setIsUpdating(true);
    try {
      await onUpdateQuantity(item.id, newQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const price = item.product.discountPrice || item.product.price;
  const subtotal = price * item.quantity;
  const hasDiscount = item.product.discountPrice !== null;

  return (
    <div className={`relative bg-white rounded-lg p-3 shadow-sm hover:shadow transition-all ${isUpdating ? 'opacity-70' : ''}`}>
      <div className="flex items-center gap-3">
        <div className="relative rounded-md overflow-hidden">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-md"
          />
          {hasDiscount && (
            <div className="absolute top-0 left-0 bg-secondary text-white text-xs font-bold px-1.5 py-0.5 rounded-br-md">
              SALE
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800 pr-6">{item.product.name}</h3>
          
          {/* Price display */}
          <div className="flex items-center mt-1">
            {hasDiscount ? (
              <>
                <span className="text-secondary font-bold">{formatRwandanFrancs(convertToRwandanFrancs(price))}</span>
                <span className="text-gray-400 text-xs line-through ml-2">{formatRwandanFrancs(convertToRwandanFrancs(item.product.price))}</span>
              </>
            ) : (
              <span className="font-bold">{formatRwandanFrancs(convertToRwandanFrancs(price))}</span>
            )}
          </div>
          
          {/* Status indicator */}
          {item.product.stockLevel === "Low Stock" && (
            <span className="text-xs text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full inline-flex items-center mt-1">
              <AlertCircle className="h-3 w-3 mr-1" /> Low Stock
            </span>
          )}
          
          {/* Quantity controls */}
          <div className="flex items-center mt-2">
            <div className="flex items-center border border-gray-200 rounded-full p-0.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-gray-100"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
              >
                <Minus className="h-3 w-3 text-gray-600" />
              </Button>
              <span className="mx-2 text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-gray-100"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
              >
                <Plus className="h-3 w-3 text-gray-600" />
              </Button>
            </div>
            
            <div className="ml-auto text-right">
              <p className="text-xs text-gray-500">Subtotal</p>
              <p className="font-bold text-primary">{formatRwandanFrancs(convertToRwandanFrancs(subtotal))}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Remove button - positioned absolute so it doesn't disrupt layout */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        disabled={isUpdating}
        className="absolute top-2 right-2 h-6 w-6 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      {/* Loading overlay */}
      {isUpdating && (
        <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
}
