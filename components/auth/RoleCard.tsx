'use client'

import { motion } from 'framer-motion'
import { UserRole, RoleInfo } from '@/app/auth/page'

interface RoleCardProps {
  role: RoleInfo
  isSelected: boolean
  onClick: (roleId: UserRole) => void
  index: number
}

export function RoleCard({ role, isSelected, onClick, index }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ 
        scale: 1.05,
        y: -5
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(role.id)}
      className={`
        group relative p-8 rounded-2xl cursor-pointer transition-all duration-500
        backdrop-blur-xl border-2 overflow-hidden
        ${isSelected 
          ? 'bg-gradient-to-br from-[#66BB6A]/20 via-transparent to-[#FFD54F]/20 border-[#66BB6A] shadow-2xl shadow-[#66BB6A]/25' 
          : 'bg-white/5 border-white/10 hover:border-[#66BB6A]/50 hover:shadow-xl hover:shadow-[#66BB6A]/10'
        }
      `}
    >
      {/* Glow Effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-opacity duration-500
        ${isSelected 
          ? 'bg-gradient-to-r from-[#66BB6A]/10 via-transparent to-[#FFD54F]/10 opacity-100' 
          : 'bg-gradient-to-r from-[#66BB6A]/5 via-transparent to-[#FFD54F]/5 opacity-0 group-hover:opacity-100'
        }
      `} />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
          {role.icon}
        </div>

        {/* Title */}
        <h3 className={`
          text-xl font-bold mb-4 transition-colors duration-300
          ${isSelected 
            ? 'text-[#F5F5F5] drop-shadow-lg' 
            : 'text-[#F5F5F5] group-hover:text-[#66BB6A]'
          }
        `}>
          {role.title}
        </h3>

        {/* Description */}
        <p className="text-[#B0BEC5] leading-relaxed group-hover:text-[#E0E0E0] transition-colors duration-300">
          {role.description}
        </p>

        {/* Selection Indicator */}
        <motion.div 
          className={`
            absolute top-4 right-4 w-6 h-6 rounded-full border-2 transition-all duration-300
            ${isSelected 
              ? 'border-[#66BB6A] bg-[#66BB6A] shadow-lg shadow-[#66BB6A]/50' 
              : 'border-white/30 group-hover:border-[#66BB6A]/70'
            }
          `}
          animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {isSelected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full h-full rounded-full bg-white flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-[#66BB6A]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Hover Border Glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[#66BB6A]/0 group-hover:border-[#66BB6A]/30 transition-all duration-500 pointer-events-none" />
      </div>

      {/* Bottom Accent Line */}
      <motion.div 
        className={`
          absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] transition-all duration-500
          ${isSelected ? 'w-full opacity-100' : 'w-0 group-hover:w-full opacity-70'}
        `}
        layoutId="accent-line"
      />
    </motion.div>
  )
}