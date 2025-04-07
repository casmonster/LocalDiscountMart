
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About DiscountMart</h1>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2020, DiscountMart has become Kigali's premier destination for quality products at amazing prices. We believe that everyone deserves access to high-quality products without breaking the bank.
          </p>
          <p className="mb-4">
            Our carefully curated selection includes everything from stylish clothing to essential kitchen items, all backed by our commitment to quality and customer satisfaction.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p>We never compromise on quality, ensuring every product meets our high standards.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Affordability</h3>
              <p>Great products shouldn't cost a fortune. We work hard to offer the best prices.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Service</h3>
              <p>Our friendly team is always ready to help you find exactly what you need.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
