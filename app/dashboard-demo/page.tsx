'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { setUserRole } from '@/components/dashboard/RoleRedirect'
import { 
  Wheat, 
  GraduationCap, 
  Building, 
  Heart, 
  Rocket,
  ArrowRight,
  Users,
  BarChart3,
  MessageSquare
} from 'lucide-react'

const roles = [
  {
    id: 'farmer',
    title: 'Small & Marginal Farmers',
    description: 'Access personalized crop advisories, market prices, weather alerts, and connect with extension officers.',
    icon: Wheat,
    route: '/dashboard/farmer',
    color: '#66BB6A',
    features: ['Crop Health Monitoring', 'Market Price Updates', 'Weather & Pest Alerts', 'Resource Tracking', 'Expert Chat Support']
  },
  {
    id: 'extension-officer',
    title: 'Agricultural Extension Officers',
    description: 'Manage farmer networks, provide guidance, schedule field visits, and track regional analytics.',
    icon: GraduationCap,
    route: '/dashboard/officer',
    color: '#4DD0E1',
    features: ['Farmer Directory', 'Query Management', 'Field Visit Scheduler', 'Knowledge Base', 'Regional Analytics']
  },
  {
    id: 'government',
    title: 'Government Agriculture Dept',
    description: 'Monitor region-wide crop patterns, manage subsidies, and broadcast policy updates.',
    icon: Building,
    route: '/dashboard/govt',
    color: '#FFD54F',
    features: ['Regional Analytics', 'Policy Broadcasting', 'Subsidy Management', 'Officer Oversight', 'Compliance Reports']
  },
  {
    id: 'ngo',
    title: 'NGOs & Cooperatives',
    description: 'Distribute resources, conduct training programs, and track community impact.',
    icon: Heart,
    route: '/dashboard/ngo',
    color: '#E53935',
    features: ['Resource Distribution', 'Training Programs', 'Impact Tracking', 'Community Surveys', 'Collaboration Tools']
  },
  {
    id: 'startup',
    title: 'Agri-Tech Startups',
    description: 'Promote agricultural solutions, run pilot programs, and access farmer insights.',
    icon: Rocket,
    route: '/dashboard/startup',
    color: '#9C27B0',
    features: ['Product Promotion', 'Pilot Programs', 'Farmer Analytics', 'Marketplace Integration', 'Feedback Collection']
  }
]

export default function DashboardDemoPage() {
  const handleRoleSelect = (role: string) => {
    setUserRole(role)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#66BB6A] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FFD54F] opacity-5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#4DD0E1] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#66BB6A] via-[#FFD54F] to-[#4DD0E1] bg-clip-text text-transparent">
            AgriWise Dashboards
          </h1>
          <p className="text-xl text-[#B0BEC5] max-w-3xl mx-auto leading-relaxed">
            Experience role-based dashboards designed for every stakeholder in the agricultural ecosystem. 
            Choose your role to explore personalized features and interfaces.
          </p>
        </motion.div>

        {/* Dashboard Features Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: BarChart3,
              title: 'Real-time Analytics',
              description: 'Live data visualization with interactive charts and trends'
            },
            {
              icon: MessageSquare,
              title: 'Smart Communication',
              description: 'AI-powered chat system with role-specific advisories'
            },
            {
              icon: Users,
              title: 'Collaborative Platform',
              description: 'Connected ecosystem for all agricultural stakeholders'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10 text-center"
            >
              <div className="p-3 bg-[#66BB6A]/20 rounded-xl w-fit mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-[#66BB6A]" />
              </div>
              <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-[#B0BEC5] text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Role Selection Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.8 + (index * 0.1),
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.02,
                y: -8
              }}
              className="glassmorphism-dark p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ 
                  background: `radial-gradient(circle at center, ${role.color}20, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6">
                  <div 
                    className="p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${role.color}20` }}
                  >
                    <role.icon 
                      className="w-8 h-8"
                      style={{ color: role.color }}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-3 group-hover:text-white transition-colors duration-300">
                  {role.title}
                </h3>
                
                <p className="text-[#B0BEC5] text-sm leading-relaxed mb-6 group-hover:text-[#E0E0E0] transition-colors duration-300">
                  {role.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-8">
                  {role.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-[#B0BEC5]">
                      <div 
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: role.color }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {role.features.length > 3 && (
                    <div className="text-xs text-[#B0BEC5] mt-2">
                      +{role.features.length - 3} more features
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Link href={role.route}>
                  <motion.button
                    onClick={() => handleRoleSelect(role.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-medium transition-all duration-300 group/btn"
                    style={{ 
                      background: `linear-gradient(135deg, ${role.color}, ${role.color}CC)`,
                      color: '#0D0D0D'
                    }}
                  >
                    <span>Explore {role.title.split(' ')[0]} Dashboard</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </div>

              {/* Bottom Accent Line */}
              <motion.div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: role.color }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-16"
        >
          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">Ready to Get Started?</h3>
            <p className="text-[#B0BEC5] text-sm mb-4">
              Each dashboard is tailored with role-specific features, analytics, and communication tools.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/auth">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] rounded-xl font-medium"
                >
                  Sign Up Now
                </motion.button>
              </Link>
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white/5 border border-white/10 text-[#F5F5F5] rounded-xl font-medium hover:bg-white/10 transition-colors duration-300"
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}