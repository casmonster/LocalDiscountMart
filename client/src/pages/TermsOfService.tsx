import { FileText, ShoppingCart, MapPin, AlertTriangle, Scale, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 p-3 rounded-full">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-600">Last updated: June 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
            <CardDescription>
              Please read these Terms of Service carefully before using DiscountMart's services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of DiscountMart's website and services located in downtown Kigali, Rwanda. 
              By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, 
              you may not access our services.
            </p>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>About DiscountMart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              DiscountMart is a retail business operating in Kigali, Rwanda, specializing in discounted merchandise 
              including clothing, tableware, kitchen items, and home decor. We operate as a pickup-only store where 
              customers order online and collect items at our physical location.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800"><strong>Business Address:</strong> Downtown Kigali, Rwanda</p>
              <p className="text-blue-800"><strong>Operating Hours:</strong> Monday-Saturday 8:00 AM - 7:00 PM, Sunday 10:00 AM - 5:00 PM</p>
            </div>
          </CardContent>
        </Card>

        {/* Service Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Our Services</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Online Ordering</h3>
              <p className="text-gray-700">
                Our website allows you to browse products, add items to your cart, and place orders for pickup at our store.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pickup Service</h3>
              <p className="text-gray-700">
                All orders must be collected at our physical store location. We do not offer delivery services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Availability</h3>
              <p className="text-gray-700">
                Product availability is subject to change. We reserve the right to modify inventory without prior notice.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ordering Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ordering and Payment Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Placement</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Orders can be placed through our website 24/7</li>
                <li>Order confirmation will be sent via email</li>
                <li>Orders are subject to product availability</li>
                <li>We reserve the right to cancel orders if products become unavailable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Payment</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Payment is due at the time of pickup</li>
                <li>We accept cash, mobile money (MTN Mobile Money, Airtel Money), and major credit/debit cards</li>
                <li>All prices are displayed in Rwandan Francs (RWF)</li>
                <li>Prices include applicable taxes unless otherwise stated</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Hold Period</h3>
              <p className="text-gray-700">
                Orders will be held for pickup for 48 hours from the time of notification. 
                After this period, uncollected orders may be returned to inventory.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Pickup Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pickup Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Valid government-issued photo ID required for pickup</li>
                <li>Order confirmation email must be presented</li>
                <li>Third-party pickup allowed with prior authorization and valid ID</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Pickup Times</h3>
              <p className="text-gray-700">
                Orders are typically ready for pickup within 2-4 hours during business hours. 
                You will receive notification when your order is ready.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Inspection</h3>
              <p className="text-gray-700">
                Customers are encouraged to inspect items at pickup. Once items leave the store, 
                they are considered accepted unless defects are reported within 24 hours.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Returns and Exchanges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Returns and Exchanges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Return Period</h3>
              <p className="text-gray-700">
                Items may be returned within 7 days of pickup for a full refund or exchange, 
                provided they are in original condition with tags attached.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Non-Returnable Items</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Personal care items and hygiene products</li>
                <li>Food items and consumables</li>
                <li>Items damaged by customer misuse</li>
                <li>Custom or personalized items</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Defective Items</h3>
              <p className="text-gray-700">
                Defective items will be exchanged or refunded at our discretion. 
                Defects must be reported within 24 hours of pickup.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prohibited Uses */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Prohibited Uses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">You may not use our services:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
            </ul>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5" />
              <span>Limitation of Liability</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              In no case shall DiscountMart, our directors, officers, employees, affiliates, agents, contractors, 
              interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any 
              direct, indirect, incidental, punitive, special, or consequential damages of any kind.
            </p>
            <p className="text-gray-700">
              Our total liability for any claims arising from these terms or your use of our services shall not 
              exceed the amount you paid for the products in question.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              These Terms shall be interpreted and governed by the laws of the Republic of Rwanda. 
              Any disputes arising from these terms shall be resolved in the courts of Kigali, Rwanda.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We reserve the right to update or change our Terms of Service at any time without prior notice. 
              Your continued use of the service after we post any modifications to the Terms of Service on this page 
              will constitute your acknowledgment of the modifications and your consent to abide by the modified terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contact Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-700">legal@discountmart.rw</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Store Location</h4>
                <p className="text-gray-700">DiscountMart<br />Downtown Kigali, Rwanda</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}