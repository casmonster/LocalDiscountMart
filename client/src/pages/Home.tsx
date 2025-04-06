import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ProductCard from "@/components/product/ProductCard";
import CategoryCard from "@/components/product/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: featuredProducts, isLoading: featuredLoading } = useQuery({
    queryKey: ["/api/products/featured"],
  });

  const { data: newProducts, isLoading: newProductsLoading } = useQuery({
    queryKey: ["/api/products/new"],
  });

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/90 to-primary text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Quality Products at Amazing Discounts</h1>
            <p className="text-lg mb-6">Shop our wide selection and pick up your order at our local store!</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#featured">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Shop Now
                </Button>
              </Link>
              <Link href="/store-info">
                <Button variant="outline" size="lg" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                  Find Our Store
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Shop by Category</h2>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-square">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories?.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  imageUrl={category.imageUrl}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Hot Deals This Week</h2>
            <Link href="/clearance" className="text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          
          {featuredLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[4/3]">
                  <Skeleton className="w-full h-full rounded-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-8 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  stockLevel={product.stockLevel}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Promo Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Join Our Discount Club</h2>
              <p className="text-gray-700 mb-4">
                Sign up for our newsletter to get exclusive deals, early access to sales, and special member-only discounts.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90">
                  Subscribe
                </Button>
              </form>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                alt="Happy shoppers with discount tags"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link href="/new-arrivals" className="text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          
          {newProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="aspect-[4/3]">
                  <Skeleton className="w-full h-full rounded-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-8 w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  stockLevel={product.stockLevel}
                  isNew={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Store Info */}
      <section id="store-info" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Store</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-md h-full">
                <div className="bg-gray-200 w-full aspect-[4/3] flex items-center justify-center">
                  <div className="text-center p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-lg font-medium">Visit us at our location</p>
                    <p className="text-gray-600">123 Main Street, Anytown, ST 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-gray-50 rounded-lg p-6 h-full">
                <h3 className="text-xl font-bold mb-4">Visit Our Store</h3>
                <div className="mb-6">
                  <p className="flex items-start mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>123 Main Street, Anytown, ST 12345</span>
                  </p>
                  <p className="flex items-start mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(555) 123-4567</span>
                  </p>
                  <p className="flex items-start mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@discountmart.com</span>
                  </p>
                </div>
                
                <h4 className="font-bold mb-2">Store Hours:</h4>
                <ul className="mb-6">
                  <li className="flex justify-between mb-1">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between mb-1">
                    <span>Saturday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </li>
                </ul>
                
                <h4 className="font-bold mb-2">Pickup Information:</h4>
                <p className="text-gray-700 mb-4">
                  Orders are typically ready for pickup within 24 hours. You'll receive an email notification when your order is ready.
                </p>
                
                <Button className="inline-block bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 transition">
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
