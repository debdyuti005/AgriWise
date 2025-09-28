'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AuthDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#66BB6A] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FFD54F] opacity-5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#4DD0E1] opacity-5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        {/* Hero Section */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#66BB6A] via-[#FFD54F] to-[#66BB6A] bg-clip-text text-transparent"
        >
          AgriWise Auth
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-[#B0BEC5] mb-12 leading-relaxed"
        >
          Experience the future of agricultural authentication with our role-based system
        </motion.p>

        {/* Demo Features Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: '🌾',
              title: 'Multi-Role Support',
              description: 'Farmers, Extension Officers, Government, NGOs, and Startups'
            },
            {
              icon: '🎨',
              title: 'Glassmorphism UI',
              description: 'Modern dark theme with glassmorphism effects and glow animations'
            },
            {
              icon: '🌍',
              title: 'Multilingual',
              description: 'Support for 8+ languages including Hindi, Bengali, Tamil, and more'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.2), duration: 0.6 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10 hover:border-[#66BB6A]/30 transition-all duration-300 group hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-[#F5F5F5] font-bold text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-[#B0BEC5] text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/auth">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(102, 187, 106, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] font-bold rounded-xl shadow-lg transition-all duration-300 text-lg"
            >
              Try Authentication Demo
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-[#F5F5F5] font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
            >
              Back to Home
            </motion.button>
          </Link>
        </motion.div>

        {/* Features List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16 text-left max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-[#F5F5F5] mb-6 text-center">
            Authentication Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#B0BEC5]">
            {[
              'Role-based access control',
              'OTP authentication for farmers',
              'Multi-language support',
              'Forgot password functionality',
              'Social login integration',
              'Responsive glassmorphism design',
              'Smooth animations with Framer Motion',
              'Dark theme with gradient accents'
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + (index * 0.1), duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-[#66BB6A] rounded-full flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}