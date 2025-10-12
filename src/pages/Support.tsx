import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  FileText, 
  Search,
  HelpCircle,
  Book,
  Settings,
  Shield
} from "lucide-react";
import { useState } from "react";

const supportCategories = [
  {
    icon: Settings,
    title: "Server Setup",
    description: "Get help setting up your Minecraft server",
    articles: 12
  },
  {
    icon: Shield,
    title: "Security & DDoS",
    description: "Learn about our protection features",
    articles: 8
  },
  {
    icon: Book,
    title: "Plugin Management",
    description: "Installing and managing server plugins",
    articles: 15
  },
  {
    icon: HelpCircle,
    title: "Troubleshooting",
    description: "Common issues and their solutions",
    articles: 20
  }
];

const faqs = [
  {
    question: "How quickly can I get my server running?",
    answer: "Your server will be ready in under 60 seconds after payment confirmation. Our automated system provisions resources instantly."
  },
  {
    question: "Do you provide automatic backups?",
    answer: "Yes! We create automatic daily backups of your server data. You can also create manual backups anytime through your control panel."
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! You can change your hosting plan at any time. Upgrades are instant, and downgrades take effect at your next billing cycle."
  },
  {
    question: "What Minecraft versions do you support?",
    answer: "We support all Minecraft versions from 1.8 to the latest release, including snapshots. You can easily switch versions through your control panel."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with our service, contact us within 7 days for a full refund."
  }
];

export function Support() {

  return (
    <>
      <div className="min-h-screen pt-4">
      {/* Header */}
      <section className="relative py-12 overflow-hidden">
        {/* Smooth Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold heading-glow mb-4">
              How can we help you?
            </h1>
            <p className="text-medium-contrast max-w-2xl mx-auto mb-8">
              Get the support you need to make the most of your Minecraft server
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-green w-5 h-5" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 bg-bg-surface border-primary-green/30 text-white placeholder-text-muted focus:border-primary-cyan"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="relative py-16">
        {/* Smooth Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-cyan mb-4">
              Get Support
            </h2>
            <p className="text-medium-contrast">
              Choose the best way to reach our expert team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email Support */}
            <Card className="glass border-primary-cyan/30 hover:border-primary-cyan/60 transition-colors card-hover">
              <CardHeader className="text-center">
                <Mail className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
                <CardTitle className="text-white">Email Support</CardTitle>
                <p className="text-text-muted text-sm">Get detailed help via email</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary-cyan mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Response within 2 hours</span>
                </div>
                <div className="mb-4">
                  <a 
                    href="mailto:support@dishagb.shop" 
                    className="text-primary-cyan hover:text-primary-green transition-colors"
                  >
                    support@dishagb.shop
                  </a>
                </div>
                <Button 
                  onClick={() => window.location.href = 'mailto:support@dishagb.shop'}
                  className="w-full bg-gradient-to-r from-primary-cyan to-primary-green text-black hover:opacity-90"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* Discord Support */}
            <Card className="glass border-primary-green/30 hover:border-primary-green/60 transition-colors card-hover">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 text-primary-green mx-auto mb-4" />
                <CardTitle className="text-white">Discord Support</CardTitle>
                <p className="text-text-muted text-sm">Join our community for instant help</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary-green mb-4">
                  <div className="w-2 h-2 bg-primary-green rounded-full animate-pulse"></div>
                  <span className="text-sm">Online now</span>
                </div>
                <Button 
                  onClick={() => window.open('https://discord.gg/CKdadBJ6Mv', '_blank')}
                  className="w-full bg-gradient-to-r from-primary-cyan to-primary-green text-black hover:opacity-90"
                >
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Knowledge Base */}
      <section className="relative py-16">
        {/* Smooth Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-tertiary/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-cyan mb-4">
              Knowledge Base
            </h2>
            <p className="text-medium-contrast">
              Find answers to common questions and learn about our features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="glass border-primary-green/30 hover:border-primary-green/60 transition-colors cursor-pointer card-hover">
                  <CardHeader>
                    <IconComponent className="w-8 h-8 text-primary-green mb-3" />
                    <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                    <p className="text-text-muted text-sm">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-dim">{category.articles} articles</span>
                      <FileText className="w-4 h-4 text-text-dim" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16">
        {/* Smooth Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/50 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-cyan mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-medium-contrast">
              Quick answers to the most common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass border-primary-cyan/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-3">{faq.question}</h3>
                  <p className="text-text-muted leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}