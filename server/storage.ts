import {
  categories, Category, InsertCategory,
  products, Product, InsertProduct,
  cartItems, CartItem, InsertCartItem,
  orders, Order, InsertOrder,
  orderItems, OrderItem, InsertOrderItem
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  
  // Cart
  getCartItems(cartId: string): Promise<(CartItem & { product: Product })[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<void>;
  clearCart(cartId: string): Promise<void>;
  
  // Orders
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrder(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug
    );
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId
    );
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (product) => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.discountPrice !== null
    ).slice(0, 8);
  }

  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew
    ).slice(0, 8);
  }

  // Cart
  async getCartItems(cartId: string): Promise<(CartItem & { product: Product })[]> {
    const cartItems = Array.from(this.cartItems.values()).filter(
      (item) => item.cartId === cartId
    );
    
    return cartItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      return { ...item, product };
    });
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    // Check if product exists
    const product = this.products.get(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }
    
    // Check if item already exists in cart
    const existingCartItem = Array.from(this.cartItems.values()).find(
      (cartItem) => cartItem.cartId === item.cartId && cartItem.productId === item.productId
    );
    
    if (existingCartItem) {
      // Update quantity
      existingCartItem.quantity += item.quantity;
      this.cartItems.set(existingCartItem.id, existingCartItem);
      return existingCartItem;
    } else {
      // Add new item
      const id = this.currentCartItemId++;
      const newItem: CartItem = { ...item, id };
      this.cartItems.set(id, newItem);
      return newItem;
    }
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) {
      return undefined;
    }
    
    cartItem.quantity = quantity;
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async removeCartItem(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(cartId: string): Promise<void> {
    const cartItemIds = Array.from(this.cartItems.values())
      .filter(item => item.cartId === cartId)
      .map(item => item.id);
      
    cartItemIds.forEach(id => this.cartItems.delete(id));
  }

  // Orders
  async createOrder(insertOrder: InsertOrder, insertItems: InsertOrderItem[]): Promise<Order> {
    const orderId = this.currentOrderId++;
    const order: Order = { ...insertOrder, id: orderId, createdAt: new Date() };
    this.orders.set(orderId, order);
    
    // Add order items
    insertItems.forEach(item => {
      const orderItemId = this.currentOrderItemId++;
      const orderItem: OrderItem = { ...item, id: orderItemId, orderId };
      this.orderItems.set(orderItemId, orderItem);
    });
    
    return order;
  }

  async getOrder(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const order = this.orders.get(id);
    if (!order) {
      return undefined;
    }
    
    const orderItems = Array.from(this.orderItems.values())
      .filter(item => item.orderId === id)
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return { ...item, product };
      });
    
    return { ...order, items: orderItems };
  }

  // Initialize sample data
  private initSampleData() {
    // Categories
    const categories: InsertCategory[] = [
      { name: "Clothing", slug: "clothing", imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Tableware", slug: "tableware", imageUrl: "https://images.unsplash.com/photo-1556909114-44e3e9699a2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Kitchen", slug: "kitchen", imageUrl: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Home Decor", slug: "home-decor", imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    ];
    
    categories.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id });
    });
    
    // Products
    const products: InsertProduct[] = [
      { 
        name: "Blue Linen Shirt", 
        slug: "blue-linen-shirt", 
        description: "Comfortable blue linen shirt perfect for summer days.", 
        imageUrl: "https://images.unsplash.com/photo-1519027356316-9f99e11d8bac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 49.99, 
        discountPrice: 29.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Ceramic Dinner Set", 
        slug: "ceramic-dinner-set", 
        description: "Elegant ceramic dinner set for a family of four.", 
        imageUrl: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 59.99, 
        discountPrice: 44.99, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Knit Sweater", 
        slug: "knit-sweater", 
        description: "Warm and cozy knit sweater for cold winter days.", 
        imageUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 50.99, 
        discountPrice: 35.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "Low Stock",
        isNew: false
      },
      { 
        name: "Modern Lamp", 
        slug: "modern-lamp", 
        description: "Stylish modern lamp to light up your living space.", 
        imageUrl: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 49.99, 
        discountPrice: 24.99, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Ceramic Vase Set", 
        slug: "ceramic-vase-set", 
        description: "Beautiful ceramic vase set for your home decor.", 
        imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 34.99, 
        discountPrice: null, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Wool Scarf", 
        slug: "wool-scarf", 
        description: "Soft wool scarf to keep you warm during the winter.", 
        imageUrl: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 19.99, 
        discountPrice: null, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Crystal Glass Set", 
        slug: "crystal-glass-set", 
        description: "Elegant crystal glass set for your special occasions.", 
        imageUrl: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 29.99, 
        discountPrice: null, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Cotton Throw Blanket", 
        slug: "cotton-throw-blanket", 
        description: "Soft cotton throw blanket for your cozy evenings.", 
        imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 24.99, 
        discountPrice: null, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Premium Cooking Pot Set", 
        slug: "premium-cooking-pot-set", 
        description: "High-quality stainless steel cooking pot set for all your kitchen needs.", 
        imageUrl: "https://images.unsplash.com/photo-1575482220071-ce26eb650c9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 89.99, 
        discountPrice: 69.99, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Glass Drinkware Collection", 
        slug: "glass-drinkware-collection", 
        description: "Elegant set of drinking glasses including water, wine, and cocktail glasses.", 
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 39.99, 
        discountPrice: null, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Ceramic Plate Set", 
        slug: "ceramic-plate-set", 
        description: "Beautiful ceramic plates for everyday use or special occasions.", 
        imageUrl: "https://images.unsplash.com/photo-1578048421563-9aafda1a2b33?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 49.99, 
        discountPrice: 34.99, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "Low Stock",
        isNew: false
      }
    ];
    
    products.forEach(product => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id });
    });
  }
}

export const storage = new MemStorage();
