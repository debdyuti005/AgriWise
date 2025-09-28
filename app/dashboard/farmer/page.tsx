'use client'

import { RoleRedirect } from '@/components/dashboard/RoleRedirect'
import { FarmerDashboard } from '@/components/dashboard/FarmerDashboard'

export default function FarmerDashboardPage() {
  return (
    <RoleRedirect>
      <FarmerDashboard />
    </RoleRedirect>
  )
}