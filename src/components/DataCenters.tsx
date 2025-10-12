import { motion } from "motion/react";
import { MapPin, Wifi, Gauge } from "lucide-react";

const locations = [



  { name: "india", city: "Noida", ping: "32ms" },
  { name: "India", city: "Mumbai", ping: "28ms" },
  { name: "india", city: "Kolkata", ping: "29ms" },
 

];

export function DataCenters() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Smooth Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent"></div>
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-cyan/5 via-transparent to-primary-green/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-green">Nodes </span>
            
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
            Lightning-fast servers across the globe for optimal performance
          </p>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {locations.map((location, index) => (
            <motion.div
              key={location.city}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-5 border border-primary-green/20 hover:border-primary-cyan/40 transition-all duration-300 group"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary-green/10 group-hover:bg-primary-cyan/10 transition-colors">
                    <MapPin className="w-4 h-4 text-primary-green group-hover:text-primary-cyan transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{location.city}</h3>
                    <p className="text-xs text-text-muted">{location.name}</p>
                  </div>
                </div>
                
                {/* Ping Badge */}
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary-green/10 border border-primary-green/30">
                  <Gauge className="w-3 h-3 text-primary-green" />
                  <span className="text-xs font-bold text-primary-green">{location.ping}</span>
                </div>
              </div>
              
              {/* Status Indicator */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary-green/10">
                <div className="w-2 h-2 rounded-full bg-primary-green animate-pulse-neon"></div>
                <span className="text-xs text-text-muted">Online & Ready</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 sm:p-12 border border-primary-green/20"
          style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Wifi className="w-6 h-6 text-primary-cyan" />
                <div className="text-4xl sm:text-5xl font-bold neon-text-cyan">12+</div>
              </div>
              <p className="text-text-secondary font-semibold">Data Centers</p>
              <p className="text-sm text-text-muted mt-1">Worldwide Coverage</p>
            </div>
            
            <div className="text-center border-l border-r border-primary-green/20 px-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gauge className="w-6 h-6 text-primary-green" />
                <div className="text-4xl sm:text-5xl font-bold neon-text-green">{"<"}10ms</div>
              </div>
              <p className="text-text-secondary font-semibold">Avg Latency</p>
              <p className="text-sm text-text-muted mt-1">Lightning Fast</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="w-6 h-6 text-accent-purple" />
                <div className="text-4xl sm:text-5xl font-bold text-white">100%</div>
              </div>
              <p className="text-text-secondary font-semibold">Network Uptime</p>
              <p className="text-sm text-text-muted mt-1">Always Available</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
