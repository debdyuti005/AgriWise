'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react'

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

interface CropPriceCardProps {
  crop: CropPrice
  index: number
  dateRange: string
}

export function CropPriceCard({ crop, index, dateRange }: CropPriceCardProps) {
  const [sparklineData, setSparklineData] = useState<number[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Mock historical data for sparkline
  const generateSparklineData = () => {
    const points = 30
    const basePrice = crop.price - Math.abs(crop.change)
    const data = []
    
    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * (crop.price * 0.1)
      const trendFactor = crop.trend === 'rising' ? (i / points) * Math.abs(crop.change) : 
                         crop.trend === 'falling' ? -(i / points) * Math.abs(crop.change) : 0
      data.push(basePrice + variation + trendFactor)
    }
    
    return data
  }

  useEffect(() => {
    setIsMounted(true)
    setSparklineData(generateSparklineData())
  }, [crop.id])

  const minPrice = sparklineData.length > 0 ? Math.min(...sparklineData) : crop.price
  const maxPrice = sparklineData.length > 0 ? Math.max(...sparklineData) : crop.price

  const getRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case 'sell':
        return {
          bg: 'from-[#4CAF50]/20 to-[#66BB6A]/10',
          border: 'border-[#4CAF50]/30',
          glow: 'shadow-[0_0_25px_rgba(76,175,80,0.3)]',
          text: 'text-[#4CAF50]',
          badge: 'BEST TIME TO SELL'
        }
      case 'hold':
        return {
          bg: 'from-[#FFC107]/20 to-[#FFD54F]/10',
          border: 'border-[#FFC107]/30',
          glow: 'shadow-[0_0_25px_rgba(255,193,7,0.3)]',
          text: 'text-[#FFC107]',
          badge: 'HOLD FOR BETTER RATES'
        }
      case 'avoid':
        return {
          bg: 'from-[#E53935]/20 to-[#EF5350]/10',
          border: 'border-[#E53935]/30',
          glow: 'shadow-[0_0_25px_rgba(229,57,53,0.3)]',
          text: 'text-[#E53935]',
          badge: 'AVOID SELLING NOW'
        }
      default:
        return {
          bg: 'from-[#1B1B1B]/50 to-[#2A2A2A]/50',
          border: 'border-white/10',
          glow: '',
          text: 'text-[#B0BEC5]',
          badge: 'MONITOR'
        }
    }
  }

  const style = getRecommendationStyle(crop.recommendation)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glassmorphism-dark p-6 rounded-2xl border backdrop-blur-xl ${style.border} ${style.glow} bg-gradient-to-r ${style.bg} hover:scale-[1.02] transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[#F5F5F5] text-2xl font-bold">{crop.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-[#81D4FA]" />
            <span className="text-[#B0BEC5] text-sm">{crop.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            {crop.trend === 'rising' && <TrendingUp className="w-5 h-5 text-[#4CAF50]" />}
            {crop.trend === 'falling' && <TrendingDown className="w-5 h-5 text-[#E53935]" />}
            {crop.trend === 'stable' && <Minus className="w-5 h-5 text-[#FFC107]" />}
            <span className={`text-sm font-medium capitalize ${style.text}`}>
              {crop.trend}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#B0BEC5]" />
            <span className="text-[#B0BEC5] text-xs">{crop.lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Current Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-[#F5F5F5]">{crop.price}</span>
          <span className="text-[#B0BEC5] text-lg">{crop.unit}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className={`font-semibold ${
              crop.change > 0 ? 'text-[#4CAF50]' : 
              crop.change < 0 ? 'text-[#E53935]' : 
              'text-[#FFC107]'
            }`}>
              {crop.change > 0 ? '+' : ''}{crop.change}
            </span>
            <span className="text-[#B0BEC5] text-sm">({crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%)</span>
          </div>
          <span className="text-[#B0BEC5] text-sm">last 24h</span>
        </div>
      </div>

      {/* Price Movement Sparkline */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-[#81D4FA]" />
          <span className="text-[#F5F5F5] font-medium text-sm">Price Trend ({dateRange})</span>
        </div>
        
        <div className="relative h-16 bg-[#1B1B1B] rounded-lg p-2 overflow-hidden">
          {isMounted && sparklineData.length > 0 ? (
            <svg className="w-full h-full" viewBox="0 0 300 60">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="30" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 15" fill="none" stroke="rgba(176, 190, 197, 0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Sparkline path */}
              <motion.path
                d={`M ${sparklineData.map((price, i) => 
                  `${(i / (sparklineData.length - 1)) * 300},${60 - ((price - minPrice) / (maxPrice - minPrice)) * 50}`
                ).join(' L ')}`}
                fill="none"
                stroke={crop.trend === 'rising' ? '#4CAF50' : crop.trend === 'falling' ? '#E53935' : '#FFC107'}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              
              {/* Gradient fill */}
              <defs>
                <linearGradient id={`gradient-${crop.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={crop.trend === 'rising' ? '#4CAF50' : crop.trend === 'falling' ? '#E53935' : '#FFC107'} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor={crop.trend === 'rising' ? '#4CAF50' : crop.trend === 'falling' ? '#E53935' : '#FFC107'} stopOpacity="0"/>
                </linearGradient>
              </defs>
              <motion.path
                d={`M ${sparklineData.map((price, i) => 
                  `${(i / (sparklineData.length - 1)) * 300},${60 - ((price - minPrice) / (maxPrice - minPrice)) * 50}`
                ).join(' L ')} L 300,60 L 0,60 Z`}
                fill={`url(#gradient-${crop.id})`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#B0BEC5] text-sm">
              Loading chart...
            </div>
          )}
          
          {/* Min/Max labels */}
          <div className="absolute top-1 right-2 text-[#B0BEC5] text-xs">
            ₹{Math.round(maxPrice)}
          </div>
          <div className="absolute bottom-1 right-2 text-[#B0BEC5] text-xs">
            ₹{Math.round(minPrice)}
          </div>
        </div>
      </div>

      {/* Recommendation Badge */}
      <div className="mb-4">
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${style.border} bg-gradient-to-r ${style.bg} ${style.text} font-medium text-sm`}
          animate={{
            boxShadow: crop.recommendation === 'sell' ? 
              ['0 0 10px rgba(76, 175, 80, 0.3)', '0 0 20px rgba(76, 175, 80, 0.5)', '0 0 10px rgba(76, 175, 80, 0.3)'] :
              crop.recommendation === 'avoid' ?
              ['0 0 10px rgba(229, 57, 53, 0.3)', '0 0 20px rgba(229, 57, 53, 0.5)', '0 0 10px rgba(229, 57, 53, 0.3)'] :
              []
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`w-2 h-2 rounded-full ${style.text.replace('text-', 'bg-')} animate-pulse`} />
          {style.badge}
        </motion.div>
      </div>

      {/* Market Comparison */}
      <div className="grid grid-cols-2 gap-4 p-3 bg-[#1B1B1B]/50 rounded-xl">
        <div>
          <p className="text-[#B0BEC5] text-xs mb-1">State Average</p>
          <p className="text-[#F5F5F5] font-semibold">₹{Math.round(crop.price * 0.95)}</p>
          <p className="text-[#4CAF50] text-xs">+5% vs local</p>
        </div>
        <div>
          <p className="text-[#B0BEC5] text-xs mb-1">National Average</p>
          <p className="text-[#F5F5F5] font-semibold">₹{Math.round(crop.price * 0.88)}</p>
          <p className="text-[#4CAF50] text-xs">+12% vs national</p>
        </div>
      </div>

      {/* Animated pulse for high-priority recommendations */}
      {(crop.recommendation === 'sell' || crop.recommendation === 'avoid') && (
        <motion.div
          className={`absolute inset-0 rounded-2xl ${
            crop.recommendation === 'sell' 
              ? 'bg-[#4CAF50]/10' 
              : 'bg-[#E53935]/10'
          } -z-10`}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.01, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  )
}