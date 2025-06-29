# DiscountMart - E-commerce Application

![DiscountMart Logo](./generated-icon.png)

## 🌟 Live Demo

**[Visit Live Demo →](https://your-username.github.io/discountmart)**

A modern e-commerce application built for a local discount store in Kigali, Rwanda. Features a complete shopping experience with product browsing, cart management, order processing, and admin dashboard.

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog**: Browse products by categories (Electronics, Clothing, Home & Garden, Sports, Books)
- **Set-Based Pricing**: Products sold in sets with automatic quantity calculations
- **Shopping Cart**: Add, remove, and update quantities with real-time total calculations
- **Currency Display**: Prices displayed in Rwandan Francs (RWF) with automatic USD conversion
- **Order Tracking**: Track order status from pending to delivered
- **Wishlist**: Save favorite products for later
- **Recently Viewed**: Keep track of browsed products
- **Search**: Find products quickly with search functionality
- **Newsletter**: Subscribe to updates and promotions

### 👨‍💼 Admin Features
- **Order Management**: View and update order statuses
- **Newsletter Management**: View subscriber list and analytics
- **Inventory Tracking**: Monitor stock levels and product information
- **Status Updates**: Change orders from pending → processing → shipped → delivered

### 🏪 Store Information
- **Pickup Only**: Items must be collected at the physical store location
- **Location**: Kigali, Rwanda
- **Payment**: Cash on pickup
- **Tax Rate**: 18% (Rwanda standard rate)

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Tailwind CSS** + **shadcn/ui** for styling
- **React Context** for cart, wishlist, and recently viewed state
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **PostgreSQL** with Drizzle ORM
- **Neon** serverless database
- **RESTful API** design

### Database Schema
- Categories, Products, Cart Items, Orders, Order Items, Newsletter subscriptions
- Full relational design with proper foreign key constraints
- Optimized for e-commerce operations

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (or Neon account)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/discountmart.git
   cd discountmart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   DATABASE_URL=your_postgresql_connection_string
   ```

4. **Push database schema**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   ```
   http://localhost:5000
   ```

## 📱 Usage Guide

### For Customers
1. Browse products by category or use search
2. Click on products to view details
3. Add items to cart (note: sold in sets)
4. Proceed to checkout and enter contact information
5. Complete order (pickup required at store)
6. Track order status using provided order number

### For Store Administrators
1. Navigate to `/admin/orders/manage`
2. View all orders and their current status
3. Update order statuses as items are processed
4. View newsletter subscribers in the second tab
5. Monitor inventory and customer activity

## 🏗️ Architecture

### Project Structure
```
discountmart/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Data access layer
│   ├── routes.ts         # API endpoints
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle database schema
└── package.json
```

### API Endpoints
- `GET /api/categories` - List all categories
- `GET /api/products` - List all products
- `GET /api/products/featured` - Featured products
- `GET /api/cart/:cartId` - Get cart items
- `POST /api/cart` - Add item to cart
- `POST /api/orders` - Create new order
- `GET /api/admin/orders` - Admin: List all orders
- `PATCH /api/orders/:id/status` - Admin: Update order status

## 🎨 Design System

### Colors
- Primary: Blue (#3B82F6)
- Secondary: Gray (#6B7280)
- Success: Green (#10B981)
- Error: Red (#EF4444)
- Warning: Yellow (#F59E0B)

### Currency
- All prices displayed in Rwandan Francs (RWF)
- Automatic conversion from USD base prices
- Exchange rate: 1 USD = 1,200 RWF (approximate)
- Tax rate: 18% added at checkout

## 🔧 Configuration

### Environment Variables
```bash
DATABASE_URL=postgresql://user:pass@host:port/db
PGDATABASE=database_name
PGHOST=localhost
PGPASSWORD=password
PGPORT=5432
PGUSER=username
```

### Database Configuration
The application uses Drizzle ORM with PostgreSQL. Schema is defined in `shared/schema.ts` and migrations are handled automatically with `npm run db:push`.

## 📊 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Query Caching**: TanStack Query caches API responses
- **Image Optimization**: Responsive images with proper sizing
- **Database Indexing**: Optimized queries with proper indexes
- **Connection Pooling**: Efficient database connection management

## 🔐 Security Features

- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection Protection**: Parameterized queries via Drizzle ORM
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Data Sanitization**: All user inputs properly sanitized

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
# Build container
docker build -t discountmart .

# Run container
docker run -p 5000:5000 -e DATABASE_URL=your_db_url discountmart
```

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email admin@discountmart.rw or visit our store in Kigali, Rwanda.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for the Rwanda market
- Supports local business growth
- Community-driven development

---

**Made with ❤️ for local businesses in Rwanda**