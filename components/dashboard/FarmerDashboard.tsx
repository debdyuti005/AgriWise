'use client'

import React, { useState, useEffect } from 'react';

// Helper component for SVG icons
const Icon = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 ${className}`}>
    {children}
  </div>
);

// --- SVG Icon Components ---
const BotIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const SoilIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22a2 2 0 0 0 2-2V7l-2-2-2 2v13a2 2 0 0 0 2 2z" />
    <path d="M12 15H8" />
    <path d="M20 14a2 2 0 0 0-2-2h-2v4h2a2 2 0 0 0 2-2z" />
    <path d="M4 14a2 2 0 0 0 2-2h2v4H6a2 2 0 0 0-2-2z" />
  </svg>
);

const WeatherIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.586 0H4a3 3 0 0 0-3 3" />
  </svg>
);

const PestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m13 2 8 8-6 6 4 4-8 8-4-4 6-6-8-8 4-4Z" />
    <path d="m2 22 4-4" />
    <path d="m15 6-4 4" />
  </svg>
);

const MarketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const VoiceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const AnalyticsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    <path d="M22 12A10 10 0 0 0 12 2v10z" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const FeatureCard = ({ icon, title, description, gradient, href }: { icon: React.ReactNode, title: string, description: string, gradient: string, href: string }) => (
  <a href={href} className="flex no-underline text-white">
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20 transition-all duration-300 hover:border-green-300/50 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-2 cursor-pointer w-full flex flex-col">
      <Icon className={gradient}>{icon}</Icon>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm flex-grow">{description}</p>
    </div>
  </a>
);

export function FarmerDashboard() {
  const [currentDate, setCurrentDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-IN', options));
  }, []);

  const features = [
    {
      icon: <BotIcon className="text-cyan-300" />,
      title: "AI-Powered Chatbot",
      description: "Get real-time, location-specific crop advice and solutions with voice support for ease of use.",
      gradient: "from-cyan-500/20 to-blue-500/20",
      href: "/chatbot"
    },
    {
      icon: <SoilIcon className="text-green-300" />,
      title: "Soil Health Analysis",
      description: "Receive comprehensive soil health recommendations and personalized fertilizer guidance.",
      gradient: "from-green-500/20 to-teal-500/20",
      href: "/soil-health"
    },
    {
      icon: <WeatherIcon className="text-blue-300" />,
      title: "Weather Intelligence",
      description: "Advanced weather-based alerts and predictive insights to help you make informed farming decisions.",
      gradient: "from-blue-500/20 to-indigo-500/20",
      href: "/weather"
    },
    {
      icon: <PestIcon className="text-red-300" />,
      title: "Pest & Disease Detection",
      description: "Upload crop images for instant AI-powered pest and disease identification with treatment recommendations.",
      gradient: "from-red-500/20 to-pink-500/20",
      href: "/pest-detection"
    },
    {
      icon: <MarketIcon className="text-yellow-300" />,
      title: "Market Price Tracking",
      description: "Real-time market price updates and trends to help you sell your crops at the best possible prices.",
      gradient: "from-yellow-500/20 to-orange-500/20",
      href: "/market-price"
    },
    {
      icon: <VoiceIcon className="text-purple-300" />,
      title: "Voice Support",
      description: "Complete voice interaction support designed specifically for farmers with limited literacy.",
      gradient: "from-purple-500/20 to-violet-500/20",
      href: "/voice-support"
    },
    {
      icon: <AnalyticsIcon className="text-orange-300" />,
      title: "Analytics Dashboard",
      description: "Comprehensive analytics and insights to track your farming progress and optimize yields.",
      gradient: "from-orange-500/20 to-amber-500/20",
      href: "/analytics"
    },
    {
      icon: <GlobeIcon className="text-teal-300" />,
      title: "Multilingual Support",
      description: "Available in multiple local languages to ensure accessibility for farmers across different regions.",
      gradient: "from-teal-500/20 to-cyan-500/20",
      href: "/language-settings"
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4 sm:p-6 lg:p-8 font-sans">
      {/* --- Header Section --- */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">
          <span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">Welcome, Farmer</span>
        </h1>
        {mounted && currentDate && <p className="text-gray-500 mt-2 text-sm">{currentDate}</p>}
      </header>

      {/* --- Overview Section --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-200">Farm Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <h3 className="text-gray-300 font-semibold">Weather</h3>
            <p className="text-3xl font-bold text-white mt-2">28°C, Sunny</p>
            <p className="text-sm text-blue-300">Howrah, West Bengal</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <h3 className="text-gray-300 font-semibold">Soil Moisture</h3>
            <p className="text-3xl font-bold text-white mt-2">45%</p>
            <p className="text-sm text-green-300">Optimal</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <h3 className="text-gray-300 font-semibold">Active Alerts</h3>
            <p className="text-3xl font-bold text-white mt-2">2</p>
            <p className="text-sm text-yellow-300">Pest warning</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-5 rounded-xl border border-white/20">
            <h3 className="text-gray-300 font-semibold">Next Irrigation</h3>
            <p className="text-3xl font-bold text-white mt-2">2 Days</p>
            <p className="text-sm text-cyan-300">Sept 30, 2025</p>
          </div>
        </div>
      </section>

      {/* --- Core Features Section --- */}
      <main>
        <h2 className="text-2xl font-semibold mb-6 text-gray-200">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              href={feature.href}
            />
          ))}
        </div>
      </main>

      {/* --- AI Assistant Floating Button --- */}
      <button className="fixed bottom-8 right-8 bg-gradient-to-br from-green-400 to-cyan-500 text-white w-16 h-16 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transform transition-transform hover:scale-110 glow-effect">
        <BotIcon className="w-8 h-8" />
        <span className="sr-only">Open AI Assistant</span>
      </button>
    </div>
  );
}