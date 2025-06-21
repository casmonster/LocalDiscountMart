import { db } from "./db";
import { 
  categories, 
  products, 
  orders, 
  orderItems,
  type InsertCategory,
  type InsertProduct,
  type InsertOrder,
  type InsertOrderItem
} from "@shared/schema";

export async function seedDatabase() {
  console.log("Seeding database with initial data...");

  // Clear existing data
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(products);
  await db.delete(categories);

  // Insert categories
  const categoryData: InsertCategory[] = [
    {
      name: "Clothing",
      slug: "clothing",
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Tableware",
      slug: "tableware",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Kitchen",
      slug: "kitchen",
      imageUrl: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Home Decor",
      slug: "home-decor",
      imageUrl: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const insertedCategories = await db.insert(categories).values(categoryData).returning();
  console.log(`Inserted ${insertedCategories.length} categories`);

  // Insert products
  const productData: InsertProduct[] = [
    // Clothing Category - 8 products
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
      isNew: false,
      setPieces: 1,
      unitType: "piece",
    },
    {
      name: "Cotton T-Shirt",
      slug: "cotton-t-shirt",
      description: "Soft cotton t-shirt available in multiple colors.",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      price: 19.99,
      discountPrice: null,
      categoryId: 1,
      inStock: true,
      stockLevel: "In Stock",
      isNew: true,
      setPieces: 1,
      unitType: "piece",
    },
    // Tableware Category - 6 products
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
      isNew: false,
      setPieces: 12,
      unitType: "set",
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
      isNew: true,
      setPieces: 6,
      unitType: "set",
    },
    // Kitchen Category - 8 products
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
      isNew: false,
      setPieces: 6,
      unitType: "set",
    },
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
      isNew: false,
      setPieces: 5,
      unitType: "set",
    },
    // Home Decor Category - 6 products
    {
      name: "Ceramic Vase Set",
      slug: "ceramic-vase-set",
      description: "Beautiful ceramic vase set for your home decor.",
      imageUrl: "https://images.pexels.com/photos/8989514/pexels-photo-8989514.jpeg?auto=compress&cs=tinysrgb&w=500",
      price: 34.99,
      discountPrice: null,
      categoryId: 4,
      inStock: true,
      stockLevel: "In Stock",
      isNew: true,
      setPieces: 3,
      unitType: "set",
    },
    {
      name: "Wall Art Canvas Set",
      slug: "wall-art-canvas-set",
      description: "Set of three modern canvas prints for wall decoration.",
      imageUrl: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=500",
      price: 79.99,
      discountPrice: 59.99,
      categoryId: 4,
      inStock: true,
      stockLevel: "In Stock",
      isNew: false,
      setPieces: 3,
      unitType: "set",
    },
  ];

  const insertedProducts = await db.insert(products).values(productData).returning();
  console.log(`Inserted ${insertedProducts.length} products`);

  // Insert sample order
  const orderData: InsertOrder = {
    customerName: "Income tax",
    customerEmail: "mugbetrinity@gmail.com",
    customerPhone: "250 80 152723",
    totalAmount: 35.3882,
    status: "pending"
  };

  const [insertedOrder] = await db.insert(orders).values(orderData).returning();
  console.log(`Inserted order with ID: ${insertedOrder.id}`);

  // Insert order item
  const orderItemData = {
    orderId: insertedOrder.id,
    productId: 1,
    quantity: 1,
    price: 29.99
  };

  await db.insert(orderItems).values([orderItemData]);
  console.log("Inserted order item");

  console.log("Database seeding completed successfully!");
}