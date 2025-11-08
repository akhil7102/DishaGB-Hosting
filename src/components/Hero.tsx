import { Rocket, Server, Zap, Shield, TrendingUp, Sparkles, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { QuickActions } from "./QuickActions";
import { HostingOverview } from "./HostingOverview";
import { DataCenters } from "./DataCenters";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <>
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Smooth Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-transparent"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="text-center space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-green/40 bg-primary-green/5 backdrop-blur-sm"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.2)' }}
          >
            <Sparkles className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-semibold text-primary-green">Lightning-Fast Performance</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white heading-glow mb-2">Next-Gen</span>
              <span className="block neon-text-cyan">Game Server</span>
              <span className="block neon-text-green">Hosting</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
              DishaGB — powering the next generation of innovators with ultra-fast, reliable hosting solutions
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              onClick={() => onNavigate('pricing')}
              className="group relative px-8 py-4 bg-gradient-to-r from-primary-cyan to-primary-green text-black font-bold rounded-xl overflow-hidden min-w-[200px]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Rocket size={20} />
                Get Started
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-green to-primary-cyan"
                initial={{ x: '100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => window.open('https://gp.dishagb.shop/', '_blank')}
              className="group px-8 py-4 bg-bg-card/80 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-primary-green/40 hover:border-primary-green min-w-[200px] transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <span className="flex items-center justify-center gap-2">
                <Server size={20} className="text-primary-green" />
                Launch Panel
              </span>
            </motion.button>

            <motion.button
              onClick={() => window.open('https://discord.gg/CKdadBJ6Mv', '_blank')}
              className="group px-8 py-4 bg-bg-card/80 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-primary-cyan/40 hover:border-primary-cyan min-w-[200px] transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
            >
              <span className="flex items-center justify-center gap-2">
                <MessageCircle size={20} className="text-primary-cyan" />
                Join Discord
              </span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-12 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, label: 'Instant Setup', value: '<60s' },
              { icon: Shield, label: 'Uptime', value: '99.9%' },
              { icon: TrendingUp, label: 'Active Servers', value: '10K+' },
              { icon: Server, label: 'Locations', value: '12+' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="glass p-4 sm:p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-primary-green" />
                <div className="text-2xl sm:text-3xl font-bold neon-text-cyan mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-text-muted">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-primary-cyan/20 rounded-full animate-pulse-neon"></div>
      <div className="absolute bottom-1/3 right-16 w-16 h-16 border-2 border-primary-green/20 rounded-lg rotate-45 animate-pulse-neon" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-primary-cyan/20 rounded-full animate-pulse-neon" style={{ animationDelay: '0.5s' }}></div>
    </section>

    {/* Smooth transition to next section */}
    <div className="relative h-20 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-secondary/30"></div>
    </div>

    {/* Quick Actions Section */}
    <QuickActions onNavigate={onNavigate} />

    {/* Smooth transition */}
    <div className="relative h-16 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary/30 via-bg-tertiary/20 to-transparent"></div>
    </div>

    {/* Hosting Overview Section */}
    <HostingOverview onNavigate={onNavigate} />

    {/* Smooth transition */}
    <div className="relative h-16 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/20 to-transparent"></div>
    </div>

    {/* Data Centers Section */}
    <DataCenters />
    
    {/* Smooth transition to footer */}
    <div className="relative h-20 w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-secondary/50"></div>
    </div>
    </>
  );
}
