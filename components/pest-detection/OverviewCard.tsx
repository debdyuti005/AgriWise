'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface OverviewCardProps {
  title: string
  value: string
  icon: ReactNode
  trend: string
  glowColor: 'green' | 'amber' | 'red' | 'blue'
}

const glowClasses = {
  green: 'shadow-[0_0_30px_rgba(102,187,106,0.3)] border-[#66BB6A]/30',
  amber: 'shadow-[0_0_30px_rgba(255,213,79,0.3)] border-[#FFD54F]/30',
  red: 'shadow-[0_0_30px_rgba(229,57,53,0.3)] border-[#E53935]/30',
  blue: 'shadow-[0_0_30px_rgba(77,208,225,0.3)] border-[#4DD0E1]/30'
}

const iconColors = {
  green: 'text-[#66BB6A]',
  amber: 'text-[#FFD54F]',
  red: 'text-[#E53935]',
  blue: 'text-[#4DD0E1]'
}

const trendColors = {
  green: 'text-[#66BB6A]',
  amber: 'text-[#FFD54F]',
  red: 'text-[#E53935]',
  blue: 'text-[#4DD0E1]'
}

export function OverviewCard({ title, value, icon, trend, glowColor }: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: glowColor === 'green' ? '0 0 40px rgba(102,187,106,0.4)' :
                   glowColor === 'amber' ? '0 0 40px rgba(255,213,79,0.4)' :
                   glowColor === 'red' ? '0 0 40px rgba(229,57,53,0.4)' :
                   '0 0 40px rgba(77,208,225,0.4)'
      }}
      className={`glassmorphism-dark p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${glowClasses[glowColor]}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={iconColors[glowColor]}>
          {icon}
        </div>
        <span className={`font-medium text-sm ${trendColors[glowColor]}`}>
          {trend}
        </span>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-[#F5F5F5] text-2xl font-bold">
          {value}
        </h3>
        <p className="text-[#B0BEC5] text-sm">
          {title}
        </p>
      </div>

      {/* Animated background pulse */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute inset-0 rounded-2xl ${
          glowColor === 'green' ? 'bg-gradient-to-br from-[#66BB6A]/10 to-transparent' :
          glowColor === 'amber' ? 'bg-gradient-to-br from-[#FFD54F]/10 to-transparent' :
          glowColor === 'red' ? 'bg-gradient-to-br from-[#E53935]/10 to-transparent' :
          'bg-gradient-to-br from-[#4DD0E1]/10 to-transparent'
        } -z-10`}
      />
    </motion.div>
  )
}