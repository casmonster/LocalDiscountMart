import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ProductCard from "@/components/product/ProductCard";
import FeaturedProductShowcase from "@/components/product/FeaturedProductShowcase";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Helper function to get category-specific properties
function getCategoryProperties(categorySlug: string, product: any) {
  const properties = [];
  
  switch (categorySlug) {
    case 'clothing':
      properties.push(
        { name: 'Size', value: 'Medium', type: 'size' },
        { name: 'Color', value: 'Navy Blue', type: 'color' },
        { name: 'Material', value: 'Cotton Blend', type: 'material' },
        { name: 'Style', value: 'Casual' }
      );
      break;
    case 'tableware':
      properties.push(
        { name: 'Material', value: 'Ceramic', type: 'material' },
        { name: 'Dimensions', value: '10" x 10"' },
        { name: 'Dishwasher Safe', value: 'Yes' },
        { name: 'Set Size', value: '4 pieces' }
      );
      break;
    case 'kitchen':
      properties.push(
        { name: 'Material', value: 'Stainless Steel', type: 'material' },
        { name: 'Dimensions', value: '12" x 8" x 4"' },
        { name: 'Dishwasher Safe', value: 'Yes' },
        { name: 'Heat Resistant', value: 'Up to 450°F' }
      );
      break;
    case 'home-decor':
      properties.push(
        { name: 'Material', value: 'Ceramic & Wood', type: 'material' },
        { name: 'Dimensions', value: '8" x 6" x 10"' },
        { name: 'Color', value: 'Beige', type: 'color' },
        { name: 'Style', value: 'Modern Minimalist' }
      );
      break;
    default:
      // For other categories or new arrivals
      properties.push(
        { name: 'Condition', value: 'New' },
        { name: 'In Store', value: 'Available' }
      );
  }
  
  return properties;
}

export default function Category({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [, setLocation] = useLocation();
  const [sortBy, setSortBy] = useState<string>("default");

  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: [`/api/products/category/${category?.id}`],
    enabled: !!category?.id,
    onSuccess: (data) => {
      console.log("Category products loaded:", {category: category?.slug, id: category?.id, count: data?.length, data});
    },
    onError: (error) => {
      console.error("Error loading category products:", error);
    }
  });

  useEffect(() => {
    // Log more information about the category and products
    console.log("Category data:", category);
    
    if (category === null) {
      setLocation("/not-found");
    }
  }, [category, setLocation]);

  const getSortedProducts = () => {
    if (!products) return [];
    
    const productsCopy = [...products];
    
    switch (sortBy) {
      case "price-low-high":
        return productsCopy.sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return aPrice - bPrice;
        });
      case "price-high-low":
        return productsCopy.sort((a, b) => {
          const aPrice = a.discountPrice || a.price;
          const bPrice = b.discountPrice || b.price;
          return bPrice - aPrice;
        });
      case "name-a-z":
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-a":
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case "discount":
        return productsCopy.sort((a, b) => {
          const aDiscount = a.discountPrice ? (a.price - a.discountPrice) / a.price : 0;
          const bDiscount = b.discountPrice ? (b.price - b.discountPrice) / b.price : 0;
          return bDiscount - aDiscount;
        });
      default:
        return productsCopy;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      {categoryLoading ? (
        <div className="mb-6">
          <Skeleton className="h-10 w-1/4 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      ) : (
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
          <p className="text-gray-600">Browse our collection of {category?.name.toLowerCase()}</p>
        </div>
      )}
      
      <div className="flex justify-end mb-6">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="name-a-z">Name: A to Z</SelectItem>
            <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            <SelectItem value="discount">Biggest Discount</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(8).fill(0).map((_, i) => (
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
      ) : sortedProducts.length > 0 ? (
        <>
          {/* Featured Product Showcase */}
          {sortedProducts.length > 0 && slug && (
            <FeaturedProductShowcase 
              product={{
                ...sortedProducts[0],
                description: sortedProducts[0].description || "Experience quality and style with this premium item from our collection."
              }}
              properties={getCategoryProperties(slug, sortedProducts[0])}
            />
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                imageUrl={product.imageUrl}
                price={product.price}
                discountPrice={product.discountPrice}
                stockLevel={product.stockLevel}
                isNew={product.isNew}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-600">
            We couldn't find any products in this category.
          </p>
        </div>
      )}
    </div>
  );
}
