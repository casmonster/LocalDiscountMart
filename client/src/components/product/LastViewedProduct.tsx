import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function LastViewedProduct() {
  const { lastViewedProduct } = useRecentlyViewed();

  if (!lastViewedProduct) {
    return null;
  }

  const {
    id,
    slug,
    name,
    imageUrl,
    price,
    discountPrice,
  } = lastViewedProduct;

  return (
    <div className="mt-10 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Last Viewed Product
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow space-y-2">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center">
              {discountPrice ? (
                <>
                  <span className="text-secondary font-bold mr-2">
                    ${discountPrice.toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-sm line-through">
                    ${price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-gray-900 font-bold">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex space-x-2 mt-3">
              <Link href={`/product/${slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}