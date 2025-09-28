'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoleSelectionGrid } from '@/components/auth/RoleSelectionGrid'
import { AuthForm } from '@/components/auth/AuthForm'
import { LanguageToggle } from '@/components/auth/LanguageToggle'
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal'

export type UserRole = 'farmer' | 'extension-officer' | 'government' | 'ngo' | 'startup'

export interface RoleInfo {
  id: UserRole
  title: string
  description: string
  icon: string
}

const roles: RoleInfo[] = [
  {
    id: 'farmer',
    title: 'Small & Marginal Farmers',
    description: 'Get crop advisories, schemes, and local market prices.',
    icon: '🌾'
  },
  {
    id: 'extension-officer',
    title: 'Agricultural Extension Officers',
    description: 'Manage farmers, send advisories, plan visits.',
    icon: '🧑‍🏫'
  },
  {
    id: 'government',
    title: 'Government Agriculture Departments',
    description: 'View region-wide analytics & broadcast alerts.',
    icon: '🏛'
  },
  {
    id: 'ngo',
    title: 'NGOs & Cooperatives',
    description: 'Distribute resources, share training, run surveys.',
    icon: '🫂'
  },
  {
    id: 'startup',
    title: 'Agri-Tech Startups',
    description: 'Offer solutions, run pilots, and connect with farmers.',
    icon: '🚀'
  }
]

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleBackToRoles = () => {
    setSelectedRole(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#66BB6A] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FFD54F] opacity-5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#4DD0E1] opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            <div className="flex-1" />
            <div className="flex items-center gap-6">
              <LanguageToggle />
              <button className="text-[#B0BEC5] hover:text-[#4DD0E1] transition-colors duration-300 text-sm">
                Help & Support
              </button>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#66BB6A] via-[#FFD54F] to-[#66BB6A] bg-clip-text text-transparent animate-pulse">
            Welcome to AgriWise
          </h1>
          <p className="text-xl text-[#B0BEC5] max-w-2xl mx-auto">
            {selectedRole ? 'Complete your authentication' : 'Choose your role to get started'}
          </p>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="role-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <RoleSelectionGrid 
                roles={roles}
                onRoleSelect={handleRoleSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <AuthForm 
                selectedRole={selectedRole}
                roles={roles}
                onBackToRoles={handleBackToRoles}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center text-[#B0BEC5] text-sm"
        >
          <div className="flex justify-center items-center gap-6">
            <a href="#" className="hover:text-[#4DD0E1] transition-colors duration-300">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#4DD0E1] transition-colors duration-300">
              Privacy Policy
            </a>
          </div>
        </motion.footer>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  )
}