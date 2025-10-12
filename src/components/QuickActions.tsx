import { motion } from "motion/react";
import { Server, Bot, Cloud, Code, Gamepad2, Cpu } from "lucide-react";

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

const services = [
  {
    icon: Gamepad2,
    title: "Minecraft Hosting",
    description: "Optimized servers for Bedrock & Java Edition",
    page: "pricing-minecraft",
    gradient: "from-primary-cyan to-primary-green",
  },
  {
    icon: Cloud,
    title: "VPS Hosting",
    description: "Scalable virtual private servers worldwide",
    page: "pricing-vps",
    gradient: "from-primary-green to-primary-cyan",
  },
  {
    icon: Bot,
    title: "Bot Hosting",
    description: "24/7 hosting for Discord & Telegram bots",
    page: "pricing-bots",
    gradient: "from-primary-cyan to-accent-purple",
  },
];

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <section className="relative py-20 sm:py-24">
      {/* Smooth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/30 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Choose Your </span>
            <span className="neon-text-green">Perfect Plan</span>
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Industry-leading performance with enterprise-grade infrastructure
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => onNavigate(service.page)}
              className="group relative glass rounded-2xl p-6 sm:p-8 cursor-pointer overflow-hidden border border-primary-green/20 hover:border-primary-green/50 transition-all duration-500"
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-bg-card rounded-2xl flex items-center justify-center">
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-primary-green" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-primary-cyan transition-colors">
                  {service.title}
                </h3>
                <p className="text-text-muted group-hover:text-text-secondary transition-colors">
                  {service.description}
                </p>

                {/* Arrow Indicator */}
                <div className="mt-6 flex items-center gap-2 text-primary-green font-semibold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span>Explore Plans</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-green/5 rounded-full blur-3xl group-hover:bg-primary-green/10 transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-text-muted mb-4">Need something custom?</p>
          <motion.button
            onClick={() => onNavigate('support')}
            className="px-6 py-3 border-2 border-primary-cyan/40 hover:border-primary-cyan text-primary-cyan rounded-xl font-semibold hover:bg-primary-cyan/5 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
