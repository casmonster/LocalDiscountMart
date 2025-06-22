import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { formatRwandanFrancs, convertToRwandanFrancs } from "@/lib/currency";
import type { Order, OrderItem, Product } from "@shared/schema";

export default function OrderConfirmation({ params }: { params: { id: string } }) {
  const { id } = params;
  const [, navigate] = useLocation();

  const { data: order, isLoading, error } = useQuery<Order & { items: (OrderItem & { product: Product })[] }>({
    queryKey: [`/api/orders/${id}`],
  });

  useEffect(() => {
    if (error) {
      navigate("/not-found");
    }
  }, [error, navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-2 bg-success/10 rounded-full">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
          </div>
          <CardTitle className="text-2xl">Order Successfully Placed!</CardTitle>
          <CardDescription>
            Thank you for your order. We've received your request and will begin processing it immediately.
          </CardDescription>
          {order && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                📋 Your Order ID: <span className="text-lg font-bold">#{order.id}</span>
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Save this number to track your order status
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Order Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Order Number:</p>
                <p className="font-medium">#{order.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Date:</p>
                <p className="font-medium">
                  {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Total Amount:</p>
                <p className="font-medium text-blue-800">{formatRwandanFrancs(convertToRwandanFrancs(order.totalAmount))}</p>
              </div>
              <div>
                <p className="text-gray-500">Status:</p>
                <p className="font-medium uppercase">{order.status}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="bg-gray-100 p-2 rounded-full mr-3">
                  <Mail className="h-4 w-4 text-gray-600" />
                </span>
                <span>{order.customerEmail}</span>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-100 p-2 rounded-full mr-3">
                  <Phone className="h-4 w-4 text-gray-600" />
                </span>
                <span>{order.customerPhone}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Order Summary</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center py-2 border-b border-gray-200 last:border-b-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-grow">
                    <p className="font-medium">{item.product.name}</p>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} × {formatRwandanFrancs(convertToRwandanFrancs(item.price))}
                      </p>
                      <p className="font-medium text-blue-800">
                        {formatRwandanFrancs(convertToRwandanFrancs(item.quantity * item.price))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Separator className="my-3" />

              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-blue-800">{formatRwandanFrancs(convertToRwandanFrancs(order.totalAmount))}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2 flex items-center">
              <MapPin className="h-5 w-5 mr-1" /> Pickup Information
            </h3>
            <p className="text-sm mb-3">
                Your order will be ready for pickup at our store within one week. We'll send you an email notification as soon as it's available.
              </p>
            <div className="text-sm">
              <p className="font-medium">DiscountMart</p>
              <p>15 KN 4 Ave</p>
              <p>Downtown Kigali, Rwanda</p>
              <p className="mt-2">Store Hours: Mon-Fri 9AM-8PM, Sat 9AM-6PM, Sun 10AM-5PM</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/orders">
            <Button variant="outline">Track This Order</Button>
          </Link>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}