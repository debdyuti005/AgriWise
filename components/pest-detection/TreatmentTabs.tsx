'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, FlaskConical, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

interface DetectionResult {
  id: string
  date: string
  crop: string
  pestDisease: string
  severity: 'low' | 'medium' | 'high'
  confidence: number
  treatmentStatus: 'pending' | 'applied' | 'resolved'
  image?: string
}

interface TreatmentTabsProps {
  latestDetection: DetectionResult | null
}

interface Treatment {
  id: string
  name: string
  description: string
  application: string
  effectiveness: number
  cost: 'low' | 'medium' | 'high'
  timeToResult: string
  sideEffects?: string
}

export function TreatmentTabs({ latestDetection }: TreatmentTabsProps) {
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical' | 'preventive'>('organic')

  // Mock treatment data - replace with API calls based on detected pest/disease
  const treatments = {
    organic: [
      {
        id: '1',
        name: 'Neem Oil Spray',
        description: 'Natural insecticidal soap made from neem tree extracts',
        application: 'Spray on affected areas every 7-10 days during early morning',
        effectiveness: 85,
        cost: 'low' as const,
        timeToResult: '7-14 days',
        sideEffects: 'Safe for beneficial insects when applied correctly'
      },
      {
        id: '2',
        name: 'Bacillus thuringiensis (Bt)',
        description: 'Biological pesticide effective against caterpillars and larvae',
        application: 'Apply during cool morning hours when larvae are active',
        effectiveness: 78,
        cost: 'medium' as const,
        timeToResult: '3-7 days',
        sideEffects: 'Safe for beneficial insects and humans'
      },
      {
        id: '3',
        name: 'Companion Planting',
        description: 'Plant marigolds and basil around affected crops',
        application: 'Plant during next seeding cycle for long-term protection',
        effectiveness: 65,
        cost: 'low' as const,
        timeToResult: '30-45 days',
        sideEffects: 'No side effects, enhances biodiversity'
      }
    ],
    chemical: [
      {
        id: '1',
        name: 'Imidacloprid 17.8% SL',
        description: 'Systemic insecticide for sucking pests and soil insects',
        application: 'Mix 0.5ml per liter of water. Spray during early morning',
        effectiveness: 92,
        cost: 'medium' as const,
        timeToResult: '1-3 days',
        sideEffects: 'Harmful to bees. Avoid spraying during flowering'
      },
      {
        id: '2',
        name: 'Chlorpyrifos 50% EC',
        description: 'Broad-spectrum organophosphate insecticide',
        application: 'Use 2ml per liter. Apply with proper protective equipment',
        effectiveness: 88,
        cost: 'high' as const,
        timeToResult: '1-2 days',
        sideEffects: 'Toxic to humans and animals. Follow safety guidelines'
      }
    ],
    preventive: [
      {
        id: '1',
        name: 'Crop Rotation',
        description: 'Rotate with non-host crops to break pest life cycles',
        application: 'Plan 3-4 year rotation cycle with legumes and cereals',
        effectiveness: 75,
        cost: 'low' as const,
        timeToResult: '1 season',
        sideEffects: 'Improves soil health and fertility'
      },
      {
        id: '2',
        name: 'Proper Plant Spacing',
        description: 'Maintain adequate spacing for air circulation',
        application: 'Follow recommended spacing: 20-25cm between plants',
        effectiveness: 70,
        cost: 'low' as const,
        timeToResult: 'Immediate',
        sideEffects: 'May reduce yield per square meter initially'
      },
      {
        id: '3',
        name: 'Drip Irrigation',
        description: 'Reduce humidity around plants to prevent fungal diseases',
        application: 'Install drip irrigation system with proper drainage',
        effectiveness: 80,
        cost: 'high' as const,
        timeToResult: '2-4 weeks',
        sideEffects: 'High initial investment cost'
      }
    ]
  }

  const tabs = [
    { key: 'organic', label: 'Organic', icon: Leaf, color: 'text-[#66BB6A]' },
    { key: 'chemical', label: 'Chemical', icon: FlaskConical, color: 'text-[#FFD54F]' },
    { key: 'preventive', label: 'Preventive', icon: Shield, color: 'text-[#4DD0E1]' }
  ]

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'low': return 'text-[#66BB6A]'
      case 'medium': return 'text-[#FFD54F]'
      case 'high': return 'text-[#E53935]'
      default: return 'text-[#B0BEC5]'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <h3 className="text-[#F5F5F5] text-xl font-semibold mb-6">Treatment Recommendations</h3>

      {!latestDetection ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A1A1A] flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-[#B0BEC5]" />
          </div>
          <h4 className="text-[#F5F5F5] font-medium mb-2">No active detection</h4>
          <p className="text-[#B0BEC5] text-sm">Upload and analyze a crop image to get personalized treatment recommendations</p>
        </div>
      ) : (
        <>
          {/* Detection Summary */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F5F5F5] font-medium">{latestDetection.pestDisease}</p>
                <p className="text-[#B0BEC5] text-sm">in {latestDetection.crop}</p>
              </div>
              <div className="text-right">
                <p className={`font-medium capitalize ${
                  latestDetection.severity === 'low' ? 'text-[#66BB6A]' :
                  latestDetection.severity === 'medium' ? 'text-[#FFD54F]' :
                  'text-[#E53935]'
                }`}>
                  {latestDetection.severity} Severity
                </p>
                <p className="text-[#B0BEC5] text-sm">{latestDetection.confidence}% confidence</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-[#1A1A1A] p-1 rounded-xl">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#66BB6A]/20 to-[#4DD0E1]/20 text-[#F5F5F5] shadow-lg'
                    : 'text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.key ? tab.color : ''}`} />
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Treatment Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {treatments[activeTab].map((treatment, index) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A]/50 to-[#2A2A2A]/50 border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-[#F5F5F5] font-semibold">{treatment.name}</h4>
                      <p className="text-[#B0BEC5] text-sm mt-1">{treatment.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[#F5F5F5] text-sm font-medium">{treatment.effectiveness}%</span>
                        <div className="w-12 bg-[#1A1A1A] rounded-full h-1">
                          <div
                            className="h-1 rounded-full bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1]"
                            style={{ width: `${treatment.effectiveness}%` }}
                          />
                        </div>
                      </div>
                      <p className={`text-xs font-medium capitalize ${getCostColor(treatment.cost)}`}>
                        {treatment.cost} cost
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-[#B0BEC5] text-sm font-medium">Application:</p>
                      <p className="text-[#F5F5F5] text-sm">{treatment.application}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#4DD0E1]" />
                        <span className="text-[#B0BEC5] text-sm">Results in {treatment.timeToResult}</span>
                      </div>
                      {treatment.sideEffects && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-[#FFD54F]" />
                          <span className="text-[#FFD54F] text-xs">Side effects</span>
                        </div>
                      )}
                    </div>

                    {treatment.sideEffects && (
                      <div className="mt-2 p-2 rounded-lg bg-[#FFD54F]/10 border border-[#FFD54F]/20">
                        <p className="text-[#FFD54F] text-xs">{treatment.sideEffects}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}