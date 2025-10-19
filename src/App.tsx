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
import { TurnstileWidget } from "./components/TurnstileWidget";

import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showContactSales, setShowContactSales] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string>("");

  // Detect mobile devices for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimized page navigation with instant scroll
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

  const handleTurnstileVerify = (token: string) => {
    setVerificationToken(token);
    setIsVerified(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div 
            key="home"
            className="min-h-screen pt-4"
          >
            <Hero 
              onNavigate={setCurrentPage} 
            />
          </div>
        );
      case "pricing":
        return (
          <div 
            key="pricing"
            className="min-h-screen pt-4"
          >
            <PricingGateway 
              onNavigate={setCurrentPage}
            />
          </div>
        );
      case "pricing-minecraft":
        return (
          <div 
            key="pricing-minecraft"
            className="min-h-screen pt-4"
          >
            <MinecraftPricing 
              onNavigate={setCurrentPage}
              onShowContactSales={() => setShowContactSales(true)}
            />
          </div>
        );
      case "pricing-vps":
        return (
          <div 
            key="pricing-vps"
            className="min-h-screen pt-4"
          >
            <VPSPricing 
              onNavigate={setCurrentPage}
            />
          </div>
        );
      case "pricing-bots":
        return (
          <div 
            key="pricing-bots"
            className="min-h-screen pt-4"
          >
            <BotPricing 
              onNavigate={setCurrentPage}
              onShowContactSales={() => setShowContactSales(true)}
            />
          </div>
        );
      case "products":
        return (
          <div 
            key="products"
            className="min-h-screen pt-4"
          >
            <Products />
          </div>
        );

      case "blog":
        return (
          <div 
            key="blog"
            className="min-h-screen pt-4"
          >
            <Blog />
          </div>
        );
      case "about":
        return (
          <div 
            key="about"
            className="min-h-screen pt-4"
          >
            <About />
          </div>
        );
      case "support":
        return (
          <div 
            key="support"
            className="min-h-screen pt-4"
          >
            <Support />
          </div>
        );
      case "privacy-policy":
        return (
          <div 
            key="privacy-policy"
            className="min-h-screen pt-4"
          >
            <PrivacyPolicy />
          </div>
        );
      case "terms-of-service":
        return (
          <div 
            key="terms-of-service"
            className="min-h-screen pt-4"
          >
            <TermsOfService />
          </div>
        );
      case "cookie-policy":
        return (
          <div 
            key="cookie-policy"
            className="min-h-screen pt-4"
          >
            <CookiePolicy />
          </div>
        );
      case "sla-agreement":
        return (
          <div 
            key="sla-agreement"
            className="min-h-screen pt-4"
          >
            <SLAAgreement />
          </div>
        );
      case "acceptable-use":
        return (
          <div 
            key="acceptable-use"
            className="min-h-screen pt-4"
          >
            <AcceptableUse />
          </div>
        );
      case "cart":
        return (
          <div 
            key="cart"
            className="min-h-screen pt-4"
          >
            <Cart onNavigate={setCurrentPage} />
          </div>
        );
      case "billing":
        return (
          <div 
            key="billing"
            className="min-h-screen pt-4"
          >
            <Billing onNavigate={setCurrentPage} onOrderPlaced={handleOrderPlaced} />
          </div>
        );
      case "order-placed":
        return (
          <div 
            key="order-placed"
            className="min-h-screen"
          >
            <OrderPlaced 
              onNavigate={setCurrentPage} 
              orderDetails={orderDetails}
            />
          </div>
        );
      default:
        return (
          <div 
            key="home"
            className="min-h-screen"
          >
            <Hero 
              onNavigate={setCurrentPage} 
            />
          </div>
        );
    }
  };

  return (
      <CartProvider>
        <MetaTags
          title="DishaGB Hosting - Premium Minecraft, Bot & VPS Hosting | 99.9% Uptime"
          description="🚀 Best Minecraft & VPS Hosting in India | Starting ₹40/month | 24/7 Support | DDoS Protection | Instant Setup | Discord Bot Hosting | Game Servers | 99.9% Uptime Guarantee"
        />

        {!isVerified ? (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Security Verification</h2>
                <p className="text-gray-400 text-sm">Please complete the verification below</p>
              </div>

              <TurnstileWidget
                siteKey="0x4AAAAAAB7Ki5eNYbuZOeW_"
                onVerify={handleTurnstileVerify}
                theme="dark"
                className="mb-6"
              />

              {isVerified && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-green-400 font-semibold"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Verified
                </motion.div>
              )}
            </motion.div>
          </div>
        ) : (
          <>
            <Header
              onNavigate={setCurrentPage}
              currentPage={currentPage}
            />

            <div className="min-h-screen relative z-content pt-20">
          {/* Optimized Background - Simplified for performance */}
          <div className="fixed inset-0 z-0 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary"></div>
          
          {/* Animated Background - Reduced on mobile */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-primary-green/5"></div>
            
            {/* Animated grid - disabled on mobile for performance */}
            {!isMobile && (
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 229, 255, 0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 255, 136, 0.15) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 60px',
                  animation: 'grid-move 30s linear infinite'
                }}
              ></div>
            )}

            {/* Reduced gradient orbs - only on desktop */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-cyan/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, 80, 0],
                    y: [0, -80, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </>
            )}
          </div>

          {/* Minimal floating particles - reduced count, desktop only */}
          {!isMobile && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              <motion.div 
                className="absolute top-20 left-[10%] w-2 h-2 bg-primary-cyan/40 rounded-full"
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute top-1/3 right-[15%] w-2 h-2 bg-primary-green/40 rounded-full"
                animate={{
                  y: [20, -20, 20],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary-cyan/40 rounded-full"
                animate={{
                  y: [15, -15, 15],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          )}
              
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

          {/* Global Footer */}
          {currentPage !== 'order-placed' && (
            <Footer onNavigate={setCurrentPage} />
          )}

          {/* Optimized Loading Indicator */}
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
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-primary-cyan rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
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
          </>
        )}
      </CartProvider>
  );
}