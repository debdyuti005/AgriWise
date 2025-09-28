'use client'

import { RoleRedirect } from '@/components/dashboard/RoleRedirect'
import { OfficerDashboard } from '@/components/dashboard/OfficerDashboard'

export default function OfficerDashboardPage() {
  return (
    <RoleRedirect>
      <OfficerDashboard />
    </RoleRedirect>
  )
}