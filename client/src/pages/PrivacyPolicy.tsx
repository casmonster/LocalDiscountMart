import { Shield, Eye, Lock, Users, FileText, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">Last updated: June 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Matters</CardTitle>
            <CardDescription>
              DiscountMart is committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy applies to all services provided by DiscountMart, located in downtown Kigali, Rwanda. 
              By using our website and services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Information We Collect</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Name, email address, and phone number when placing orders</li>
                <li>Order history and preferences</li>
                <li>Communication preferences for newsletters and updates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>IP address and browser information for security purposes</li>
                <li>Website usage data to improve our services</li>
                <li>Shopping cart contents and product preferences</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Payment Information</h3>
              <p className="text-gray-700">
                We do not store payment card information. All payments are processed securely at our physical store location.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>How We Use Your Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and pickup notifications</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send newsletter updates and promotional offers (with your consent)</li>
              <li>Improve our website functionality and user experience</li>
              <li>Comply with legal obligations and protect against fraud</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Data Protection & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction.
            </p>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Security Measures</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Encrypted data transmission using SSL technology</li>
                <li>Secure server infrastructure and regular security updates</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Regular security assessments and monitoring</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Information Sharing */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements or court orders</li>
              <li>To protect our rights, property, or safety, or that of our customers</li>
              <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="text-gray-700 mt-4">
              To exercise these rights, please contact us at privacy@discountmart.rw or visit our store in downtown Kigali.
            </p>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your browsing experience and analyze website usage.
            </p>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </div>
            <p className="text-gray-700 mt-4">
              You can control cookie settings through your browser preferences. Note that disabling cookies may affect website functionality.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We retain your personal information only as long as necessary for the purposes outlined in this policy, 
              or as required by law. Order information is typically retained for 7 years for accounting and tax purposes. 
              Newsletter subscriptions are maintained until you unsubscribe.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "last updated" date. We encourage you to review this policy 
              periodically for any changes.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                <p className="text-gray-700">privacy@discountmart.rw</p>
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