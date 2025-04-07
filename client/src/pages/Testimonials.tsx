
import { Card } from "@/components/ui/card";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The quality of products and customer service is exceptional. I love the convenient store pickup option!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Verified Buyer",
      content: "Great prices and amazing selection. The kitchen collection is particularly impressive.",
      rating: 5
    },
    {
      name: "Emily Parker",
      role: "Home Decorator",
      content: "Found beautiful home decor pieces at incredible discounts. Will definitely shop here again!",
      rating: 5
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 flex-grow">{testimonial.content}</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
