import { Link } from "wouter";
import { User, Package, HelpCircle, Mail, FileText, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MyAccount() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-gray-600">Manage your orders, preferences, and account settings</p>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/orders">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Order Status</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your orders, view order history, and manage returns or exchanges.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Orders
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/faq">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">FAQ</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find answers to commonly asked questions about products, shipping, and policies.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Browse FAQ
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/help">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Help Center</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get personalized support for your account, orders, and product questions.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Get Help
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/newsletter">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Newsletter</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Subscribe to our newsletter for exclusive deals, new arrivals, and updates.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Manage Subscription
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/privacy">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle className="text-lg">Privacy & Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Review privacy policy, manage your data preferences, and security settings.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Policy
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <Link href="/terms">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-red-600" />
                  </div>
                  <CardTitle className="text-lg">Terms of Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Read our terms of service, return policy, and store guidelines.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  Read Terms
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact DiscountMart</CardTitle>
            <CardDescription>
              Need immediate assistance? Here's how to reach us.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Store Location</h4>
                <p className="text-gray-600">Downtown Kigali, Rwanda</p>
                <p className="text-gray-600">Pickup orders available during business hours</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Service</h4>
                <p className="text-gray-600">Email: support@discountmart.rw</p>
                <p className="text-gray-600">Response time: Within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}