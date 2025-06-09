import { db } from "./db";
import { 
  categories, 
  products, 
  cartItems, 
  orders, 
  orderItems,
  type Category,
  type Product,
  type CartItem,
  type Order,
  type OrderItem,
  type InsertCategory,
  type InsertProduct,
  type InsertCartItem,
  type InsertOrder,
  type InsertOrderItem
} from "@shared/schema";
import { eq, like, desc, asc } from "drizzle-orm";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  constructor() {
    this.initSampleData();
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db.select().from(products).where(like(products.name, `%${query}%`));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    // Return products with discounts as featured
    return await db.select().from(products).where(eq(products.inStock, true)).limit(8);
  }

  async getNewProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isNew, true));
  }

  // Cart
  async getCartItems(cartId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select({
        id: cartItems.id,
        cartId: cartItems.cartId,
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        product: products
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.cartId, cartId));

    return items.map(item => ({
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product
    }));
  }

  async addCartItem(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existingItem] = await db
      .select()
      .from(cartItems)
      .where(
        eq(cartItems.cartId, item.cartId)
      )
      .where(eq(cartItems.productId, item.productId));

    if (existingItem) {
      // Update quantity
      const [updatedItem] = await db
        .update(cartItems)
        .set({ quantity: existingItem.quantity + (item.quantity || 1) })
        .where(eq(cartItems.id, existingItem.id))
        .returning();
      return updatedItem;
    } else {
      // Add new item
      const [newItem] = await db
        .insert(cartItems)
        .values({ ...item, quantity: item.quantity || 1 })
        .returning();
      return newItem;
    }
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const [updatedItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updatedItem || undefined;
  }

  async removeCartItem(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(cartId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.cartId, cartId));
  }

  // Orders
  async createOrder(insertOrder: InsertOrder, insertItems: InsertOrderItem[]): Promise<Order> {
    const [order] = await db
      .insert(orders)
      .values({ ...insertOrder, status: insertOrder.status || 'pending' })
      .returning();

    // Add order items
    for (const item of insertItems) {
      await db.insert(orderItems).values({ ...item, orderId: order.id });
    }

    return order;
  }

  async getOrder(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    if (!order) return undefined;

    const items = await db
      .select({
        id: orderItems.id,
        orderId: orderItems.orderId,
        productId: orderItems.productId,
        quantity: orderItems.quantity,
        price: orderItems.price,
        product: products
      })
      .from(orderItems)
      .innerJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    return {
      ...order,
      items: items.map(item => ({
        id: item.id,
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        product: item.product
      }))
    };
  }

  private async initSampleData() {
    // Check if data already exists
    const existingCategories = await db.select().from(categories).limit(1);
    if (existingCategories.length > 0) {
      return; // Data already exists
    }

    // Insert categories
    const sampleCategories: InsertCategory[] = [
      { name: "Clothing", slug: "clothing", imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Tableware", slug: "tableware", imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
      { name: "Kitchen", slug: "kitchen", imageUrl: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
      { name: "Home Decor", slug: "home-decor", imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    ];

    await db.insert(categories).values(sampleCategories);

    // Insert products
    const sampleProducts: InsertProduct[] = [
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
        imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=500", 
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
        imageUrl: "https://images.unsplash.com/photo-1586370434639-0fe43b2d32d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1556909196-f5f0efbca59c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.pexels.com/photos/4226804/pexels-photo-4226804.jpeg?auto=compress&cs=tinysrgb&w=500", 
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
        imageUrl: "https://images.unsplash.com/photo-1507878866276-a947ef722fee?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1602881915976-8ad28ed8e75e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
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
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", 
        price: 54.99, 
        discountPrice: null, 
        categoryId: 4, 
        inStock: true,
        stockLevel: "In Stock",
        isNew: true
      }
    ];

    await db.insert(products).values(sampleProducts);
  }
}