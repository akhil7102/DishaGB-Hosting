import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { useCart } from "../components/CartContext";
import { 
  ArrowLeft, 
  CheckCircle2, 
  QrCode,
  Building2,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { createCustomerOrder, saveOrderToLocalStorage, isSupabaseConfigured } from "../utils/supabase/client";
import upiQrCode from "figma:asset/bd8f8910988bd994953f2a8adc0004baa259027a.png";

interface BillingProps {
  onNavigate: (page: string) => void;
}

export function Billing({ onNavigate }: BillingProps) {
  const { items, getCartTotal, getCartCount, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'billing' | 'payment'>('billing');
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: ""
  });

  // UPI Payment Details
  const UPI_ID = "dishagb@ybl";

  // Auto redirect after success
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        clearCart();
        onNavigate('home');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, clearCart, onNavigate]);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paymentStep]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      toast.success("UPI ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy UPI ID");
    }
  };

  const handleProceedToPayment = () => {
    // Validation
    const requiredFields = ['fullName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Phone validation (basic check)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setPaymentStep('payment');
    toast.success("Proceed to payment! Scan the QR code or use the UPI ID below.");
  };

  const handlePaymentComplete = async () => {
    setIsProcessing(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: "",
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          type: item.type,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: finalTotal,
        notes: formData.discordId ? `Discord ID: ${formData.discordId}` : undefined
      };

      // Save to Supabase
      const configured = isSupabaseConfigured();
      
      if (configured) {
        const { data, error } = await createCustomerOrder(orderData);
        
        if (error) {
          saveOrderToLocalStorage(orderData);
        }
      } else {
        saveOrderToLocalStorage(orderData);
      }
      
      // Show success modal
      setIsProcessing(false);
      setShowSuccess(true);
      
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
      setIsProcessing(false);
    }
  };

  const total = getCartTotal();
  const finalTotal = total; // No GST, No setup fee

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-bg-primary py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="w-20 h-20 text-primary-cyan mx-auto mb-6 opacity-50" />
          <h1 className="text-4xl text-high-contrast mb-4">No Items to Checkout</h1>
          <p className="text-muted-contrast text-lg mb-8">
            Your cart is empty. Add some hosting services to proceed with billing.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={() => onNavigate('pricing')}
              className="bg-gradient-to-r from-primary-cyan to-primary-green text-black px-8 py-3 border-2 border-primary-cyan/50"
            >
              Browse Hosting Plans
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-bg-primary py-8 md:py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header - Compact */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center mb-3">
              <button 
                onClick={() => onNavigate('cart')}
                className="flex items-center text-primary-cyan hover:text-primary-green transition-colors mr-4 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Cart
              </button>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="heading-glow">
                {paymentStep === 'billing' ? 'Billing Information' : 'Complete Payment'}
              </span>
            </h1>
            
            {/* Checkout Flow Indicator */}
            <div className="flex items-center justify-center space-x-3 text-xs text-muted-contrast">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-green flex items-center justify-center text-black border border-primary-green/50">
                  ✓
                </div>
                <span className="ml-1 text-primary-green">Cart</span>
              </div>
              <div className="w-6 h-0.5 bg-primary-cyan"></div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-primary-cyan flex items-center justify-center text-black border border-primary-cyan/50">
                  {paymentStep === 'billing' ? '2' : '✓'}
                </div>
                <span className="ml-1 text-primary-cyan">Billing</span>
              </div>
              <div className={`w-6 h-0.5 ${paymentStep === 'payment' ? 'bg-primary-green' : 'bg-text-dim'}`}></div>
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${ 
                  paymentStep === 'payment' 
                    ? 'bg-primary-green text-black border-primary-green/50' 
                    : 'bg-bg-surface text-text-dim border-text-dim'
                }`}>
                  3
                </div>
                <span className={`ml-1 ${paymentStep === 'payment' ? 'text-primary-green' : 'text-text-dim'}`}>
                  Payment
                </span>
              </div>
            </div>
          </motion.div>

          {/* Important Notice - Compact */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <div className="glass p-4 rounded-xl border border-primary-green/60 green-glow">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-green rounded-full flex items-center justify-center shadow-lg border border-primary-cyan/50">
                    <AlertCircle className="text-black w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-primary-green text-base mb-1 font-semibold">⚡ Important Notice</h3>
                  <p className="text-high-contrast text-sm leading-relaxed">
                    <strong className="text-primary-green">Fill correctly.</strong> Your order will be delivered <strong className="text-primary-cyan">digitally</strong> to these details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Section - Billing Form or Payment */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              {paymentStep === 'billing' ? (
                <motion.div
                  key="billing-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass cyan-glow hover:green-glow transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-high-contrast text-lg flex items-center">
                        <Building2 className="w-5 h-5 mr-2 text-primary-cyan" />
                        Billing Information
                      </CardTitle>
                      <p className="text-muted-contrast text-xs">
                        Please provide your details for digital service delivery
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">

                      {/* Full Name */}
                      <div>
                        <Label htmlFor="fullName" className="text-medium-contrast flex items-center mb-1.5">
                          <span>Full Name</span>
                          <span className="text-primary-green ml-1 text-xs">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Enter your full name"
                          className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="text-medium-contrast flex items-center mb-1.5">
                          <span>Email Address</span>
                          <span className="text-primary-green ml-1 text-xs">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <Label htmlFor="phone" className="text-medium-contrast flex items-center mb-1.5">
                          <span>Phone Number</span>
                          <span className="text-primary-green ml-1 text-xs">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                          required
                        />
                      </div>

                      {/* Discord ID (Optional) */}
                      <div>
                        <Label htmlFor="discordId" className="text-medium-contrast flex items-center mb-1.5">
                          <span>Discord ID</span>
                          <span className="text-text-dim ml-1 text-xs">(Optional)</span>
                        </Label>
                        <Input
                          id="discordId"
                          value={formData.discordId}
                          onChange={(e) => handleInputChange('discordId', e.target.value)}
                          placeholder="username#1234"
                          className="bg-bg-surface border-primary-cyan/30 text-high-contrast placeholder-text-dim focus:border-primary-cyan focus:ring-2 focus:ring-primary-cyan/20 transition-all duration-300"
                        />
                      </div>

                      {/* Next Button */}
                      <div className="pt-4">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            onClick={handleProceedToPayment}
                            className="bg-gradient-to-r from-primary-cyan to-primary-green text-black w-full py-3 border-2 border-primary-cyan/50"
                          >
                            Proceed to Payment →
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="payment-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="glass green-glow transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-high-contrast text-lg flex items-center">
                        <QrCode className="w-5 h-5 mr-2 text-primary-green" />
                        UPI Payment
                      </CardTitle>
                      <p className="text-muted-contrast text-xs">
                        Scan the QR code or use the UPI ID to complete your payment
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* QR Code - Compact */}
                      <div className="text-center">
                        <div className="glass p-4 rounded-xl inline-block cyan-glow">
                          <img 
                            src={upiQrCode} 
                            alt="UPI QR Code" 
                            className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-lg"
                          />
                        </div>
                        <p className="text-muted-contrast text-xs mt-2">
                          Scan with any UPI app
                        </p>
                      </div>

                      {/* UPI ID - Compact */}
                      <div className="glass p-4 rounded-xl cyan-glow">
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <Label className="text-medium-contrast text-xs mb-1 block">UPI ID:</Label>
                            <p className="text-primary-cyan font-mono text-lg md:text-xl font-bold truncate">{UPI_ID}</p>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              onClick={handleCopyUPI}
                              size="sm"
                              className="bg-primary-cyan hover:bg-electric-blue text-black border border-primary-cyan/50"
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Payment Amount - Compact */}
                      <div className="glass p-3 rounded-xl green-glow text-center">
                        <Label className="text-medium-contrast text-xs">Amount to Pay:</Label>
                        <p className="text-2xl md:text-3xl font-bold text-white">₹{finalTotal.toLocaleString()}</p>
                      </div>

                      {/* Payment Instructions - Compact */}
                      <div className="space-y-2">
                        <h4 className="text-medium-contrast text-sm">Payment Steps:</h4>
                        <div className="space-y-1.5 text-xs text-muted-contrast">
                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-primary-cyan text-black rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0 border border-primary-cyan/50">1</span>
                            <span>Scan QR or copy UPI ID</span>
                          </div>
                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-primary-cyan text-black rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0 border border-primary-cyan/50">2</span>
                            <span>Make payment via UPI app</span>
                          </div>
                          <div className="flex items-start">
                            <span className="w-5 h-5 bg-primary-cyan text-black rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0 border border-primary-cyan/50">3</span>
                            <span>Click "Payment Completed"</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Complete Button */}
                      <div className="pt-3">
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            onClick={handlePaymentComplete}
                            disabled={isProcessing}
                            className="bg-gradient-to-r from-primary-cyan to-primary-green text-black w-full py-3 border-2 border-primary-green/50"
                          >
                            {isProcessing ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                                Submitting...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                Payment Completed
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Section - Order Summary */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="glass cyan-glow lg:sticky lg:top-20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-high-contrast text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* Items List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-medium-contrast text-xs truncate">{item.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge className="bg-primary-cyan/20 text-primary-cyan text-[10px] border border-primary-cyan/30 px-1.5 py-0">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </Badge>
                              <p className="text-text-dim text-[10px]">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-primary-cyan text-xs flex-shrink-0">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>

                    <hr className="border-primary-cyan/20" />

                    {/* Price Breakdown - No GST */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-medium-contrast text-sm">
                        <span>Subtotal ({getCartCount()} {getCartCount() === 1 ? 'item' : 'items'})</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                      <hr className="border-primary-cyan/20" />
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-primary-cyan text-lg">
                          ₹{finalTotal.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Trust Indicators - Compact */}
                    <div className="glass p-3 rounded-lg green-glow mt-3">
                      <h4 className="text-primary-green text-xs mb-2 text-center">Why DishaGB?</h4>
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] text-muted-contrast">
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-green rounded-full mr-1.5 animate-pulse"></span>
                          99.9% Uptime
                        </div>
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full mr-1.5 animate-pulse"></span>
                          24/7 Support
                        </div>
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-green rounded-full mr-1.5 animate-pulse"></span>
                          30-Day Refund
                        </div>
                        <div className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full mr-1.5 animate-pulse"></span>
                          Free Migration
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100000] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="glass cyan-glow max-w-md w-full p-6 md:p-8 rounded-2xl border-2 border-primary-green relative overflow-hidden"
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary-cyan rounded-full"
                    initial={{ opacity: 0, x: Math.random() * 400 - 200, y: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: -200,
                      x: Math.random() * 100 - 50
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity
                    }}
                  />
                ))}
              </div>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 255, 136, 0.5)",
                        "0 0 40px rgba(0, 255, 136, 0.8)",
                        "0 0 20px rgba(0, 255, 136, 0.5)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 bg-primary-green rounded-full flex items-center justify-center border-4 border-primary-cyan"
                  >
                    <CheckCircle className="w-14 h-14 text-black" strokeWidth={3} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-4"
              >
                <h2 className="text-3xl font-bold text-high-contrast">
                  Order Placed Successfully!
                </h2>
                <div className="space-y-2">
                  <p className="text-primary-green text-lg font-semibold">
                    ✅ Waiting for admin to accept
                  </p>
                  <p className="text-medium-contrast">
                    Your order has been submitted successfully. Our admin team will review and accept your order shortly.
                  </p>
                </div>

                {/* Redirect Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <p className="text-text-muted text-sm">
                    Redirecting to home page in <span className="text-primary-cyan font-bold">5</span> seconds...
                  </p>
                  <motion.div 
                    className="w-full h-1 bg-bg-surface rounded-full mt-2 overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-cyan to-primary-green"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </motion.div>
                </motion.div>

                {/* Manual Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <Button
                    onClick={() => {
                      clearCart();
                      onNavigate('home');
                    }}
                    className="bg-gradient-to-r from-primary-cyan to-primary-green text-black border-2 border-primary-cyan/50"
                  >
                    Go to Home Now
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
