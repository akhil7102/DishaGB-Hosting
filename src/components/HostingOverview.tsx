import { motion } from "motion/react";
import { Shield, Zap, Globe, HeadphonesIcon, Lock, TrendingUp } from "lucide-react";

interface HostingOverviewProps {
  onNavigate: (page: string) => void;
}

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "SSD NVMe storage with optimized network routing for minimal latency"
  },
  {
    icon: Shield,
    title: "DDoS Protection",
    description: "Enterprise-grade protection keeping your servers secure 24/7"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "12+ data centers worldwide for optimal performance anywhere"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert support team ready to help you anytime, anywhere"
  },
  {
    icon: Lock,
    title: "Secure Infrastructure",
    description: "Military-grade encryption and regular security audits"
  },
  {
    icon: TrendingUp,
    title: "99.9% Uptime",
    description: "Industry-leading uptime guarantee with SLA-backed promises"
  }
];

export function HostingOverview({ onNavigate }: HostingOverviewProps) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Smooth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-tertiary/40 to-transparent"></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="neon-text-cyan">DishaGB</span>
            <span className="text-white">?</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            We provide enterprise-grade infrastructure with unmatched performance and reliability
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative glass rounded-2xl p-6 sm:p-8 hover:scale-105 transition-all duration-300 border border-primary-green/10 hover:border-primary-green/40"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
            >
              {/* Icon Container */}
              <div className="mb-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-cyan/20 to-primary-green/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-green" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-primary-cyan transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-text-muted group-hover:text-text-secondary transition-colors leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-cyan/0 to-primary-green/0 group-hover:from-primary-cyan/5 group-hover:to-primary-green/5 transition-all duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => onNavigate('pricing')}
            className="px-8 py-4 bg-gradient-to-r from-primary-cyan to-primary-green text-black font-bold rounded-xl"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
          >
            View All Plans
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
