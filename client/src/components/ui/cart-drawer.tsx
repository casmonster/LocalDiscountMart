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
import { Trash2, Plus, Minus, X } from "lucide-react";

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
    return amount.toFixed(2);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <SheetTitle>Your Cart ({itemCount})</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">
                Add some items to your cart to see them here.
              </p>
              <Button onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading cart items...</p>
                </div>
              ) : (
                <div className="space-y-4">
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

            <div className="p-4 border-t border-gray-200">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold">${formatCurrency(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span className="font-bold">${formatCurrency(getTaxAmount())}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold">${formatCurrency(getFinalTotal())}</span>
                </div>

                <Button
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={handleContinueShopping}
                  disabled={isLoading}
                >
                  Continue Shopping
                </Button>
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

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="ml-4 flex-grow">
        <h3 className="font-medium">{item.product.name}</h3>
        <p className="text-secondary font-bold">${price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-2">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        disabled={isUpdating}
        className="text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
