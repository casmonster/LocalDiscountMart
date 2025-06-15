import { useState } from "react";
import { Search, MessageCircle, Phone, Mail, MapPin, Clock, HelpCircle, FileText, Package } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

const helpTopics = [
  {
    title: "Order Issues",
    description: "Problems with placing orders, order confirmation, or order modifications",
    icon: <Package className="h-6 w-6" />,
    href: "/faq"
  },
  {
    title: "Pickup Problems",
    description: "Issues with pickup times, location, or order readiness",
    icon: <MapPin className="h-6 w-6" />,
    href: "/orders"
  },
  {
    title: "Product Questions",
    description: "Questions about product availability, condition, or specifications",
    icon: <HelpCircle className="h-6 w-6" />,
    href: "/faq"
  },
  {
    title: "Account Support",
    description: "Help with account access, order history, or personal information",
    icon: <FileText className="h-6 w-6" />,
    href: "/account"
  }
];

export default function HelpCenter() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would normally send to backend
    console.log("Contact form submitted:", contactForm);
    alert("Thank you for contacting us! We'll respond within 24 hours.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600">Get the support you need for your DiscountMart experience</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Help Topics */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Help Topics</CardTitle>
                <CardDescription>
                  Find immediate answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpTopics.map((topic) => (
                    <Link key={topic.title} href={topic.href}>
                      <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            {topic.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{topic.title}</h3>
                            <p className="text-sm text-gray-600">{topic.description}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Support</span>
                </CardTitle>
                <CardDescription>
                  Can't find what you're looking for? Send us a message and we'll help you out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Store Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Store Location</p>
                    <p className="text-gray-600">Downtown Kigali, Rwanda</p>
                    <p className="text-sm text-gray-500">In-store pickup available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p className="text-gray-600">Mon-Sat: 8:00 AM - 7:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-gray-600">support@discountmart.rw</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/faq" className="block text-blue-600 hover:text-blue-800">
                    Frequently Asked Questions
                  </Link>
                  <Link href="/orders" className="block text-blue-600 hover:text-blue-800">
                    Track Your Order
                  </Link>
                  <Link href="/pickup-policy" className="block text-blue-600 hover:text-blue-800">
                    Pickup Policy
                  </Link>
                  <Link href="/store-info" className="block text-blue-600 hover:text-blue-800">
                    Store Information
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  We aim to respond to all inquiries within 24 hours during business days.
                </p>
                <p className="text-sm text-gray-600">
                  For urgent matters, please visit our store directly during business hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}