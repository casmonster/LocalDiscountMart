import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Package, CreditCard, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

const faqData = [
  {
    category: "Orders & Pickup",
    icon: <Package className="h-5 w-5" />,
    questions: [
      {
        question: "How do I place an order?",
        answer: "Browse our products, add items to your cart, and proceed to checkout. You'll receive an order confirmation email with pickup details."
      },
      {
        question: "When can I pick up my order?",
        answer: "Orders are typically ready for pickup within 2-4 hours during business hours. You'll receive a notification when your order is ready."
      },
      {
        question: "Where is your store located?",
        answer: "We're located in downtown Kigali, Rwanda. The exact address will be provided in your order confirmation email."
      },
      {
        question: "Can someone else pick up my order?",
        answer: "Yes, but they'll need to present the order confirmation email and a valid ID. Please inform us in advance if someone else will be picking up your order."
      }
    ]
  },
  {
    category: "Products & Pricing",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: "Are the discounted prices final?",
        answer: "Yes, all displayed prices include our discount. No additional fees are added at checkout except for any applicable taxes."
      },
      {
        question: "Do you accept returns or exchanges?",
        answer: "We accept returns within 7 days of pickup for unused items in original condition. Some items like personal care products may not be returnable."
      },
      {
        question: "Are your products authentic?",
        answer: "Absolutely! All our products are authentic and sourced from legitimate suppliers. We guarantee the quality of everything we sell."
      },
      {
        question: "Why are your prices so low?",
        answer: "We specialize in overstock, closeout, and bulk purchasing which allows us to offer significant discounts while maintaining quality."
      }
    ]
  },
  {
    category: "Payment & Account",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash payments at pickup, mobile money (MTN Mobile Money, Airtel Money), and major credit/debit cards."
      },
      {
        question: "Do I need to create an account to shop?",
        answer: "No account is required to browse and purchase. However, creating an account helps you track orders and save favorites."
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use industry-standard encryption to protect your payment information. We never store your full payment details."
      },
      {
        question: "Can I pay online or only at pickup?",
        answer: "Currently, payment is made at pickup. This ensures you can inspect your items before completing the purchase."
      }
    ]
  },
  {
    category: "Store Information",
    icon: <MapPin className="h-5 w-5" />,
    questions: [
      {
        question: "What are your store hours?",
        answer: "We're open Monday-Saturday 8:00 AM - 7:00 PM, and Sunday 10:00 AM - 5:00 PM. Holiday hours may vary."
      },
      {
        question: "Do you offer delivery?",
        answer: "Currently, we're a pickup-only store. This helps us keep our prices low and ensures you can inspect items before taking them home."
      },
      {
        question: "How often do you get new inventory?",
        answer: "We receive new products weekly! Check our 'New Arrivals' section or subscribe to our newsletter for updates on fresh inventory."
      },
      {
        question: "Can I reserve items without purchasing?",
        answer: "Items can be held for 30 minutes while you complete your shopping online. After checkout, orders are held for 48 hours before being returned to inventory."
      }
    ]
  }
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h1>
              <p className="text-gray-600">Find quick answers to common questions about DiscountMart</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md">
            <Input
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {filteredFAQ.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <span>{category.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.questions.map((faq, index) => {
                    const itemId = `${category.category}-${index}`;
                    const isOpen = openItems.includes(itemId);
                    
                    return (
                      <Collapsible key={itemId}>
                        <CollapsibleTrigger
                          onClick={() => toggleItem(itemId)}
                          className="flex w-full items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </CollapsibileTrigger>
                        <CollapsibleContent className="px-4 pb-4">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQ.length === 0 && searchTerm && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any FAQ matching "{searchTerm}". Try different keywords or browse all categories.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for? We're here to help!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Visit Our Store</h4>
                <p className="text-gray-600">Downtown Kigali, Rwanda</p>
                <p className="text-gray-600">Mon-Sat: 8AM-7PM, Sun: 10AM-5PM</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
                <p className="text-gray-600">support@discountmart.rw</p>
                <p className="text-gray-600">Response within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}