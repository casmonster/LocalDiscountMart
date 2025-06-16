# DiscountMart E-commerce Application

## Overview

DiscountMart is a full-stack e-commerce application built for a local store in Kigali, Rwanda. The application provides a modern shopping experience with features like product browsing, cart management, wishlist functionality, and order processing. The system is designed as a pickup-only store where customers can browse and order online, then collect their items at the physical location.

## System Architecture

The application follows a modern full-stack architecture with clear separation between client and server components:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context API for cart, wishlist, and recently viewed products
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API with JSON responses

## Key Components

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Categories**: Product categorization (id, name, slug, imageUrl)
- **Products**: Core product information (id, name, slug, description, imageUrl, price, discountPrice, categoryId, inStock, stockLevel, isNew)
- **Cart Items**: Shopping cart management (id, cartId, productId, quantity)
- **Orders**: Order processing (id, customerName, customerEmail, customerPhone, totalAmount, status, createdAt)
- **Order Items**: Individual items within orders

### Frontend Components
- **Product Management**: ProductCard, ProductDetail, CategoryCard
- **Shopping Features**: Cart drawer, wishlist management, recently viewed products
- **UI Components**: Complete shadcn/ui component library implementation
- **Context Providers**: CartContext, WishlistContext, RecentlyViewedContext
- **Pages**: Home, Category, ProductDetail, Checkout, OrderConfirmation, and various informational pages

### Backend Services
- **Storage Layer**: Abstract storage interface with database operations
- **API Routes**: RESTful endpoints for categories, products, cart, and orders
- **Database Connection**: Neon serverless PostgreSQL with connection pooling

## Data Flow

1. **Product Browsing**: Users browse categories and products fetched via React Query
2. **Cart Management**: Items are added to cart with UUID-based session management stored in localStorage
3. **Order Processing**: Checkout creates orders with customer information and cart items
4. **Data Persistence**: All data is stored in PostgreSQL with Drizzle ORM handling database operations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives for shadcn/ui components
- **wouter**: Lightweight client-side routing
- **zod**: Runtime type validation and schema definition

### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:
- **Development**: `npm run dev` runs both Vite dev server and Express server
- **Production Build**: `npm run build` creates optimized client bundle and server build
- **Production Server**: `npm run start` serves the built application
- **Database**: Uses Neon serverless PostgreSQL with environment-based connection string
- **Static Assets**: Client build output served by Express in production

The deployment configuration supports autoscaling and includes proper port management for the Replit environment.

## Changelog

```
Changelog:
- June 15, 2025. Initial setup
- June 15, 2025. Fixed TypeScript errors in ProductDetail.tsx and OrderStatus.tsx by adding proper type imports and explicit queryFn functions
- June 15, 2025. Created comprehensive customer service system with My Account, Order Status, FAQ, Help Center, and Newsletter pages
- June 15, 2025. Added complete legal pages: Privacy Policy, Terms of Service, and Sitemap with authentic content for Rwanda business
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```