'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RoleCard } from './RoleCard'
import { UserRole, RoleInfo } from '@/app/auth/page'

interface RoleSelectionGridProps {
  roles: RoleInfo[]
  onRoleSelect: (role: UserRole) => void
}

export function RoleSelectionGrid({ roles, onRoleSelect }: RoleSelectionGridProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const handleRoleClick = (roleId: UserRole) => {
    setSelectedRole(roleId)
    // Add a small delay before proceeding to show selection feedback
    setTimeout(() => {
      onRoleSelect(roleId)
    }, 600)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Grid Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {roles.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            isSelected={selectedRole === role.id}
            onClick={handleRoleClick}
            index={index}
          />
        ))}
      </motion.div>

      {/* Helper Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-center mt-12"
      >
        <p className="text-[#B0BEC5] text-lg">
          Select your role to access personalized features and content
        </p>
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-[#66BB6A] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}