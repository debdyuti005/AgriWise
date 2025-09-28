'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface OverviewCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'secondary' | 'accent' | 'danger'
  onClick?: () => void
}

const colorClasses = {
  primary: {
    bg: 'from-[#66BB6A]/20 to-[#66BB6A]/5',
    border: 'border-[#66BB6A]/30',
    icon: 'text-[#66BB6A]',
    glow: 'shadow-[#66BB6A]/20'
  },
  secondary: {
    bg: 'from-[#FFD54F]/20 to-[#FFD54F]/5',
    border: 'border-[#FFD54F]/30',
    icon: 'text-[#FFD54F]',
    glow: 'shadow-[#FFD54F]/20'
  },
  accent: {
    bg: 'from-[#4DD0E1]/20 to-[#4DD0E1]/5',
    border: 'border-[#4DD0E1]/30',
    icon: 'text-[#4DD0E1]',
    glow: 'shadow-[#4DD0E1]/20'
  },
  danger: {
    bg: 'from-[#E53935]/20 to-[#E53935]/5',
    border: 'border-[#E53935]/30',
    icon: 'text-[#E53935]',
    glow: 'shadow-[#E53935]/20'
  }
}

export function OverviewCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  color = 'primary',
  onClick 
}: OverviewCardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: `0 8px 30px ${colors.glow.replace('/20', '/30')}`
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative p-6 rounded-2xl glassmorphism-dark border cursor-pointer
        transition-all duration-300 group
        bg-gradient-to-br ${colors.bg}
        ${colors.border} hover:${colors.border.replace('/30', '/50')}
        hover:shadow-xl ${colors.glow}
      `}
    >
      {/* Background Glow Effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
        bg-gradient-to-br ${colors.bg} transition-opacity duration-500
      `} />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`
            p-3 rounded-xl bg-white/5 ${colors.icon}
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon size={24} />
          </div>
          
          {trend && (
            <div className={`
              flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium
              ${trend.isPositive 
                ? 'bg-[#66BB6A]/20 text-[#66BB6A]' 
                : 'bg-[#E53935]/20 text-[#E53935]'
              }
            `}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-[#B0BEC5] text-sm font-medium">
            {title}
          </h3>
          
          <div className="text-2xl font-bold text-[#F5F5F5] group-hover:text-white transition-colors duration-300">
            {value}
          </div>
          
          {subtitle && (
            <p className="text-[#B0BEC5] text-xs">
              {subtitle}
            </p>
          )}
        </div>

        {/* Hover Indicator */}
        <motion.div 
          className={`
            absolute bottom-0 left-0 h-1 bg-gradient-to-r 
            from-${color === 'primary' ? '[#66BB6A]' : color === 'secondary' ? '[#FFD54F]' : '[#4DD0E1]'} 
            to-transparent transition-all duration-300
            w-0 group-hover:w-full rounded-b-2xl
          `}
          layoutId={`card-accent-${title}`}
        />
      </div>
    </motion.div>
  )
}