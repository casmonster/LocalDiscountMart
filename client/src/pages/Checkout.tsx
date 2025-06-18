import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Minus, Plus } from "lucide-react";
import { convertToRwandanFrancs, formatRwandanFrancs } from "@/lib/currency";

const checkoutFormSchema = z.object({
  customerName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  customerEmail: z.string().email({ message: "Please enter a valid email address" }),
  customerPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { 
    cartItems, 
    removeItem, 
    updateQuantity, 
    getCartTotal, 
    getTaxAmount, 
    getFinalTotal, 
    clearCart,
    cartId,
    isLoading 
  } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    },
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare order data
      const orderData = {
        order: {
          ...data,
          totalAmount: getFinalTotal(),
        },
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.discountPrice || item.product.price,
        })),
      };

      // Create order
      const response = await apiRequest("POST", "/api/orders", orderData);
      const order = await response.json();

      // Clear the cart
      await clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${order.id}`);

      toast({
        title: "Order placed successfully",
        description: "Thank you for your order!",
      });
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleIncreaseQuantity = (itemId: number, currentQuantity: number) => {
    updateQuantity(itemId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (itemId: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, currentQuantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Button onClick={() => navigate("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Customer Information */}
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>
                Please enter your details for order pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll send your order confirmation to this email
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll contact you when your order is ready for pickup
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Pickup Information</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Your order will be available for pickup at our store location:
                    </p>
                    <p className="text-sm">
                      <strong>DiscountMart</strong><br />
                      123 Main Street<br />
                      Anytown, ST 12345
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                Review your items before placing your order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p>Loading cart items...</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.product.setPieces > 1 && (
                          <p className="text-xs text-gray-600">
                            {item.product.setPieces} {item.product.unitType === "set" ? "pieces per set" : `${item.product.unitType}s included`}
                          </p>
                        )}
                        <p className="text-blue-800 font-bold">
                          {formatRwandanFrancs(convertToRwandanFrancs(item.product.discountPrice || item.product.price))}
                          {item.product.setPieces > 1 && (
                            <span className="text-sm text-gray-600 ml-1">per {item.product.unitType}</span>
                          )}
                        </p>
                        <div className="flex items-center mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </>
              )}
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-blue-800">{formatRwandanFrancs(getCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%):</span>
                  <span className="font-medium text-blue-800">{formatRwandanFrancs(getTaxAmount())}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-blue-800">{formatRwandanFrancs(getFinalTotal())}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 rounded-b-lg">
              <div className="w-full">
                <p className="text-sm text-gray-600 mb-4">
                  By placing your order, you agree to our terms and conditions. 
                  Your items will be available for pickup at our store location.
                </p>
                <Button
                  className="w-full"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting || cartItems.length === 0}
                >
                  {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
