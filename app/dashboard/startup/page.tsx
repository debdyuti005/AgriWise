'use client'

import { RoleRedirect } from '@/components/dashboard/RoleRedirect'
import { StartupDashboard } from '@/components/dashboard/StartupDashboard'

export default function StartupDashboardPage() {
  return (
    <RoleRedirect>
      <StartupDashboard />
    </RoleRedirect>
  )
}