import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Category from "@/pages/Category";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import StoreInfo from "@/pages/StoreInfo";
import Wishlist from "@/pages/Wishlist";
import NewArrivals from "@/pages/NewArrivals";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PickupPolicy from "@/pages/PickupPolicy";


function Router() {
  useEffect(() => {
    // Prevent automatic scroll reset
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

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
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/pickup-policy" component={PickupPolicy} />
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
          <RecentlyViewedProvider>
            <Router />
            <Toaster />
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;