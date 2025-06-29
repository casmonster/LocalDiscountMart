# 🚀 DiscountMart Deployment Guide

This guide provides step-by-step instructions for deploying DiscountMart to various platforms.

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL database (Neon, Supabase, or self-hosted)
- Git repository on GitHub
- Deployment platform account (Vercel, Netlify, Railway, etc.)

## 🔧 Environment Setup

### 1. Database Setup

#### Option A: Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Use the connection string as `DATABASE_URL`

#### Option B: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Use the connection string as `DATABASE_URL`

### 2. Environment Variables

Create a `.env` file with:
```bash
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=5000
```

## 🌐 Platform Deployment

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Push to GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/discountmart.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
   - Deploy

3. **Build Configuration**
   Vercel will automatically detect the build settings from `package.json`.

### Railway

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string

2. **Deploy**
   Railway will automatically build and deploy your application.

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Environment Variables**
   Add in Netlify dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string

### Render

1. **Create Web Service**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Start command: `npm run start`

2. **Environment Variables**
   - `DATABASE_URL`: Your PostgreSQL connection string

## 🐳 Docker Deployment

### Build and Run Locally
```bash
# Build image
docker build -t discountmart .

# Run container
docker run -p 5000:5000 -e DATABASE_URL=your_db_url discountmart
```

### Docker Compose
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=discountmart
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 📊 Database Migration

After deployment, run database migrations:
```bash
# Push schema to database
npm run db:push

# Or if using migrations
npm run db:migrate
```

## 🔐 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Database connection is secure (SSL enabled)
- [ ] No sensitive data in code repository
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (if applicable)

## 🎯 Post-Deployment Steps

1. **Test Core Features**
   - Browse products
   - Add items to cart
   - Place test order
   - Check admin dashboard

2. **Monitor Performance**
   - Check application logs
   - Monitor database queries
   - Test load times

3. **Setup Monitoring**
   - Configure error tracking
   - Set up uptime monitoring
   - Monitor database performance

## 🐛 Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check environment variables
echo $DATABASE_URL

# Test database connection
npm run db:push
```

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

#### Port Issues
```bash
# Check if port is available
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

## 📈 Performance Optimization

### Production Optimizations
1. Enable compression
2. Implement caching
3. Optimize database queries
4. Use CDN for static assets
5. Enable database connection pooling

### Monitoring
1. Set up application logging
2. Monitor database performance
3. Track user analytics
4. Set up error reporting

## 🔄 CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
1. Builds the application
2. Runs tests (when added)
3. Deploys to production
4. Builds Docker image

## 📞 Support

For deployment issues:
1. Check the logs in your deployment platform
2. Verify environment variables
3. Test database connectivity
4. Check the GitHub Issues page

## 🎉 Success!

Your DiscountMart application should now be live and accessible to users. The complete e-commerce functionality including cart management, order processing, and admin dashboard will be available.

**Next Steps:**
- Add custom domain
- Set up SSL certificate
- Configure email notifications
- Add analytics tracking
- Implement backup strategy