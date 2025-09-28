'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserRole, RoleInfo } from '@/app/auth/page'

interface AuthFormProps {
  selectedRole: UserRole
  roles: RoleInfo[]
  onBackToRoles: () => void
  onForgotPassword: () => void
}

type AuthMode = 'login' | 'signup'

export function AuthForm({ selectedRole, roles, onBackToRoles, onForgotPassword }: AuthFormProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    useOTP: false
  })

  const selectedRoleInfo = roles.find(role => role.id === selectedRole)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Set user role in localStorage for demo purposes
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', selectedRole)
    }
    
    setIsLoading(false)
    
    // Redirect to appropriate dashboard
    const roleRoutes = {
      'farmer': '/dashboard/farmer',
      'extension-officer': '/dashboard/officer',
      'government': '/dashboard/govt',
      'ngo': '/dashboard/ngo',
      'startup': '/dashboard/startup'
    }
    
    const targetRoute = roleRoutes[selectedRole as keyof typeof roleRoutes]
    if (targetRoute) {
      window.location.href = targetRoute
    }
  }

  const toggleAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'signup' : 'login')
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Selected Role Display */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#66BB6A]/30"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl">{selectedRoleInfo?.icon}</span>
          <div>
            <h3 className="text-[#F5F5F5] font-semibold">{selectedRoleInfo?.title}</h3>
            <button 
              onClick={onBackToRoles}
              className="text-[#4DD0E1] text-sm hover:text-[#66BB6A] transition-colors duration-300"
            >
              Change Role
            </button>
          </div>
        </div>
      </motion.div>

      {/* Auth Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glassmorphism-dark p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* Tab Toggle */}
        <div className="flex mb-8 p-1 bg-white/5 rounded-xl">
          {(['login', 'signup'] as AuthMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setAuthMode(mode)}
              className={`
                flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 capitalize
                ${authMode === mode 
                  ? 'bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] shadow-lg' 
                  : 'text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/5'
                }
              `}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {authMode === 'signup' && (
              <motion.div
                key="fullName"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                  placeholder="Enter your full name"
                  required={authMode === 'signup'}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email/Mobile Toggle for Farmers */}
          {selectedRole === 'farmer' && (
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => handleInputChange('useOTP', false)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${!formData.useOTP 
                    ? 'bg-[#66BB6A] text-[#0D0D0D]' 
                    : 'bg-white/5 text-[#B0BEC5] hover:bg-white/10'
                  }
                `}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('useOTP', true)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${formData.useOTP 
                    ? 'bg-[#66BB6A] text-[#0D0D0D]' 
                    : 'bg-white/5 text-[#B0BEC5] hover:bg-white/10'
                  }
                `}
              >
                Mobile (OTP)
              </button>
            </div>
          )}

          {/* Email/Mobile Input */}
          <div>
            <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
              {formData.useOTP ? 'Mobile Number' : 'Email Address'}
            </label>
            <input
              type={formData.useOTP ? 'tel' : 'email'}
              value={formData.useOTP ? formData.mobile : formData.email}
              onChange={(e) => handleInputChange(formData.useOTP ? 'mobile' : 'email', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
              placeholder={formData.useOTP ? 'Enter your mobile number' : 'Enter your email address'}
              required
            />
          </div>

          {/* Password (not shown for OTP) */}
          {!formData.useOTP && (
            <>
              <div>
                <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                    placeholder="Confirm your password"
                    required
                  />
                </motion.div>
              )}
            </>
          )}

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                className="sr-only"
              />
              <div className={`
                w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300
                ${formData.rememberMe 
                  ? 'bg-[#66BB6A] border-[#66BB6A]' 
                  : 'border-white/30 hover:border-[#66BB6A]/50'
                }
              `}>
                {formData.rememberMe && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-[#B0BEC5] text-sm">Remember me</span>
            </label>

            {authMode === 'login' && !formData.useOTP && (
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-[#4DD0E1] text-sm hover:text-[#66BB6A] transition-colors duration-300"
              >
                Forgot Password?
              </button>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#66BB6A]/25 transition-all duration-300 disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-[#0D0D0D] border-t-transparent rounded-full"
                />
                Processing...
              </div>
            ) : (
              `${authMode === 'login' ? 'Sign In' : 'Sign Up'} as ${selectedRoleInfo?.title}`
            )}
          </motion.button>

          {/* Social Login */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#1A1A1A] text-[#B0BEC5]">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Switch Mode */}
          <div className="text-center">
            <span className="text-[#B0BEC5] text-sm">
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={toggleAuthMode}
              className="ml-2 text-[#4DD0E1] text-sm hover:text-[#66BB6A] transition-colors duration-300 font-medium"
            >
              {authMode === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}