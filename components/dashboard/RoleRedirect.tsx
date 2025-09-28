'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Mock function to get user role - replace with actual auth logic
const getUserRole = (): string | null => {
  // In a real app, this would come from your auth context/session
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userRole') || null
  }
  return null
}

interface RoleRedirectProps {
  children?: React.ReactNode
}

export function RoleRedirect({ children }: RoleRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    const userRole = getUserRole()
    
    if (!userRole) {
      // No role found, redirect to auth
      router.push('/auth')
      return
    }

    // Role-based redirection mapping
    const roleRoutes = {
      'farmer': '/dashboard/farmer',
      'extension-officer': '/dashboard/officer', 
      'government': '/dashboard/govt',
      'ngo': '/dashboard/ngo',
      'startup': '/dashboard/startup'
    }

    const targetRoute = roleRoutes[userRole as keyof typeof roleRoutes]
    
    if (targetRoute && window.location.pathname !== targetRoute) {
      router.push(targetRoute)
    }
  }, [router])

  return <>{children}</>
}

// Utility function to set user role (for demo purposes)
export const setUserRole = (role: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userRole', role)
  }
}