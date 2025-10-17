import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Support } from "./pages/Support";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { Cart } from "./pages/Cart";
import { Billing } from "./pages/Billing";
import { OrderPlaced } from "./pages/OrderPlaced";
import { PricingGateway } from "./pages/PricingGateway";
import { MinecraftPricing } from "./pages/MinecraftPricing";
import { VPSPricing } from "./pages/VPSPricing";
import { BotPricing } from "./pages/BotPricing";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { CookiePolicy } from "./pages/CookiePolicy";
import { SLAAgreement } from "./pages/SLAAgreement";
import { AcceptableUse } from "./pages/AcceptableUse";
import { CartProvider } from "./components/CartContext";
import { MetaTags } from "./components/MetaTags";
import { ContactSalesModal } from "./components/ContactSalesModal";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showContactSales, setShowContactSales] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Load Cloudflare Turnstile script
  useEffect(() => {
    if (!document.querySelector('script[src*="challenges.cloudflare.com"]')) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Handle page transitions
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleOrderPlaced = (details: any) => {
    setOrderDetails(details);
    setCurrentPage("order-placed");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Hero onNavigate={setCurrentPage} />;
      case "pricing":
        return <PricingGateway onNavigate={setCurrentPage} />;
      case "pricing-minecraft":
        return (
          <MinecraftPricing
            onNavigate={setCurrentPage}
            onShowContactSales={() => setShowContactSales(true)}
          />
        );
      case "pricing-vps":
        return <VPSPricing onNavigate={setCurrentPage} />;
      case "pricing-bots":
        return (
          <BotPricing
            onNavigate={setCurrentPage}
            onShowContactSales={() => setShowContactSales(true)}
          />
        );
      case "products":
        return <Products />;
      case "blog":
        return <Blog />;
      case "about":
        return <About />;
      case "support":
        return <Support />;
      case "privacy-policy":
        return <PrivacyPolicy />;
      case "terms-of-service":
        return <TermsOfService />;
      case "cookie-policy":
        return <CookiePolicy />;
      case "sla-agreement":
        return <SLAAgreement />;
      case "acceptable-use":
        return <AcceptableUse />;
      case "cart":
        return <Cart onNavigate={setCurrentPage} />;
      case "billing":
        return (
          <Billing
            onNavigate={setCurrentPage}
            onOrderPlaced={handleOrderPlaced}
          />
        );
      case "order-placed":
        return (
          <OrderPlaced onNavigate={setCurrentPage} orderDetails={orderDetails} />
        );
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Verified successfully!");
  };

  return (
    <CartProvider>
      <MetaTags
        title="DishaGB Hosting - Premium Minecraft, Bot & VPS Hosting | 99.9% Uptime"
        description="🚀 Best Minecraft & VPS Hosting in India | Starting ₹40/month | 24/7 Support | DDoS Protection | Instant Setup | Discord Bot Hosting | Game Servers | 99.9% Uptime Guarantee"
      />

      <Header onNavigate={setCurrentPage} currentPage={currentPage} />

      <div className="min-h-screen relative z-content pt-20">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary"></div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        {/* 🧩 Cloudflare Turnstile Widget */}
        <div
          style={{
            textAlign: "center",
            margin: "50px auto",
            padding: "20px",
          }}
        >
          <form onSubmit={handleVerify}>
            <div
              className="cf-turnstile"
              data-sitekey="0x4AAAAAAB7Ki5eNYbuZOeW_"
            ></div>
            <button
              type="submit"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#00ff99",
                border: "none",
                borderRadius: "6px",
                color: "#000",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Verify
            </button>
          </form>
        </div>

        {/* Footer */}
        {currentPage !== "order-placed" && <Footer onNavigate={setCurrentPage} />}

        {/* Page Loader */}
        <AnimatePresence>
          {isPageLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[9998] bg-bg-primary/90 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary-green rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Sales Modal */}
        <ContactSalesModal
          isOpen={showContactSales}
          onClose={() => setShowContactSales(false)}
        />

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </CartProvider>
  );
}
