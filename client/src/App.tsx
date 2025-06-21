import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import { useEffect } from "react";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
 // Added ScrollRestoration

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
import Clearance from "@/pages/Clearance";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PickupPolicy from "@/pages/PickupPolicy";
import Testimonials from "@/pages/Testimonials";
import MyAccount from "@/pages/MyAccount";
import OrderStatus from "@/pages/OrderStatus";
import FAQ from "@/pages/FAQ";
import HelpCenter from "@/pages/HelpCenter";
import Newsletter from "@/pages/Newsletter";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import Sitemap from "@/pages/Sitemap";
import Search from "@/pages/Search";
import AdminDashboard from "@/pages/AdminDashboard";


function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/category/:slug" component={Category} />
          <Route path="/product/:slug" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/order-confirmation/:id" component={OrderConfirmation} />
          <Route path="/store-info" component={StoreInfo} />
          <Route path="/search" component={Search} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/new-arrivals" component={NewArrivals} />
          <Route path="/clearance" component={Clearance} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/pickup-policy" component={PickupPolicy} />
          <Route path="/testimonials" component={Testimonials} />
          <Route path="/account" component={MyAccount} />
          <Route path="/orders" component={OrderStatus} />
          <Route path="/faq" component={FAQ} />
          <Route path="/help" component={HelpCenter} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={TermsOfService} />
          <Route path="/sitemap" component={Sitemap} />
          <Route path="/admin/orders/manage" component={AdminDashboard} />
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