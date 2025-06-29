# 🎭 DiscountMart Live Demo Setup

## 🌟 Demo Overview

This document provides instructions for setting up and deploying a live demo of the DiscountMart e-commerce application.

## 🚀 Quick Demo Deployment

### Step 1: Repository Setup
```bash
# Clone or fork the repository
git clone https://github.com/yourusername/discountmart.git
cd discountmart

# Install dependencies
npm install
```

### Step 2: Database Setup (Demo)
For demo purposes, you can use a free PostgreSQL database:

#### Option 1: Neon (Free Tier)
1. Visit [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project: "discountmart-demo"
4. Copy connection string
5. Set as DATABASE_URL environment variable

#### Option 2: Supabase (Free Tier)
1. Visit [supabase.com](https://supabase.com)
2. Create new project: "discountmart-demo"
3. Go to Settings → Database
4. Copy connection string
5. Set as DATABASE_URL environment variable

### Step 3: Environment Configuration
```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your database URL
DATABASE_URL=your_postgresql_connection_string_here
NODE_ENV=production
PORT=5000
```

### Step 4: Database Migration
```bash
# Push database schema
npm run db:push

# This will create all necessary tables:
# - categories, products, cart_items, orders, order_items, newsletters
```

### Step 5: Local Demo
```bash
# Start the application
npm run dev

# Application will be available at:
# http://localhost:5000
```

## 🌐 Live Demo Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project or create new
# - Set environment variables when prompted
# - Deploy
```

### Option 2: Railway
1. Connect GitHub repository to Railway
2. Add DATABASE_URL environment variable
3. Deploy automatically

### Option 3: Render
1. Connect GitHub repository to Render
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Add DATABASE_URL environment variable
5. Deploy

## 📱 Demo Features to Showcase

### Customer Experience
1. **Browse Products**
   - Visit homepage to see featured products
   - Navigate through categories (Electronics, Clothing, etc.)
   - Use search functionality

2. **Shopping Cart**
   - Add items to cart (note set-based pricing)
   - View cart with RWF currency conversion
   - Update quantities
   - Remove items

3. **Checkout Process**
   - Enter customer information
   - Review order with 18% tax
   - Complete order (generates order ID)

4. **Order Tracking**
   - Use order ID to track status
   - View order details and items

5. **Additional Features**
   - Add items to wishlist
   - View recently browsed products
   - Subscribe to newsletter

### Admin Experience
1. **Order Management**
   - Visit `/admin/orders/manage`
   - View all orders
   - Update order statuses (pending → processing → shipped → delivered)

2. **Newsletter Management**
   - View subscriber list
   - Monitor subscription growth

## 🎯 Demo Data

The application includes sample data for demonstration:

### Products (30+ items)
- Electronics: Wireless Headphones, Bluetooth Speaker, etc.
- Clothing: Blue Linen Shirt, Cotton T-Shirt, etc.
- Home & Garden: Ceramic Plate Set, Coffee Maker, etc.
- Sports: Yoga Mat, Dumbbells, etc.
- Books: Various titles

### Categories
- Electronics
- Clothing  
- Home & Garden
- Sports
- Books

### Sample Orders
- Order #1 with multiple items
- Various order statuses for demonstration

## 🎨 Demo Customization

### Branding
Update `theme.json` for custom colors:
```json
{
  "primary": "#3B82F6",
  "variant": "professional",
  "appearance": "light",
  "radius": 0.5
}
```

### Logo
Replace `generated-icon.png` with your logo

### Store Information
Update store details in components for your location

## 📊 Performance Metrics

The demo showcases:
- **Fast Loading**: < 2 seconds initial load
- **Responsive Design**: Works on mobile, tablet, desktop
- **Real-time Updates**: Cart and order status updates
- **Database Performance**: Optimized queries with indexing

## 🔧 Demo Maintenance

### Regular Tasks
1. Monitor database usage (stay within free tier limits)
2. Check application logs for errors
3. Test core functionality weekly
4. Update sample data as needed

### Scaling Considerations
- Database connection limits
- Storage usage
- Bandwidth limits
- Concurrent user limits

## 🎉 Demo Success Metrics

### Key Features Working
- [ ] Product browsing and search
- [ ] Cart functionality with RWF pricing
- [ ] Order placement and tracking  
- [ ] Admin dashboard operations
- [ ] Newsletter subscriptions
- [ ] Responsive design on all devices

### Performance Targets
- [ ] Page load time < 3 seconds
- [ ] Database queries < 100ms
- [ ] No console errors
- [ ] Mobile-friendly interface

## 🔗 Demo URLs

After deployment, your demo will be available at:
- **Vercel**: `https://discountmart-demo.vercel.app`
- **Railway**: `https://discountmart-demo.railway.app`
- **Render**: `https://discountmart-demo.onrender.com`

### Demo Pages to Test
- `/` - Homepage with featured products
- `/categories/electronics` - Category browsing
- `/products/wireless-headphones` - Product details
- `/checkout` - Shopping cart and checkout
- `/order-status` - Order tracking
- `/admin/orders/manage` - Admin dashboard

## 📞 Demo Support

For demo-related issues:
1. Check deployment platform logs
2. Verify database connectivity
3. Test in different browsers
4. Check mobile responsiveness

## 🎯 Next Steps

After successful demo deployment:
1. Share demo URL with stakeholders
2. Gather user feedback
3. Monitor usage analytics
4. Plan production deployment
5. Implement additional features based on feedback

---

**Live Demo Status: Ready for Deployment** ✅