import { motion } from "motion/react";
import {
  Heart,
  Shield,
  MessageCircle,
  Server,
  Headphones,
  Zap,
} from "lucide-react";
import logo from "figma:asset/daac52013a2110ce245ba386a3789dfa683f4697.png";

const footerLinks = {
  products: [
    { name: "Minecraft Hosting", page: "pricing-minecraft" },
    { name: "VPS Hosting", page: "pricing-vps" },
    { name: "Bot Hosting", page: "pricing-bots" },
    { name: "All Plans", page: "pricing" },
  ],
  support: [
    { name: "Help Center", page: "support" },
    { name: "Contact Support", page: "support" },
    { name: "Join Discord", href: "https://discord.gg/CKdadBJ6Mv" },
  ],
  company: [
    { name: "About Us", page: "about" },
    { name: "Blog", page: "blog" },
    { name: "Products", page: "products" },
  ],
  legal: [
    { name: "Privacy Policy", page: "privacy-policy" },
    { name: "Terms of Service", page: "terms-of-service" },
    { name: "Cookie Policy", page: "cookie-policy" },
    { name: "SLA Agreement", page: "sla-agreement" },
    { name: "Acceptable Use", page: "acceptable-use" },
  ],
};

const features = [
  { icon: Zap, text: "Instant Setup", color: "primary-cyan" },
  { icon: Shield, text: "DDoS Protection", color: "primary-green" },
  { icon: Server, text: "Global Network", color: "primary-cyan" },
  { icon: Headphones, text: "24/7 Support", color: "primary-green" },
];

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* Glass Morphism Background */}
      <div className="glass border-t-2 border-primary-green/30">
        {/* Top Neon Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-cyan to-transparent opacity-60"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Features Grid Section */}
          <div className="py-12 border-b border-primary-green/20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group"
                >
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-bg-card/50 border-2 border-primary-green/20 hover:border-primary-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-cyan/10">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${
                      feature.color === "primary-cyan" 
                        ? "from-primary-cyan/20 to-primary-cyan/5 border border-primary-cyan/30" 
                        : "from-primary-green/20 to-primary-green/5 border border-primary-green/30"
                    }`}>
                      <feature.icon 
                        className={`w-5 h-5 ${
                          feature.color === "primary-cyan" 
                            ? "text-primary-cyan" 
                            : "text-primary-green"
                        }`} 
                        strokeWidth={2.5} 
                      />
                    </div>
                    <span className="font-bold text-white antialiased">
                      {feature.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Footer Links Grid */}
          <div className="py-16 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Products Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-bold text-primary-cyan mb-6 antialiased" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.3)' }}>
                Products
              </h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => link.page && onNavigate(link.page)}
                      className="text-text-secondary hover:text-primary-green transition-all duration-300 hover:translate-x-1 inline-block antialiased font-medium"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-bold text-primary-cyan mb-6 antialiased" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.3)' }}>
                Support
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    {link.href ? (
                      <button
                        onClick={() => window.open(link.href, '_blank')}
                        className="text-text-secondary hover:text-primary-green transition-all duration-300 hover:translate-x-1 inline-block antialiased font-medium"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <button
                        onClick={() => link.page && onNavigate(link.page)}
                        className="text-text-secondary hover:text-primary-green transition-all duration-300 hover:translate-x-1 inline-block antialiased font-medium"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-bold text-primary-cyan mb-6 antialiased" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.3)' }}>
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => link.page && onNavigate(link.page)}
                      className="text-text-secondary hover:text-primary-green transition-all duration-300 hover:translate-x-1 inline-block antialiased font-medium"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-bold text-primary-cyan mb-6 antialiased" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.3)' }}>
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => link.page && onNavigate(link.page)}
                      className="text-text-secondary hover:text-primary-green transition-all duration-300 hover:translate-x-1 inline-block antialiased font-medium"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="py-8 border-t-2 border-primary-green/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Brand Logo Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <img 
                    src={logo} 
                    alt="DishaGB Logo" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-cyan/50"
                  />
                  <motion.div
                    className="absolute inset-0 bg-primary-cyan/20 rounded-full blur-md -z-10"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white antialiased" style={{ textShadow: '0 0 8px rgba(0, 229, 255, 0.4)' }}>
                    DishaGB Hosting
                  </span>
                  <span className="text-xs text-primary-green font-semibold antialiased">
                    Premium Gaming Solutions
                  </span>
                </div>
              </motion.div>

              {/* Copyright & Made with Love */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <p className="text-text-secondary font-medium antialiased">
                  © {new Date().getFullYear()} DishaGB Hosting. All rights reserved.
                </p>
                <p className="text-xs text-text-muted mt-1.5 flex items-center justify-center gap-1.5 antialiased">
                  Made with 
                  <motion.span
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-3.5 h-3.5 text-primary-green fill-primary-green inline" />
                  </motion.span>
                  by RudraCore
                </p>
              </motion.div>

              {/* Discord Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={() => window.open('https://discord.gg/CKdadBJ6Mv', '_blank')}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-cyan/10 to-primary-green/10 border-2 border-primary-cyan/50 hover:border-primary-cyan hover:shadow-lg hover:shadow-primary-cyan/20 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-5 h-5 text-primary-cyan group-hover:text-primary-green transition-colors duration-300" strokeWidth={2.5} />
                <span className="font-bold text-white antialiased">Join Discord</span>
              </motion.button>
            </div>
          </div>

          {/* Extra Padding at Bottom */}
          <div className="pb-4" />
        </div>

        {/* Bottom Neon Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-green to-transparent opacity-40"></div>
      </div>
    </footer>
  );
}