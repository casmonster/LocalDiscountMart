import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Package, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatRwandanFrancs } from "@/lib/currency";
import type { Order, OrderItem, Product } from "@shared/schema";

export default function OrderStatus() {
  const [orderId, setOrderId] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");

  const { data: order, isLoading, error } = useQuery<Order & { items: (OrderItem & { product: Product })[] }>({
    queryKey: [`/api/orders/${searchOrderId}`],
    enabled: !!searchOrderId && searchOrderId.length > 0
  });

  const handleSearch = () => {
    if (orderId.trim()) {
      setSearchOrderId(orderId.trim());
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Status</h1>
          <p className="text-gray-600">Track your order and get updates on your pickup status</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Find Your Order</span>
            </CardTitle>
            <CardDescription>
              Enter your order ID to track your order status and pickup information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input
                placeholder="Enter Order ID (e.g., 12345)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={!orderId.trim()}>
                Search Order
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {isLoading && (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-32" />
                  <Skeleton className="h-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && searchOrderId && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Not Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find an order with ID "{searchOrderId}". Please check your order ID and try again.
                </p>
                <p className="text-sm text-gray-500">
                  Order IDs are typically sent to your email after placing an order.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {order && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span>Order #{order.id}</span>
                  </CardTitle>
                  <CardDescription>
                    Placed on {order.createdAt ? new Date(order.createdAt.toString()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown date'}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Customer Information</h4>
                  <p className="text-gray-600">{order.customerName}</p>
                  <p className="text-gray-600">{order.customerEmail}</p>
                  <p className="text-gray-600">{order.customerPhone}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Pickup Information</h4>
                  <p className="text-gray-600">DiscountMart Store</p>
                  <p className="text-gray-600">Downtown Kigali, Rwanda</p>
                  <p className="text-gray-600">
                    Status: {order.status === 'ready' ? 'Ready for pickup' : 'Being prepared'}
                  </p>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatRwandanFrancs(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatRwandanFrancs(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              )}

              {order.status === 'ready' && (
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="font-semibold text-green-800">Your order is ready for pickup!</p>
                  </div>
                  <p className="text-green-700 mt-1">
                    Please visit our store in downtown Kigali to collect your items.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!order && !isLoading && !error && searchOrderId && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Order Found</h3>
                <p className="text-gray-600">
                  Enter your order ID above to track your order status.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}