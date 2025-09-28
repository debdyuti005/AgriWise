'use client'

import { motion } from 'framer-motion'
import { Lightbulb, TrendingUp, MapPin, Calendar, Repeat, Target, Clock, Star } from 'lucide-react'

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

interface Recommendation {
  id: string
  type: 'timing' | 'location' | 'alternative' | 'seasonal'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  action: string
  confidence: number
  validUntil?: string
}

interface RecommendationCardProps {
  crops: CropPrice[]
}

export function RecommendationCard({ crops }: RecommendationCardProps) {
  // Generate AI-driven recommendations based on crop data
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = []

    // Best time to sell recommendations
    const sellCrops = crops.filter(c => c.recommendation === 'sell')
    if (sellCrops.length > 0) {
      recommendations.push({
        id: '1',
        type: 'timing',
        priority: 'high',
        title: 'Optimal Selling Window',
        description: `${sellCrops.map(c => c.name).join(', ')} prices are at peak levels. Market analysis suggests selling within the next 3-5 days for maximum profit.`,
        impact: '+12-18% profit vs waiting',
        action: 'Arrange transportation to nearest mandi',
        confidence: 92,
        validUntil: '2025-10-02'
      })
    }

    // Market matchmaking
    recommendations.push({
      id: '2',
      type: 'location',
      priority: 'medium',
      title: 'Better Market Opportunity',
      description: 'Faridabad Mandi is offering 7% higher rates for wheat compared to your local market. Transport cost is ₹45/quintal.',
      impact: '+₹180 per quintal net profit',
      action: 'Contact Faridabad mandi agent',
      confidence: 87
    })

    // Crop switching recommendation
    const underperformingCrops = crops.filter(c => c.changePercent < -3)
    if (underperformingCrops.length > 0) {
      recommendations.push({
        id: '3',
        type: 'alternative',
        priority: 'medium',
        title: 'Crop Diversification Strategy',
        description: `${underperformingCrops[0]?.name || 'Some crops'} showing consistent decline. Consider allocating 30% area to pulses for next season - prices up 25% YoY.`,
        impact: '+25% revenue diversification',
        action: 'Plan for rabi season',
        confidence: 78
      })
    }

    // Seasonal patterns
    recommendations.push({
      id: '4',
      type: 'seasonal',
      priority: 'low',
      title: 'Seasonal Price Pattern Alert',
      description: 'Historical data shows onion prices spike 40% post-monsoon (Oct-Nov). Current storage prices favorable.',
      impact: '+40% potential gains',
      action: 'Consider strategic storage',
      confidence: 84,
      validUntil: '2025-11-15'
    })

    return recommendations
  }

  const recommendations = generateRecommendations()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return { bg: 'from-[#E53935]/20 to-[#EF5350]/10', border: 'border-[#E53935]/30', text: 'text-[#E53935]', glow: 'shadow-[0_0_20px_rgba(229,57,53,0.3)]' }
      case 'medium': return { bg: 'from-[#FFC107]/20 to-[#FFD54F]/10', border: 'border-[#FFC107]/30', text: 'text-[#FFC107]', glow: 'shadow-[0_0_20px_rgba(255,193,7,0.3)]' }
      case 'low': return { bg: 'from-[#4CAF50]/20 to-[#66BB6A]/10', border: 'border-[#4CAF50]/30', text: 'text-[#4CAF50]', glow: 'shadow-[0_0_20px_rgba(76,175,80,0.3)]' }
      default: return { bg: 'from-[#1B1B1B]/50 to-[#2A2A2A]/50', border: 'border-white/10', text: 'text-[#B0BEC5]', glow: '' }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'timing': return <Clock className="w-5 h-5" />
      case 'location': return <MapPin className="w-5 h-5" />
      case 'alternative': return <Repeat className="w-5 h-5" />
      case 'seasonal': return <Calendar className="w-5 h-5" />
      default: return <Target className="w-5 h-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'timing': return 'Best Time to Sell'
      case 'location': return 'Market Matchmaking'
      case 'alternative': return 'Crop Switching'
      case 'seasonal': return 'Seasonal Pattern'
      default: return 'Recommendation'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-[#FFC107]" />
        <h3 className="text-[#F5F5F5] text-xl font-semibold">AI Recommendations</h3>
        <div className="ml-auto flex items-center gap-1">
          <Star className="w-4 h-4 text-[#FFC107]" />
          <span className="text-[#FFC107] text-sm font-medium">Smart Insights</span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const style = getPriorityColor(rec.priority)
          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-5 rounded-xl border backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${style.border} ${style.glow} bg-gradient-to-r ${style.bg}`}
            >
              {/* Priority badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${style.text}`}>
                    {getTypeIcon(rec.type)}
                  </div>
                  <span className={`text-sm font-medium ${style.text} capitalize`}>
                    {getTypeLabel(rec.type)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full uppercase ${style.text} ${style.bg} ${style.border} border`}>
                    {rec.priority}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${style.text.replace('text-', 'bg-')} animate-pulse`} />
                    <span className="text-[#B0BEC5] text-xs">{rec.confidence}% confident</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h4 className="text-[#F5F5F5] font-semibold text-lg mb-2">{rec.title}</h4>
                <p className="text-[#B0BEC5] text-sm leading-relaxed mb-3">{rec.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#1B1B1B]/50 border border-white/10">
                    <p className="text-[#B0BEC5] text-xs mb-1">Expected Impact</p>
                    <p className={`font-semibold ${style.text}`}>{rec.impact}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#1B1B1B]/50 border border-white/10">
                    <p className="text-[#B0BEC5] text-xs mb-1">Recommended Action</p>
                    <p className="text-[#F5F5F5] font-medium text-sm">{rec.action}</p>
                  </div>
                </div>
              </div>

              {/* Confidence meter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#B0BEC5] text-xs">AI Confidence</span>
                  <span className="text-[#F5F5F5] text-xs font-medium">{rec.confidence}%</span>
                </div>
                <div className="w-full bg-[#1B1B1B] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rec.confidence}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.2 }}
                    className={`h-2 rounded-full ${
                      rec.confidence > 85 ? 'bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]' :
                      rec.confidence > 70 ? 'bg-gradient-to-r from-[#FFC107] to-[#FFD54F]' :
                      'bg-gradient-to-r from-[#E53935] to-[#EF5350]'
                    }`}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${style.text} ${style.bg} ${style.border} border hover:bg-opacity-30`}
                  >
                    Take Action
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg text-[#B0BEC5] text-sm border border-white/20 hover:border-white/30 transition-colors"
                  >
                    Learn More
                  </motion.button>
                </div>

                {rec.validUntil && (
                  <div className="text-right">
                    <p className="text-[#B0BEC5] text-xs">Valid until</p>
                    <p className="text-[#F5F5F5] text-xs font-medium">
                      {new Date(rec.validUntil).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Animated background for high priority items */}
              {rec.priority === 'high' && (
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E53935]/20 to-[#EF5350]/10 -z-10"
                />
              )}
            </motion.div>
          )
        })}
      </div>

      {/* AI Analysis Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[#4CAF50] font-bold text-lg">
              {recommendations.filter(r => r.priority === 'high').length}
            </p>
            <p className="text-[#B0BEC5] text-xs">High Priority</p>
          </div>
          <div>
            <p className="text-[#FFC107] font-bold text-lg">
              {Math.round(recommendations.reduce((acc, r) => acc + r.confidence, 0) / recommendations.length)}%
            </p>
            <p className="text-[#B0BEC5] text-xs">Avg Confidence</p>
          </div>
          <div>
            <p className="text-[#81D4FA] font-bold text-lg">
              {recommendations.filter(r => r.validUntil && new Date(r.validUntil) > new Date()).length}
            </p>
            <p className="text-[#B0BEC5] text-xs">Time Sensitive</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
          <span className="text-[#B0BEC5] text-sm">AI analysis updated 3 minutes ago</span>
        </div>
      </div>
    </motion.div>
  )
}