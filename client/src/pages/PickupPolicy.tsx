
import { Card, CardContent } from "@/components/ui/card";

export default function PickupPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pickup Policy</h1>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Order Pickup Guidelines</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Orders are typically ready for pickup within 24 hours of placement</li>
              <li>You'll receive an email notification when your order is ready</li>
              <li>Orders must be picked up within 7 days of notification</li>
              <li>Please bring a valid photo ID and your order confirmation</li>
              <li>Payment is required at the time of pickup</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Store Hours</h2>
            <div className="grid grid-cols-2 gap-2">
              <p>Monday - Friday:</p>
              <p>9:00 AM - 8:00 PM</p>
              <p>Saturday:</p>
              <p>9:00 AM - 6:00 PM</p>
              <p>Sunday:</p>
              <p>10:00 AM - 5:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
