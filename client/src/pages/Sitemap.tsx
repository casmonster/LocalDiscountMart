import { Link } from "wouter";
import { Map, Home, ShoppingBag, Package, Users, FileText, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const sitemapSections = [
  {
    title: "Main Pages",
    icon: <Home className="h-5 w-5" />,
    links: [
      { name: "Home", href: "/", description: "Main page with featured products and categories" },
      { name: "New Arrivals", href: "/new-arrivals", description: "Latest products in our inventory" },
      { name: "Clearance", href: "/clearance", description: "Special discounted items and sales" },
      { name: "Wishlist", href: "/wishlist", description: "Save your favorite items for later" }
    ]
  },
  {
    title: "Product Categories",
    icon: <ShoppingBag className="h-5 w-5" />,
    links: [
      { name: "Clothing", href: "/category/clothing", description: "Shirts, sweaters, jackets, and accessories" },
      { name: "Tableware", href: "/category/tableware", description: "Plates, glasses, cutlery, and dining sets" },
      { name: "Kitchen", href: "/category/kitchen", description: "Cookware, appliances, and kitchen tools" },
      { name: "Home Decor", href: "/category/home-decor", description: "Lamps, vases, artwork, and decorative items" }
    ]
  },
  {
    title: "Shopping & Orders",
    icon: <Package className="h-5 w-5" />,
    links: [
      { name: "Checkout", href: "/checkout", description: "Complete your purchase" },
      { name: "Order Status", href: "/orders", description: "Track your orders and pickup status" },
      { name: "My Account", href: "/account", description: "Manage your account and preferences" }
    ]
  },
  {
    title: "Customer Service",
    icon: <Users className="h-5 w-5" />,
    links: [
      { name: "FAQ", href: "/faq", description: "Frequently asked questions and answers" },
      { name: "Help Center", href: "/help", description: "Get support and contact customer service" },
      { name: "Newsletter", href: "/newsletter", description: "Subscribe to updates and special offers" },
      { name: "Contact Us", href: "/contact", description: "Get in touch with our team" }
    ]
  },
  {
    title: "Store Information",
    icon: <Phone className="h-5 w-5" />,
    links: [
      { name: "About Us", href: "/about", description: "Learn about DiscountMart and our mission" },
      { name: "Store Info", href: "/store-info", description: "Location, hours, and store details" },
      { name: "Pickup Policy", href: "/pickup-policy", description: "Guidelines for order pickup" },
      { name: "Testimonials", href: "/testimonials", description: "Customer reviews and feedback" }
    ]
  },
  {
    title: "Legal",
    icon: <FileText className="h-5 w-5" />,
    links: [
      { name: "Privacy Policy", href: "/privacy", description: "How we protect and use your personal information" },
      { name: "Terms of Service", href: "/terms", description: "Terms and conditions for using our services" },
      { name: "Sitemap", href: "/sitemap", description: "Complete overview of all website pages" }
    ]
  }
];

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Map className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sitemap</h1>
              <p className="text-gray-600">Complete overview of all pages on DiscountMart</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">20+</p>
                <p className="text-sm text-gray-600">Total Pages</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">4</p>
                <p className="text-sm text-gray-600">Product Categories</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">6</p>
                <p className="text-sm text-gray-600">Service Sections</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sitemap Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sitemapSections.map((section) => (
            <Card key={section.title} className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    {section.icon}
                  </div>
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {section.links.map((link) => (
                    <div key={link.href} className="border-l-2 border-blue-200 pl-4">
                      <Link href={link.href}>
                        <div className="hover:bg-blue-50 p-2 rounded cursor-pointer transition-colors">
                          <h3 className="font-semibold text-blue-600 hover:text-blue-800">
                            {link.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Need Help?</span>
              </CardTitle>
              <CardDescription>
                Can't find what you're looking for?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you can't find a specific page or need assistance navigating our website, 
                our customer service team is here to help.
              </p>
              <div className="space-y-2">
                <Link href="/help" className="text-blue-600 hover:text-blue-800 block">
                  Visit our Help Center
                </Link>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 block">
                  Contact Customer Service
                </Link>
                <Link href="/faq" className="text-blue-600 hover:text-blue-800 block">
                  Browse FAQ
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Visit us in person for the full DiscountMart experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">Downtown Kigali, Rwanda</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">Mon-Sat: 8:00 AM - 7:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Services</h4>
                  <p className="text-gray-600">Online ordering with in-store pickup</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Note */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600">
                This sitemap was last updated on June 15, 2025. 
                New pages and features are added regularly to improve your shopping experience.
              </p>
              <p className="text-gray-600 mt-2">
                For technical issues or broken links, please contact us at 
                <span className="text-blue-600"> support@discountmart.rw</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}