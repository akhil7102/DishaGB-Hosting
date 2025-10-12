import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  ChevronDown,
  MessageCircle
} from "lucide-react";
import { useCart } from "./CartContext";
import logo from "figma:asset/daac52013a2110ce245ba386a3789dfa683f4697.png";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const { items } = useCart();

  // Calculate total items in cart
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsPricingOpen(false);
  }, [currentPage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", page: "home" },
    { 
      name: "Pricing", 
      page: "pricing",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Plans", page: "pricing" },
        { name: "Minecraft Hosting", page: "pricing-minecraft" },
        { name: "VPS Hosting", page: "pricing-vps" },
        { name: "Bot Hosting", page: "pricing-bots" },
      ]
    },
    { name: "Products", page: "products" },
    { name: "Blog", page: "blog" },
    { name: "About", page: "about" },
    { name: "Support", page: "support" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isScrolled 
            ? "glass backdrop-blur-xl border-b border-primary-green/30" 
            : "bg-bg-primary/95 backdrop-blur-md border-b border-primary-green/20"
        }`}
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <motion.button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-3 group relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <img 
                  src={logo} 
                  alt="DishaGB Logo" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-cyan/50 group-hover:border-primary-green transition-colors duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-primary-cyan/20 rounded-full blur-md -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-bold text-white" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.4)' }}>
                  DishaGB
                </span>
                <span className="text-xs font-semibold text-primary-green -mt-1">
                  Hosting
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setIsPricingOpen(true)}
                      onMouseLeave={() => setIsPricingOpen(false)}
                    >
                      <motion.button
                        onClick={() => onNavigate(link.page)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-1 font-semibold ${
                          currentPage === link.page || currentPage.startsWith('pricing')
                            ? "text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/30"
                            : "text-white hover:text-primary-green hover:bg-bg-surface/80 border border-transparent"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{link.name}</span>
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isPricingOpen ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isPricingOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56 glass rounded-xl overflow-hidden border border-primary-green/30"
                          >
                            {link.dropdownItems?.map((item, index) => (
                              <motion.button
                                key={item.name}
                                onClick={() => onNavigate(item.page)}
                                className={`w-full px-4 py-3 text-left transition-all duration-300 font-medium ${
                                  currentPage === item.page
                                    ? "bg-primary-cyan/20 text-primary-cyan"
                                    : "text-text-secondary hover:bg-primary-green/10 hover:text-primary-green"
                                } ${index !== 0 ? "border-t border-primary-green/10" : ""}`}
                                whileHover={{ x: 4 }}
                              >
                                {item.name}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => onNavigate(link.page)}
                      className={`px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                        currentPage === link.page
                          ? "text-primary-cyan bg-primary-cyan/10 border border-primary-cyan/30"
                          : "text-white hover:text-primary-green hover:bg-bg-surface/80 border border-transparent"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{link.name}</span>
                    </motion.button>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              
              {/* Discord Button - Desktop */}
              <motion.button
                onClick={() => window.open('https://discord.gg/CKdadBJ6Mv', '_blank')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border-2 border-primary-cyan/50 hover:bg-primary-cyan/10 hover:border-primary-cyan transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4 text-primary-cyan" strokeWidth={2.5} />
                <span className="text-sm font-bold text-primary-cyan">Discord</span>
              </motion.button>

              {/* Cart Button */}
              <motion.button
                onClick={() => onNavigate("cart")}
                className="relative p-2 rounded-lg bg-bg-card border-2 border-primary-green/50 hover:bg-primary-green/10 hover:border-primary-green transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-5 h-5 text-primary-green" strokeWidth={2.5} />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-cyan to-primary-green rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
                    style={{ lineHeight: '1' }}
                  >
                    <span className="text-xs font-bold text-black">{cartItemCount}</span>
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-bg-card border-2 border-primary-cyan/50 hover:bg-primary-cyan/10 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-primary-cyan" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-6 h-6 text-primary-cyan" strokeWidth={2.5} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-bg-primary/98 backdrop-blur-xl border-l-2 border-primary-green/30 z-[9999] lg:hidden overflow-y-auto shadow-2xl"
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img 
                      src={logo} 
                      alt="DishaGB Logo" 
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary-cyan/50"
                    />
                    <span className="text-lg font-bold text-white" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.4)' }}>
                      DishaGB Hosting
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-bg-card border-2 border-primary-cyan/50 shadow-lg"
                  >
                    <X className="w-5 h-5 text-primary-cyan" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.hasDropdown ? (
                        <div className="space-y-2">
                          <button
                            onClick={() => setIsPricingOpen(!isPricingOpen)}
                            className={`w-full px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-300 ${
                              currentPage.startsWith('pricing')
                                ? "bg-primary-cyan/10 border-2 border-primary-cyan/40"
                                : "bg-bg-card hover:bg-primary-green/10 border-2 border-primary-green/30"
                            }`}
                          >
                            <span className={`font-bold ${
                              currentPage.startsWith('pricing')
                                ? "text-primary-cyan"
                                : "text-white"
                            }`}>{link.name}</span>
                            <ChevronDown 
                              className={`w-4 h-4 transition-transform duration-300 ${
                                isPricingOpen ? "rotate-180" : ""
                              } ${
                                currentPage.startsWith('pricing')
                                  ? "text-primary-cyan"
                                  : "text-white"
                              }`}
                              strokeWidth={2.5}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isPricingOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 space-y-2 overflow-hidden"
                              >
                                {link.dropdownItems?.map((item) => (
                                  <button
                                    key={item.name}
                                    onClick={() => onNavigate(item.page)}
                                    className={`w-full px-4 py-2 rounded-lg text-left transition-all duration-300 font-semibold ${
                                      currentPage === item.page
                                        ? "bg-primary-cyan/10 border border-primary-cyan/30"
                                        : "bg-bg-surface hover:bg-primary-green/10 border border-transparent"
                                    }`}
                                  >
                                    <span className={currentPage === item.page ? "text-primary-cyan" : "text-white"}>{item.name}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate(link.page)}
                          className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                            currentPage === link.page
                              ? "bg-primary-cyan/10 border-2 border-primary-cyan/40"
                              : "bg-bg-card hover:bg-primary-green/10 border-2 border-primary-green/30"
                          }`}
                        >
                          <span className={`font-bold ${
                            currentPage === link.page
                              ? "text-primary-cyan"
                              : "text-white"
                          }`}>{link.name}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Discord Button - Mobile */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                  onClick={() => window.open('https://discord.gg/CKdadBJ6Mv', '_blank')}
                  className="w-full mt-6 px-4 py-4 rounded-xl bg-gradient-to-r from-primary-cyan to-primary-green hover:opacity-90 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-black" strokeWidth={2.5} />
                  <span className="font-bold text-base text-black">Join Discord</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}