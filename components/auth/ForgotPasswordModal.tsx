'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSuccess(true)
    
    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false)
      setEmail('')
      onClose()
    }, 3000)
  }

  const handleClose = () => {
    if (!isLoading) {
      setEmail('')
      setIsSuccess(false)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl font-bold text-[#F5F5F5]"
                >
                  Reset Password
                </motion.h2>
                <motion.button
                  onClick={handleClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center text-[#B0BEC5] hover:text-[#E53935] transition-colors duration-300"
                  disabled={isLoading}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <p className="text-[#B0BEC5] mb-6 leading-relaxed">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-[#F5F5F5] text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                          placeholder="Enter your email address"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          type="button"
                          onClick={handleClose}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-[#B0BEC5] hover:bg-white/10 hover:text-[#F5F5F5] transition-all duration-300"
                          disabled={isLoading}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 py-3 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] font-bold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#66BB6A]/25 transition-all duration-300 disabled:opacity-70"
                          disabled={isLoading || !email}
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-[#0D0D0D] border-t-transparent rounded-full"
                              />
                              Sending...
                            </div>
                          ) : (
                            'Send Reset Link'
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-4"
                  >
                    {/* Success Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-full flex items-center justify-center"
                    >
                      <svg className="w-8 h-8 text-[#0D0D0D]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>

                    <h3 className="text-xl font-bold text-[#F5F5F5] mb-2">
                      Reset Link Sent!
                    </h3>
                    <p className="text-[#B0BEC5] mb-6">
                      We've sent a password reset link to <span className="text-[#66BB6A] font-medium">{email}</span>
                    </p>

                    {/* Auto-close indicator */}
                    <div className="flex items-center justify-center gap-2 text-sm text-[#B0BEC5]">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-[#66BB6A] border-t-transparent rounded-full"
                      />
                      Closing automatically...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#66BB6A] via-[#FFD54F] to-[#4DD0E1] rounded-b-3xl" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}