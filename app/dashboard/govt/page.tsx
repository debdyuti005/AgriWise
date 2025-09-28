'use client'

import { RoleRedirect } from '@/components/dashboard/RoleRedirect'
import { GovtDashboard } from '@/components/dashboard/GovtDashboard'

export default function GovtDashboardPage() {
  return (
    <RoleRedirect>
      <GovtDashboard />
    </RoleRedirect>
  )
}