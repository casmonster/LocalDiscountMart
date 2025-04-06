import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for a single product in the recently viewed list
type RecentlyViewedProduct = {
  id: number;
  slug: string;
  name: string;
  imageUrl: string;
  price: number;
  discountPrice: number | null;
  stockLevel: string;
  categoryId: number;
};

// Define the context type
type RecentlyViewedContextType = {
  recentlyViewed: RecentlyViewedProduct[];
  addToRecentlyViewed: (product: RecentlyViewedProduct) => void;
  clearRecentlyViewed: () => void;
  lastViewedProduct: RecentlyViewedProduct | null;
};

// Create context with default values
const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  recentlyViewed: [],
  addToRecentlyViewed: () => {},
  clearRecentlyViewed: () => {},
  lastViewedProduct: null,
});

// Storage key for saving in localStorage
const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 8;

export const RecentlyViewedProvider = ({ children }: { children: ReactNode }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);
  
  // Load saved items from localStorage on initial render
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        setRecentlyViewed(JSON.parse(savedItems));
      }
    } catch (error) {
      console.error("Error loading recently viewed products:", error);
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error("Error saving recently viewed products:", error);
    }
  }, [recentlyViewed]);

  // Add a product to recently viewed list
  const addToRecentlyViewed = (product: RecentlyViewedProduct) => {
    setRecentlyViewed(prev => {
      // Remove the product if it already exists (to avoid duplicates)
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add the new product at the beginning and limit to MAX_ITEMS
      return [product, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  // Clear all recently viewed products
  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  // Get the most recently viewed product (the first in the array)
  const lastViewedProduct = recentlyViewed.length > 0 ? recentlyViewed[0] : null;

  // Provide context to children
  return (
    <RecentlyViewedContext.Provider 
      value={{ 
        recentlyViewed, 
        addToRecentlyViewed, 
        clearRecentlyViewed,
        lastViewedProduct
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

// Custom hook for using the context
export const useRecentlyViewed = () => useContext(RecentlyViewedContext);