import { useState } from "react";
import { Mail, CheckCircle, Bell, Gift, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const benefits = [
  {
    icon: <Gift className="h-6 w-6 text-blue-600" />,
    title: "Exclusive Deals",
    description: "Get first access to special discounts and flash sales before anyone else."
  },
  {
    icon: <Sparkles className="h-6 w-6 text-purple-600" />,
    title: "New Arrivals",
    description: "Be the first to know when we get fresh inventory and trending products."
  },
  {
    icon: <Bell className="h-6 w-6 text-green-600" />,
    title: "Pickup Alerts",
    description: "Receive notifications when your orders are ready for pickup."
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "Member-Only Events",
    description: "Invitations to special shopping events and product previews."
  }
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    deals: true,
    newArrivals: true,
    pickupAlerts: true,
    events: false
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription - would normally send to backend
    console.log("Newsletter subscription:", { email, preferences });
    setIsSubscribed(true);
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for subscribing to the DiscountMart newsletter. 
                  You'll start receiving updates based on your preferences.
                </p>
                <Button onClick={() => setIsSubscribed(false)} variant="outline">
                  Update Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscription</h1>
              <p className="text-gray-600">Stay updated with the latest deals and new arrivals from DiscountMart</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Why Subscribe?</CardTitle>
                <CardDescription>
                  Join thousands of satisfied customers who save more with our newsletter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start space-x-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Form */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe Now</CardTitle>
                <CardDescription>
                  Choose what you'd like to hear about and we'll keep you informed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      What would you like to receive?
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="deals"
                          checked={preferences.deals}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, deals: checked as boolean})
                          }
                        />
                        <label htmlFor="deals" className="text-sm font-medium text-gray-700">
                          Exclusive deals and discounts
                        </label>
                        <Badge variant="secondary" className="ml-auto">Recommended</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="newArrivals"
                          checked={preferences.newArrivals}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, newArrivals: checked as boolean})
                          }
                        />
                        <label htmlFor="newArrivals" className="text-sm font-medium text-gray-700">
                          New product arrivals
                        </label>
                        <Badge variant="secondary" className="ml-auto">Popular</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pickupAlerts"
                          checked={preferences.pickupAlerts}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, pickupAlerts: checked as boolean})
                          }
                        />
                        <label htmlFor="pickupAlerts" className="text-sm font-medium text-gray-700">
                          Order pickup notifications
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="events"
                          checked={preferences.events}
                          onCheckedChange={(checked) => 
                            setPreferences({...preferences, events: checked as boolean})
                          }
                        />
                        <label htmlFor="events" className="text-sm font-medium text-gray-700">
                          Special events and sales
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">5,000+</p>
                  <p className="text-sm text-gray-600">Active subscribers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">40%</p>
                  <p className="text-sm text-gray-600">Average savings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">Weekly</p>
                  <p className="text-sm text-gray-600">Email frequency</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>✓ No spam, ever</p>
                  <p>✓ Unsubscribe anytime</p>
                  <p>✓ Your email stays private</p>
                  <p>✓ Relevant content only</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">
                  Have questions about our newsletter?
                </p>
                <p className="text-sm text-gray-600">
                  Email: newsletter@discountmart.rw
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}