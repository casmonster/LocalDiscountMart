import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { v4 as uuidv4 } from 'uuid';

export type CartItemWithProduct = {
  id: number;
  cartId: string;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    discountPrice: number | null;
    imageUrl: string;
    stockLevel: string;
    setPieces: number;
    unitType: string;
  };
};

type CartContextType = {
  cartItems: CartItemWithProduct[];
  cartId: string;
  isLoading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getTaxAmount: () => number;
  getFinalTotal: () => number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize cart ID from localStorage or create a new one
  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
    } else {
      const newCartId = uuidv4();
      localStorage.setItem("cartId", newCartId);
      setCartId(newCartId);
    }
  }, []);

  // Fetch cart items when cartId is available
  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

  const fetchCartItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/${cartId}`);
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: number, quantity = 1) => {
    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/cart", { 
        cartId, 
        productId, 
        quantity 
      });
      
      await fetchCartItems();
      
      toast({
        title: "Added to cart",
        description: "Item successfully added to your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }
    
    setIsLoading(true);
    try {
      await apiRequest("PUT", `/api/cart/${itemId}`, { quantity });
      await fetchCartItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    setIsLoading(true);
    try {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
      await fetchCartItems();
      
      toast({
        title: "Removed from cart",
        description: "Item successfully removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      await apiRequest("DELETE", `/api/cart/clear/${cartId}`);
      setCartItems([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discountPrice || item.product.price;
      const setPieces = item.product.setPieces || 1;
      return total + (price * setPieces * item.quantity);
    }, 0);
  };

  const getTaxAmount = () => {
    return getCartTotal() * 0.18; // 18% tax rate for Rwanda
  };

  const getFinalTotal = () => {
    return getCartTotal() + getTaxAmount();
  };

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        getTaxAmount,
        getFinalTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
