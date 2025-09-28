'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Brain, CheckCircle, AlertTriangle, XCircle, Lightbulb, TrendingUp, Droplets, Thermometer } from 'lucide-react'
import { useState } from 'react'

interface AIAlert {
  id: string
  type: 'success' | 'warning' | 'critical'
  title: string
  message: string
  action?: string
  icon: React.ReactNode
}

interface AISuggestion {
  id: string
  category: 'treatment' | 'prevention' | 'optimization'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  effort: 'low' | 'medium' | 'high'
}

export function AIInsightsCard() {
  const [activeTab, setActiveTab] = useState<'alerts' | 'suggestions'>('alerts')

  const alerts: AIAlert[] = [
    {
      id: '1',
      type: 'success',
      title: 'All Clear - Maize Fields',
      message: 'No infections detected in your maize scans this week. Crop health is optimal.',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: '2',
      type: 'warning',
      title: 'Humidity Risk Rising',
      message: 'Powdery mildew risk increasing due to high humidity levels (85%+). Monitor closely.',
      action: 'Improve ventilation',
      icon: <Droplets className="w-5 h-5" />
    },
    {
      id: '3',
      type: 'critical',
      title: 'Severe Outbreak Detected',
      message: 'Leaf rust outbreak detected in wheat fields. Immediate treatment required.',
      action: 'Apply fungicide immediately',
      icon: <XCircle className="w-5 h-5" />
    }
  ]

  const suggestions: AISuggestion[] = [
    {
      id: '1',
      category: 'treatment',
      title: 'Neem Oil Application',
      description: 'Apply neem oil spray twice this week for mild aphid control based on current infestation levels.',
      impact: 'high',
      effort: 'low'
    },
    {
      id: '2',
      category: 'prevention',
      title: 'Crop Rotation Strategy',
      description: 'Rotate to legumes next season to reduce fungal build-up in soil and improve nitrogen levels.',
      impact: 'high',
      effort: 'medium'
    },
    {
      id: '3',
      category: 'optimization',
      title: 'Resistant Seed Variety',
      description: 'Consider switching to rust-resistant wheat variety for next planting season.',
      impact: 'medium',
      effort: 'high'
    }
  ]

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          border: 'border-[#66BB6A]/30',
          bg: 'from-[#66BB6A]/10 to-[#4CAF50]/5',
          glow: 'shadow-[0_0_20px_rgba(102,187,106,0.2)]',
          icon: 'text-[#66BB6A]'
        }
      case 'warning':
        return {
          border: 'border-[#FFD54F]/30',
          bg: 'from-[#FFD54F]/10 to-[#FFC107]/5',
          glow: 'shadow-[0_0_20px_rgba(255,213,79,0.2)]',
          icon: 'text-[#FFD54F]'
        }
      case 'critical':
        return {
          border: 'border-[#E53935]/30',
          bg: 'from-[#E53935]/10 to-[#D32F2F]/5',
          glow: 'shadow-[0_0_20px_rgba(229,57,53,0.2)]',
          icon: 'text-[#E53935]'
        }
      default:
        return {
          border: 'border-white/10',
          bg: 'from-[#1A1A1A] to-[#2A2A2A]',
          glow: '',
          icon: 'text-[#B0BEC5]'
        }
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-[#66BB6A]'
      case 'medium': return 'text-[#FFD54F]'
      case 'low': return 'text-[#B0BEC5]'
      default: return 'text-[#B0BEC5]'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-[#66BB6A]'
      case 'medium': return 'text-[#FFD54F]'
      case 'high': return 'text-[#E53935]'
      default: return 'text-[#B0BEC5]'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'treatment': return <AlertTriangle className="w-4 h-4" />
      case 'prevention': return <CheckCircle className="w-4 h-4" />
      case 'optimization': return <TrendingUp className="w-4 h-4" />
      default: return <Lightbulb className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-[#4DD0E1]" />
        <h3 className="text-[#F5F5F5] text-xl font-semibold">AI Insights</h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-[#1A1A1A] p-1 rounded-xl">
        <motion.button
          onClick={() => setActiveTab('alerts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
            activeTab === 'alerts'
              ? 'bg-gradient-to-r from-[#66BB6A]/20 to-[#4DD0E1]/20 text-[#F5F5F5] shadow-lg'
              : 'text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/5'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AlertTriangle className={`w-4 h-4 ${activeTab === 'alerts' ? 'text-[#FFD54F]' : ''}`} />
          Alerts
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('suggestions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
            activeTab === 'suggestions'
              ? 'bg-gradient-to-r from-[#66BB6A]/20 to-[#4DD0E1]/20 text-[#F5F5F5] shadow-lg'
              : 'text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/5'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Lightbulb className={`w-4 h-4 ${activeTab === 'suggestions' ? 'text-[#4DD0E1]' : ''}`} />
          Suggestions
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'alerts' ? (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {alerts.map((alert, index) => {
              const style = getAlertStyle(alert.type)
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl bg-gradient-to-r ${style.bg} border ${style.border} ${style.glow} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`${style.icon} mt-0.5`}>
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[#F5F5F5] font-semibold mb-1">{alert.title}</h4>
                      <p className="text-[#B0BEC5] text-sm mb-2">{alert.message}</p>
                      {alert.action && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                            alert.type === 'critical' 
                              ? 'bg-[#E53935]/20 text-[#E53935] border-[#E53935]/30 hover:bg-[#E53935]/30'
                              : 'bg-[#FFD54F]/20 text-[#FFD54F] border-[#FFD54F]/30 hover:bg-[#FFD54F]/30'
                          }`}
                        >
                          {alert.action}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Animated pulse for critical alerts */}
                  {alert.type === 'critical' && (
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-xl bg-[#E53935]/10 -z-10"
                    />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <motion.div
            key="suggestions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A]/80 to-[#2A2A2A]/80 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-3">
                  <div className="text-[#4DD0E1] mt-0.5">
                    {getCategoryIcon(suggestion.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[#F5F5F5] font-semibold">{suggestion.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium capitalize ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact} impact
                        </span>
                        <span className="text-[#B0BEC5]">•</span>
                        <span className={`text-xs font-medium capitalize ${getEffortColor(suggestion.effort)}`}>
                          {suggestion.effort} effort
                        </span>
                      </div>
                    </div>
                    <p className="text-[#B0BEC5] text-sm mb-3">{suggestion.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-[#66BB6A]/20 text-[#66BB6A] border border-[#66BB6A]/30 hover:bg-[#66BB6A]/30 transition-colors"
                      >
                        Apply Suggestion
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-[#4DD0E1]/20 text-[#4DD0E1] border border-[#4DD0E1]/30 hover:bg-[#4DD0E1]/30 transition-colors"
                      >
                        Learn More
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Status Indicator */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#66BB6A] animate-pulse" />
            <span className="text-[#B0BEC5] text-sm">AI Analysis Active</span>
          </div>
          <span className="text-[#4DD0E1] text-xs font-medium">Last updated: 2 mins ago</span>
        </div>
      </div>
    </motion.div>
  )
}