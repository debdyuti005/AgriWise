'use client'

import { MarketPriceTrackingDashboard } from '@/components/market-price/MarketPriceTrackingDashboard'

export default function MarketPricePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1B1D] via-[#121214] to-[#0A0A0C]">
      <MarketPriceTrackingDashboard />
    </div>
  )
}