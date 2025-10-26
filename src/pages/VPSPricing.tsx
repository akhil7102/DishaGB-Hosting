import { motion } from "motion/react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Check, Star, Cpu, HardDrive, Network, Globe, ShoppingCart, ArrowLeft, Server, Shield } from "lucide-react";
import { useCart } from "../components/CartContext";
import { useState } from "react";

interface VPSPricingProps {
  onNavigate: (page: string) => void;
}

const ryzenPlans = [
  {
    name: "Ryzen 9 — 4GB",
    price: "₹980",
    ram: "4 GB DDR5 (5200 MHz)",
    cpu: "1 Ryzen vCore",
    storage: "25 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 6GB",
    price: "₹1250",
    ram: "6 GB DDR5 (5200 MHz)",
    cpu: "2 Ryzen vCores",
    storage: "40 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 8GB",
    price: "₹1450",
    ram: "8 GB DDR5 (5200 MHz)",
    cpu: "2 Ryzen vCores",
    storage: "51 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: true
  },
  {
    name: "Ryzen 9 — 12GB",
    price: "₹1750",
    ram: "12 GB DDR5 (5200 MHz)",
    cpu: "3 Ryzen vCores",
    storage: "76 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 16GB",
    price: "₹2250",
    ram: "16 GB DDR5 (5200 MHz)",
    cpu: "4 Ryzen vCores",
    storage: "122 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 24GB",
    price: "₹3150",
    ram: "24 GB DDR5 (5200 MHz)",
    cpu: "6 Ryzen vCores",
    storage: "163 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 32GB",
    price: "₹4050",
    ram: "32 GB DDR5 (5200 MHz)",
    cpu: "6 Ryzen vCores",
    storage: "202 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 45GB",
    price: "₹5850",
    ram: "45 GB DDR5 (5200 MHz)",
    cpu: "8 Ryzen vCores",
    storage: "256 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  },
  {
    name: "Ryzen 9 — 64GB",
    price: "₹7850",
    ram: "64 GB DDR5 (5200 MHz)",
    cpu: "8 Ryzen vCores",
    storage: "307 GB RAID1 NVMe",
    network: "1 Gbit Uplink",
    ip: "1x IPv4, 1x /64 IPv6",
    processor: "AMD Ryzen™ 9 9950X",
    clockSpeed: "4.50 GHz Base",
    uplink: "2x 1 Gbit LACP",
    popular: false
  }
];

const intelPlans = [
  {
    name: "Intel 4GB V2",
    price: "₹550",
    ram: "4 GB DDR4",
    cpu: "2 vCore",
    storage: "40 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 6GB V2",
    price: "₹750",
    ram: "6 GB DDR4",
    cpu: "4 vCore",
    storage: "50 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 8GB V2",
    price: "₹1200",
    ram: "8 GB DDR4",
    cpu: "6 vCore",
    storage: "60 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: true
  },
  {
    name: "Intel 12GB V2",
    price: "₹1400",
    ram: "12 GB DDR4",
    cpu: "6 vCore",
    storage: "100 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 16GB V2",
    price: "₹1555",
    ram: "16 GB DDR4",
    cpu: "7 vCore",
    storage: "140 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 32GB V2",
    price: "₹1850",
    ram: "32 GB DDR4",
    cpu: "8 vCore",
    storage: "240 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 48GB V2",
    price: "₹2010",
    ram: "48 GB DDR4",
    cpu: "12 vCore",
    storage: "240 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  },
  {
    name: "Intel 64GB V2",
    price: "₹2400",
    ram: "64 GB DDR4",
    cpu: "12 vCore",
    storage: "280 GB SSD",
    bandwidth: "1 TB",
    processor: "Intel Xeon E5-2690 V2",
    location: "India — Noida",
    protection: "DDoS Standard Protection",
    popular: false
  }
];

function VPSPlanCard({ plan, type }: { plan: any; type: "ryzen" | "intel" }) {
  const { items, addToCart, updateQuantity } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const existingItem = items.find(item =>
    item.name === plan.name && item.type === "vps"
  );

  const currentQuantity = existingItem?.quantity || 0;

  const handleAddToCart = () => {
    setIsAdding(true);

    const priceNumber = parseFloat(plan.price.replace('₹', '').replace(',', ''));

    const cartItem = {
      name: plan.name,
      price: priceNumber,
      type: "vps" as const,
      details: {
        ram: plan.ram,
        cpu: plan.cpu,
        storage: plan.storage,
        ...(type === "ryzen" ? {
          network: plan.network,
          ip: plan.ip,
          processor: plan.processor,
          clockSpeed: plan.clockSpeed,
          uplink: plan.uplink
        } : {
          bandwidth: plan.bandwidth,
          processor: plan.processor,
          location: plan.location,
          protection: plan.protection
        })
      }
    };

    addToCart(cartItem);

    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleQuantityChange = (change: number) => {
    if (!existingItem) return;

    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      updateQuantity(existingItem.id, 0);
    } else {
      updateQuantity(existingItem.id, newQuantity);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`relative glass cyan-glow hover:orange-glow transition-all duration-300 hover-bounce group h-full flex flex-col ${
        plan.popular ? 'border-primary-orange/60 orange-glow' : 'border-glass-border'
      }`}>
        {plan.popular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-orange text-accent-white animate-pulse-bright">
            <Star className="w-3 h-3 mr-1 text-accent-yellow" />
            Most Popular
          </Badge>
        )}

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-white font-bold text-lg">{plan.name}</CardTitle>
          <div className="text-3xl font-bold text-primary-cyan mb-2">
            {plan.price}<span className="text-lg text-muted-contrast">/month</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 flex-grow">
          <div className="flex items-center text-medium-contrast">
            <HardDrive className="w-4 h-4 text-primary-orange mr-3 flex-shrink-0" />
            <span className="text-sm"><span className="font-medium">RAM:</span> {plan.ram}</span>
          </div>
          <div className="flex items-center text-medium-contrast">
            <Cpu className="w-4 h-4 text-primary-cyan mr-3 flex-shrink-0" />
            <span className="text-sm"><span className="font-medium">CPU:</span> {plan.cpu}</span>
          </div>
          <div className="flex items-center text-medium-contrast">
            <Server className="w-4 h-4 text-primary-cyan mr-3 flex-shrink-0" />
            <span className="text-sm"><span className="font-medium">Storage:</span> {plan.storage}</span>
          </div>

          {type === "ryzen" ? (
            <>
              <div className="flex items-center text-medium-contrast">
                <Network className="w-4 h-4 text-accent-yellow mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">Network:</span> {plan.network}</span>
              </div>
              <div className="flex items-center text-medium-contrast">
                <Globe className="w-4 h-4 text-primary-cyan mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">IP:</span> {plan.ip}</span>
              </div>
              <div className="pt-2 border-t border-glass-border space-y-2">
                <div className="text-xs text-medium-contrast">
                  <span className="font-semibold text-primary-orange">Processor:</span> {plan.processor}
                </div>
                <div className="text-xs text-medium-contrast">
                  <span className="font-semibold text-primary-cyan">Clock:</span> {plan.clockSpeed}
                </div>
                <div className="text-xs text-medium-contrast">
                  <span className="font-semibold text-accent-yellow">Uplink:</span> {plan.uplink}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center text-medium-contrast">
                <Network className="w-4 h-4 text-accent-yellow mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">Bandwidth:</span> {plan.bandwidth}</span>
              </div>
              <div className="flex items-center text-medium-contrast">
                <Cpu className="w-4 h-4 text-primary-orange mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">Processor:</span> {plan.processor}</span>
              </div>
              <div className="flex items-center text-medium-contrast">
                <Globe className="w-4 h-4 text-primary-cyan mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">Location:</span> {plan.location}</span>
              </div>
              <div className="flex items-center text-medium-contrast">
                <Shield className="w-4 h-4 text-accent-yellow mr-3 flex-shrink-0" />
                <span className="text-sm"><span className="font-medium">Protection:</span> {plan.protection}</span>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter>
          {currentQuantity > 0 ? (
            <div className="w-full flex items-center justify-center space-x-4">
              <motion.button
                onClick={() => handleQuantityChange(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary-red hover:bg-dark-red text-white flex items-center justify-center transition-all duration-200 font-bold text-lg"
              >
                -
              </motion.button>

              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-primary-cyan">{currentQuantity}</span>
                <span className="text-xs text-text-muted">in cart</span>
              </div>

              <motion.button
                onClick={() => handleQuantityChange(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-primary-cyan hover:bg-primary-cyan/80 text-white flex items-center justify-center transition-all duration-200 font-bold text-lg"
              >
                +
              </motion.button>
            </div>
          ) : (
            <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full transition-all duration-300 font-medium hover-glow ${
                  plan.popular
                    ? 'bg-gradient-to-r from-primary-cyan to-primary-green text-black border-2 border-primary-cyan/50'
                    : 'bg-primary-cyan hover:bg-primary-cyan/80 text-black border-2 border-primary-cyan/30'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function VPSPricing({ onNavigate }: VPSPricingProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-bg-primary relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/5 via-transparent to-primary-cyan/5"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button
            onClick={() => onNavigate("pricing")}
            variant="outline"
            className="border-primary-orange/30 text-primary-orange hover:bg-primary-orange/10 hover:border-primary-orange"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🖥️ <span className="heading-glow">VPS Hosting</span> <span className="text-white">Plans</span>
          </h1>
          <p className="text-medium-contrast text-lg max-w-3xl mx-auto">
            High-performance Virtual Private Servers powered by AMD Ryzen 9 9950X and Intel Xeon processors.
            Enterprise-grade infrastructure with DDoS protection and 24/7 support.
          </p>
        </motion.div>

        <Tabs defaultValue="ryzen" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-12 glass border border-glass-border max-w-md mx-auto">
              <TabsTrigger value="ryzen" className="text-medium-contrast data-[state=active]:bg-primary-orange data-[state=active]:text-accent-white transition-all duration-300 font-medium">
                🚀 Ryzen VPS
              </TabsTrigger>
              <TabsTrigger value="intel" className="text-medium-contrast data-[state=active]:bg-primary-cyan data-[state=active]:text-accent-white transition-all duration-300 font-medium">
                ⚡ Intel VPS
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="ryzen">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-orange mb-4">🚀 AMD Ryzen 9 9950X VPS Plans</h2>
              <p className="text-medium-contrast">Cutting-edge performance with DDR5 memory and RAID1 NVMe storage for maximum speed and reliability.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ryzenPlans.map((plan, index) => (
                <VPSPlanCard key={index} plan={plan} type="ryzen" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intel">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary-cyan mb-4">⚡ Intel Xeon E5-2690 V2 VPS Plans</h2>
              <p className="text-medium-contrast">Reliable and affordable VPS hosting with DDoS protection, hosted in India — Noida datacenter.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {intelPlans.map((plan, index) => (
                <VPSPlanCard key={index} plan={plan} type="intel" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 glass p-8 rounded-2xl border border-glass-border hover:orange-glow transition-all duration-300"
        >
          <h3 className="text-2xl font-bold text-high-contrast mb-4">
            Why Choose <span className="text-accent-yellow">DishaGB VPS?</span>
          </h3>
          <p className="text-medium-contrast mb-6 max-w-2xl mx-auto">
            Enterprise-grade VPS hosting with <span className="text-primary-orange font-medium">cutting-edge hardware</span> and
            unmatched support. Perfect for applications, websites, and game servers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-medium-contrast">
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-accent-yellow mb-2" />
              <span className="font-medium">Full Root Access</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-primary-cyan mb-2" />
              <span className="font-medium">99.9% Uptime</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-primary-orange mb-2" />
              <span className="font-medium">DDoS Protection</span>
            </div>
            <div className="flex flex-col items-center">
              <Check className="w-6 h-6 text-accent-yellow mb-2" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 glass p-8 rounded-2xl border border-primary-cyan/30"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Need Help Choosing the Right VPS?
          </h3>
          <p className="text-medium-contrast mb-6">
            Join our Discord community for expert guidance and instant support
          </p>
          <motion.button
            onClick={() => window.open('https://discord.gg/bdeKpxwEnj', '_blank')}
            className="px-8 py-3 bg-gradient-to-r from-primary-cyan to-primary-green text-black font-bold rounded-lg hover:opacity-90 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Discord Server
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
