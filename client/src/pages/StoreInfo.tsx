import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function StoreInfo() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Visit Our Store</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-md h-full">
            <div className="bg-gray-200 w-full aspect-[4/3] flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium">DiscountMart Store Location</p>
                <p className="text-gray-600">123 Main Street, Anytown, ST 12345</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address:</p>
                    <p>123 Main Street, Anytown, ST 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone:</p>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email:</p>
                    <p>info@discountmart.com</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Store Hours</h2>
              <div className="flex items-start mb-4">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-2">
                    <p>Monday - Friday:</p>
                    <p>9:00 AM - 8:00 PM</p>
                    
                    <p>Saturday:</p>
                    <p>9:00 AM - 6:00 PM</p>
                    
                    <p>Sunday:</p>
                    <p>10:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Pickup Information</h2>
              <p className="mb-4">
                When you place an order through our website, we'll prepare your items for pickup at our store. Here's what you need to know:
              </p>
              
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Orders are typically ready for pickup within 24 hours</li>
                <li>You'll receive an email notification when your order is ready</li>
                <li>Bring a photo ID and your order confirmation when picking up</li>
                <li>Orders not picked up within 7 days may be canceled</li>
              </ul>
              
              <Button className="w-full">Get Directions</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">What types of payment do you accept?</h3>
              <p className="text-gray-700">
                We accept all major credit cards, debit cards, cash, and mobile payment options when you pick up your order.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Can I modify my order after it's been placed?</h3>
              <p className="text-gray-700">
                If you need to modify your order, please contact us as soon as possible by phone or email. We'll do our best to accommodate changes before your order is prepared.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">What is your return policy?</h3>
              <p className="text-gray-700">
                We offer a 30-day return policy on most items. Items must be unused and in their original packaging. Please bring your receipt or order confirmation when returning items.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2">Do you offer delivery?</h3>
              <p className="text-gray-700">
                Currently, we only offer in-store pickup. We're working on adding delivery options in the future.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
