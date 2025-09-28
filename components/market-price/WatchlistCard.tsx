'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Eye, X, TrendingUp, TrendingDown, Star, Minus } from 'lucide-react'

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

interface WatchlistCardProps {
  watchlistCrops: CropPrice[]
  onRemove: (cropId: string) => void
}

export function WatchlistCard({ watchlistCrops, onRemove }: WatchlistCardProps) {
  const [chartHeights, setChartHeights] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Generate random heights for mini chart
    setChartHeights(Array.from({ length: 20 }, () => Math.random() * 20 + 10))
  }, [])

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation) {
      case 'sell':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] animate-pulse" />
            SELL NOW
          </span>
        )
      case 'hold':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#FFC107]/20 text-[#FFC107] border border-[#FFC107]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
            HOLD
          </span>
        )
      case 'avoid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#E53935]/20 text-[#E53935] border border-[#E53935]/30">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E53935] animate-pulse" />
            AVOID SELLING
          </span>
        )
      default:
        return null
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising':
        return <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
      case 'falling':
        return <TrendingDown className="w-4 h-4 text-[#E53935]" />
      case 'stable':
        return <Minus className="w-4 h-4 text-[#FFC107]" />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-[#FFC107]" />
          <h3 className="text-[#F5F5F5] text-xl font-semibold">My Watchlist</h3>
        </div>
        <div className="text-[#B0BEC5] text-sm">
          {watchlistCrops.length} crops
        </div>
      </div>

      {watchlistCrops.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1B1B1B] flex items-center justify-center">
            <Eye className="w-8 h-8 text-[#B0BEC5]" />
          </div>
          <h4 className="text-[#F5F5F5] font-medium mb-2">No crops in watchlist</h4>
          <p className="text-[#B0BEC5] text-sm">Add crops to track their price movements</p>
        </div>
      ) : (
        <div className="space-y-4">
          {watchlistCrops.map((crop, index) => (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border relative group transition-all duration-300 hover:scale-[1.02] ${
                crop.trend === 'rising' 
                  ? 'bg-gradient-to-r from-[#4CAF50]/10 to-transparent border-[#4CAF50]/30 hover:shadow-[0_0_20px_rgba(76,175,80,0.3)]' 
                  : crop.trend === 'falling'
                  ? 'bg-gradient-to-r from-[#E53935]/10 to-transparent border-[#E53935]/30 hover:shadow-[0_0_20px_rgba(229,57,53,0.3)]'
                  : 'bg-gradient-to-r from-[#FFC107]/10 to-transparent border-[#FFC107]/30 hover:shadow-[0_0_20px_rgba(255,193,7,0.3)]'
              }`}
            >
              {/* Remove button */}
              <motion.button
                onClick={() => onRemove(crop.id)}
                className="absolute top-2 right-2 w-6 h-6 bg-[#E53935]/20 text-[#E53935] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#E53935]/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-3 h-3" />
              </motion.button>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="text-[#F5F5F5] font-semibold text-lg">{crop.name}</h4>
                  {getTrendIcon(crop.trend)}
                </div>
                <div className="text-right">
                  <p className="text-[#F5F5F5] font-bold text-lg">
                    {crop.price}
                  </p>
                  <p className="text-[#B0BEC5] text-xs">{crop.unit}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[#B0BEC5] text-xs mb-1">Location</p>
                  <p className="text-[#F5F5F5] text-sm font-medium">{crop.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#B0BEC5] text-xs mb-1">24h Change</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-bold ${
                      crop.trend === 'rising' ? 'text-[#4CAF50]' : 
                      crop.trend === 'falling' ? 'text-[#E53935]' : 
                      'text-[#FFC107]'
                    }`}>
                      {crop.change > 0 ? '+' : ''}{crop.change}
                    </span>
                    <span className={`text-xs ${
                      crop.trend === 'rising' ? 'text-[#4CAF50]' : 
                      crop.trend === 'falling' ? 'text-[#E53935]' : 
                      'text-[#FFC107]'
                    }`}>
                      ({crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {getRecommendationBadge(crop.recommendation)}
                </div>
                <div className="text-[#B0BEC5] text-xs">
                  Updated {crop.lastUpdated}
                </div>
              </div>

              {/* Price sparkline simulation */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1 h-8">
                  {isMounted && chartHeights.map((height, i) => (
                    <motion.div
                      key={i}
                      className={`w-1 rounded-full ${
                        crop.trend === 'rising' ? 'bg-[#4CAF50]' : 
                        crop.trend === 'falling' ? 'bg-[#E53935]' : 
                        'bg-[#FFC107]'
                      }`}
                      style={{ 
                        height: `${height}px`,
                        opacity: 0.3 + (i * 0.035)
                      }}
                      animate={{ 
                        height: [`${height}px`, `${height * 1.5}px`, `${height}px`],
                        opacity: [0.3 + (i * 0.035), 0.7, 0.3 + (i * 0.035)]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                <p className="text-[#B0BEC5] text-xs mt-1">7-day price trend</p>
              </div>

              {/* Glow effect for high movement items */}
              {Math.abs(crop.changePercent) > 5 && (
                <motion.div
                  className={`absolute inset-0 rounded-xl ${
                    crop.trend === 'rising' 
                      ? 'shadow-[0_0_30px_rgba(76,175,80,0.4)]' 
                      : 'shadow-[0_0_30px_rgba(229,57,53,0.4)]'
                  } -z-10`}
                  animate={{
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary */}
      {watchlistCrops.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[#4CAF50] font-bold text-lg">
                {watchlistCrops.filter(c => c.recommendation === 'sell').length}
              </p>
              <p className="text-[#B0BEC5] text-xs">Ready to Sell</p>
            </div>
            <div>
              <p className="text-[#FFC107] font-bold text-lg">
                {watchlistCrops.filter(c => c.recommendation === 'hold').length}
              </p>
              <p className="text-[#B0BEC5] text-xs">Hold</p>
            </div>
            <div>
              <p className="text-[#E53935] font-bold text-lg">
                {watchlistCrops.filter(c => c.recommendation === 'avoid').length}
              </p>
              <p className="text-[#B0BEC5] text-xs">Avoid Selling</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}