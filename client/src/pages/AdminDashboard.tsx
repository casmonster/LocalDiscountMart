import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatRwandanFrancs } from "@/lib/currency";
import { useToast } from "@/hooks/use-toast";
import { Package, Clock, Truck, CheckCircle, XCircle, Mail, Users } from "lucide-react";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    slug: string;
    description: string;
    imageUrl: string;
    price: number;
    discountPrice: number | null;
    categoryId: number;
    inStock: boolean;
    stockLevel: string;
    isNew: boolean;
    setPieces: number;
    unitType: string;
  };
}

interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: OrderItem[];
}

interface Newsletter {
  id: number;
  email: string;
  subscribedAt: string;
}

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processing", icon: Package, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Ready for Pickup", icon: Truck, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelled", icon: XCircle, color: "bg-red-100 text-red-800" },
};

export default function AdminDashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch all orders
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/admin/orders"],
  });

  // Fetch newsletter subscriptions
  const { data: newsletters, isLoading: newslettersLoading } = useQuery<Newsletter[]>({
    queryKey: ["/api/admin/newsletters"],
  });

  // Update order status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: OrderStatus }) => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to update order status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/orders"] });
      toast({
        title: "Order Updated",
        description: "Order status has been successfully updated.",
      });
      setSelectedOrderId(null);
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleStatusUpdate = (orderId: number, newStatus: OrderStatus) => {
    updateStatusMutation.mutate({ orderId, status: newStatus });
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      pending: "processing",
      processing: "shipped",
      shipped: "delivered",
      delivered: null,
      cancelled: null,
    };
    return statusFlow[currentStatus];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading || newslettersLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and newsletter subscriptions</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-sm">
            {orders?.length || 0} Orders
          </Badge>
          <Badge variant="secondary" className="text-sm">
            {newsletters?.length || 0} Subscribers
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="newsletters" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Newsletter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order Management</h2>
            <Badge variant="outline" className="text-sm">
              {orders?.length || 0} Total Orders
            </Badge>
          </div>

          <div className="grid gap-6">
            {orders?.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;
              const nextStatus = getNextStatus(order.status);
              
              return (
                <Card key={order.id} className="w-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Order #{order.id}
                          <Badge className={statusConfig[order.status].color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig[order.status].label}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Placed on {formatDate(order.createdAt)} • {formatRwandanFrancs(order.totalAmount)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {nextStatus && (
                          <Button
                            onClick={() => handleStatusUpdate(order.id, nextStatus)}
                            disabled={updateStatusMutation.isPending}
                            size="sm"
                          >
                            Move to {statusConfig[nextStatus].label}
                          </Button>
                        )}
                        <Select
                          onValueChange={(value: OrderStatus) => handleStatusUpdate(order.id, value)}
                          disabled={updateStatusMutation.isPending}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Change Status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([status, config]) => (
                              <SelectItem 
                                key={status} 
                                value={status}
                                disabled={status === order.status}
                              >
                                <div className="flex items-center gap-2">
                                  <config.icon className="w-4 h-4" />
                                  {config.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Customer:</span>
                          <p>{order.customerName}</p>
                          <p className="text-muted-foreground">{order.customerEmail}</p>
                          <p className="text-muted-foreground">{order.customerPhone}</p>
                        </div>
                        <div>
                          <span className="font-medium">Items:</span>
                          <p>{order.items.length} item(s)</p>
                        </div>
                        <div>
                          <span className="font-medium">Total:</span>
                          <p className="text-lg font-semibold">{formatRwandanFrancs(order.totalAmount)}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.quantity}x</span>
                                <span>{item.product.name}</span>
                              </div>
                              <span>{formatRwandanFrancs(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>{formatRwandanFrancs(order.totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!orders?.length && (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Orders Found</h3>
                <p className="text-muted-foreground">Orders will appear here once customers start placing them.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="newsletters" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Newsletter Subscriptions</h2>
            <Badge variant="outline" className="text-sm">
              {newsletters?.length || 0} Total Subscribers
            </Badge>
          </div>

          <div className="grid gap-4">
            {newsletters?.map((newsletter) => (
              <Card key={newsletter.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{newsletter.email}</p>
                        <p className="text-sm text-muted-foreground">
                          Subscribed on {formatDate(newsletter.subscribedAt)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      Subscribed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!newsletters?.length && (
            <Card>
              <CardContent className="text-center py-8">
                <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Newsletter Subscriptions</h3>
                <p className="text-muted-foreground">Email subscriptions will appear here when customers sign up.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}