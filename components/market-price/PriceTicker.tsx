'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface CropPrice {
  id: string
  name: string
  price: number
  unit: string
  change: number
  changePercent: number
  location: string
  lastUpdated: string
  trend: 'rising' | 'falling' | 'stable'
  recommendation: 'sell' | 'hold' | 'avoid'
}

interface PriceTickerProps {
  crops: CropPrice[]
}

export function PriceTicker({ crops }: PriceTickerProps) {
  // Duplicate crops for continuous scroll effect
  const tickerData = [...crops, ...crops, ...crops]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-4 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="text-[#F5F5F5] font-medium text-sm">LIVE MARKET PRICES</span>
        </div>
        <span className="text-[#B0BEC5] text-xs">Updated every minute</span>
      </div>

      <div className="relative">
        {/* Gradient fade effects */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1B1B1B] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1B1B1B] to-transparent z-10" />

        {/* Scrolling ticker */}
        <motion.div
          className="flex items-center gap-8"
          animate={{ x: [-1000, -2000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {tickerData.map((crop, index) => (
            <motion.div
              key={`${crop.id}-${index}`}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border min-w-fit ${
                crop.trend === 'rising' 
                  ? 'bg-gradient-to-r from-[#4CAF50]/10 to-transparent border-[#4CAF50]/30 shadow-[0_0_10px_rgba(76,175,80,0.3)]' 
                  : crop.trend === 'falling'
                  ? 'bg-gradient-to-r from-[#E53935]/10 to-transparent border-[#E53935]/30 shadow-[0_0_10px_rgba(229,57,53,0.3)]'
                  : 'bg-gradient-to-r from-[#FFC107]/10 to-transparent border-[#FFC107]/30 shadow-[0_0_10px_rgba(255,193,7,0.3)]'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[#F5F5F5] font-semibold text-sm">{crop.name}</span>
                <div className="w-1 h-1 rounded-full bg-[#B0BEC5]" />
                <span className="text-[#F5F5F5] font-bold">{crop.price}</span>
                <span className="text-[#B0BEC5] text-xs">{crop.unit}</span>
              </div>

              <div className="flex items-center gap-1">
                {crop.trend === 'rising' && (
                  <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                )}
                {crop.trend === 'falling' && (
                  <TrendingDown className="w-4 h-4 text-[#E53935]" />
                )}
                {crop.trend === 'stable' && (
                  <Minus className="w-4 h-4 text-[#FFC107]" />
                )}
                
                <span className={`text-xs font-medium ${
                  crop.trend === 'rising' ? 'text-[#4CAF50]' : 
                  crop.trend === 'falling' ? 'text-[#E53935]' : 
                  'text-[#FFC107]'
                }`}>
                  {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                </span>
              </div>

              {/* Animated glow effect for trending items */}
              {Math.abs(crop.changePercent) > 3 && (
                <motion.div
                  className={`absolute inset-0 rounded-xl ${
                    crop.trend === 'rising' 
                      ? 'bg-[#4CAF50]/20' 
                      : 'bg-[#E53935]/20'
                  } -z-10`}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Market status indicators */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
            <span className="text-[#4CAF50] text-xs font-medium">
              {crops.filter(c => c.trend === 'rising').length} Rising
            </span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-[#E53935]" />
            <span className="text-[#E53935] text-xs font-medium">
              {crops.filter(c => c.trend === 'falling').length} Falling
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Minus className="w-4 h-4 text-[#FFC107]" />
            <span className="text-[#FFC107] text-xs font-medium">
              {crops.filter(c => c.trend === 'stable').length} Stable
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#B0BEC5] text-xs">Next update in</span>
          <motion.div
            className="text-[#81D4FA] text-xs font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            45s
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}