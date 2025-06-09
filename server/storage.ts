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
      existingCartItem.quantity += (item.quantity || 1);
      this.cartItems.set(existingCartItem.id, existingCartItem);
      return existingCartItem;
    } else {
      // Add new item
      const id = this.currentCartItemId++;
      const newItem: CartItem = { ...item, id, quantity: item.quantity || 1 };
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
    const order: Order = { 
      ...insertOrder, 
      id: orderId, 
      createdAt: new Date(),
      status: insertOrder.status || 'pending'
    };
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
      { name: "Tableware", slug: "tableware", imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
      { name: "Kitchen", slug: "kitchen", imageUrl: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
      { name: "Home Decor", slug: "home-decor", imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    ];
    
    categories.forEach(category => {
      const id = this.currentCategoryId++;
      this.categories.set(id, { ...category, id });
    });
    
    // Products
    const products: InsertProduct[] = [
      // Clothing Category (ID: 1) - 8 products
      { 
        name: "Blue Linen Shirt", 
        slug: "blue-linen-shirt", 
        description: "Comfortable blue linen shirt perfect for summer days.", 
        imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 49.99, 
        discountPrice: 29.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Knit Sweater", 
        slug: "knit-sweater", 
        description: "Warm and cozy knit sweater for cold winter days.", 
        imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 50.99, 
        discountPrice: 35.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "Low Stock",
        isNew: false
      },
      { 
        name: "Wool Scarf", 
        slug: "wool-scarf", 
        description: "Soft wool scarf to keep you warm during the winter.", 
        imageUrl: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 19.99, 
        discountPrice: null, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Denim Jacket", 
        slug: "denim-jacket", 
        description: "Classic denim jacket for a timeless casual look.", 
        imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 79.99, 
        discountPrice: 59.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Cotton T-Shirt", 
        slug: "cotton-t-shirt", 
        description: "Premium cotton t-shirt for everyday comfort.", 
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 24.99, 
        discountPrice: null, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Leather Belt", 
        slug: "leather-belt", 
        description: "Genuine leather belt with classic buckle design.", 
        imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 39.99, 
        discountPrice: 29.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Casual Pants", 
        slug: "casual-pants", 
        description: "Comfortable casual pants for relaxed style.", 
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 64.99, 
        discountPrice: 49.99, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Winter Coat", 
        slug: "winter-coat", 
        description: "Warm winter coat for cold weather protection.", 
        imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 129.99, 
        discountPrice: null, 
        categoryId: 1, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },

      // Tableware Category (ID: 2) - 6 products
      { 
        name: "Ceramic Dinner Set", 
        slug: "ceramic-dinner-set", 
        description: "Elegant ceramic dinner set for a family of four.", 
        imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 59.99, 
        discountPrice: 44.99, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Crystal Glass Set", 
        slug: "crystal-glass-set", 
        description: "Elegant crystal glass set for your special occasions.", 
        imageUrl: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 29.99, 
        discountPrice: null, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Porcelain Tea Set", 
        slug: "porcelain-tea-set", 
        description: "Fine porcelain tea set with elegant floral design.", 
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 79.99, 
        discountPrice: 59.99, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Stainless Steel Cutlery Set", 
        slug: "stainless-steel-cutlery", 
        description: "Professional-grade stainless steel cutlery set.", 
        imageUrl: "https://images.pexels.com/photos/175765/pexels-photo-175765.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 89.99, 
        discountPrice: 69.99, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Bamboo Serving Tray", 
        slug: "bamboo-serving-tray", 
        description: "Eco-friendly bamboo serving tray for entertaining.", 
        imageUrl: "https://images.unsplash.com/photo-1584473457406-6240486418e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 34.99, 
        discountPrice: null, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Wine Glass Collection", 
        slug: "wine-glass-collection", 
        description: "Professional wine glass collection for connoisseurs.", 
        imageUrl: "https://images.pexels.com/photos/12268571/pexels-photo-12268571.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 54.99, 
        discountPrice: 39.99, 
        categoryId: 2, 
        inStock: true,
        stockLevel: "Low Stock",
        isNew: false
      },

      // Kitchen Category (ID: 3) - 7 products
      { 
        name: "Premium Cooking Pot Set", 
        slug: "premium-cooking-pot-set", 
        description: "High-quality stainless steel cooking pot set for all your kitchen needs.", 
        imageUrl: "https://images.pexels.com/photos/932267/pexels-photo-932267.jpeg?auto=compress&cs=tinysrgb&w=500", 
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
        imageUrl: "https://images.pexels.com/photos/6270663/pexels-photo-6270663.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 49.99, 
        discountPrice: 34.99, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "Low Stock",
        isNew: false
      },
      { 
        name: "Non-Stick Pan Set", 
        slug: "non-stick-pan-set", 
        description: "Professional non-stick pan set for perfect cooking.", 
        imageUrl: "https://images.pexels.com/photos/7719169/pexels-photo-7719169.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 119.99, 
        discountPrice: 89.99, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Kitchen Knife Set", 
        slug: "kitchen-knife-set", 
        description: "Professional chef knife set with wooden block.", 
        imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 149.99, 
        discountPrice: null, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Wooden Cutting Board", 
        slug: "wooden-cutting-board", 
        description: "Large bamboo cutting board with groove design.", 
        imageUrl: "https://images.pexels.com/photos/32445973/pexels-photo-32445973.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 29.99, 
        discountPrice: 19.99, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Electric Coffee Maker", 
        slug: "electric-coffee-maker", 
        description: "Programmable coffee maker for perfect morning brew.", 
        imageUrl: "https://images.pexels.com/photos/30689451/pexels-photo-30689451.jpeg?auto=compress&cs=tinysrgb&w=500", 
        price: 179.99, 
        discountPrice: null, 
        categoryId: 3, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },

      // Home Decor Category (ID: 4) - 7 products
      { 
        name: "Modern Lamp", 
        slug: "modern-lamp", 
        description: "Stylish modern lamp to light up your living space.", 
        imageUrl: "https://images.pexels.com/photos/6970077/pexels-photo-6970077.jpeg?auto=compress&cs=tinysrgb&w=500", 
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
        name: "Wall Art Canvas Set", 
        slug: "wall-art-canvas-set", 
        description: "Modern abstract wall art canvas set of three pieces.", 
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 89.99, 
        discountPrice: 69.99, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Decorative Mirror", 
        slug: "decorative-mirror", 
        description: "Round decorative mirror with golden frame.", 
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 79.99, 
        discountPrice: 59.99, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: false
      },
      { 
        name: "Scented Candle Set", 
        slug: "scented-candle-set", 
        description: "Luxury scented candle set with relaxing fragrances.", 
        imageUrl: "https://images.unsplash.com/photo-1602881915976-8ad28ed8e75e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 44.99, 
        discountPrice: null, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      },
      { 
        name: "Indoor Plant Collection", 
        slug: "indoor-plant-collection", 
        description: "Set of three low-maintenance indoor plants with pots.", 
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
        price: 54.99, 
        discountPrice: null, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      }
    ];
    
    products.forEach(productData => {
      const id = this.currentProductId++;
      const product: Product = { 
        ...productData, 
        id,
        discountPrice: productData.discountPrice ?? null,
        inStock: productData.inStock ?? true,
        stockLevel: productData.stockLevel ?? "In Stock",
        isNew: productData.isNew ?? false
      };
      this.products.set(id, product);
    });
  }
}

export const storage = new MemStorage();
