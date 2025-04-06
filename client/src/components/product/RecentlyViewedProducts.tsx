import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import ProductCard from "./ProductCard";

export default function RecentlyViewedProducts() {
  const { recentlyViewed } = useRecentlyViewed();

  if (!recentlyViewed.length) {
    return null;
  }

  return (
    <div className="mt-12 mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.price}
            discountPrice={product.discountPrice}
            stockLevel={product.stockLevel}
            isNew={false}
          />
        ))}
      </div>
    </div>
  );
}