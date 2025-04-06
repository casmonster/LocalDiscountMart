import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import StoreInfo from "@/pages/StoreInfo";

// Create a Wishlist page component
import Wishlist from "@/pages/Wishlist";

// For the "New Arrivals" route
import NewArrivals from "@/pages/NewArrivals";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation/:id" component={OrderConfirmation} />
          <Route path="/store-info" component={StoreInfo} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/new-arrivals" component={NewArrivals} />
          <Route path="/clearance" component={() => <Category params={{ slug: 'clearance' }} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <Router />
          <Toaster />
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
