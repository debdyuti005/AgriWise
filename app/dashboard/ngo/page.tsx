'use client'

import { RoleRedirect } from '@/components/dashboard/RoleRedirect'
import { NGODashboard } from '@/components/dashboard/NGODashboard'

export default function NGODashboardPage() {
  return (
    <RoleRedirect>
      <NGODashboard />
    </RoleRedirect>
  )
}