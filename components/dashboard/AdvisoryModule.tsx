'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Sprout, 
  Cloud, 
  Bug, 
  Droplets, 
  Calendar, 
  MapPin, 
  Volume2, 
  Download, 
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Play,
  Pause
} from 'lucide-react'

interface Advisory {
  id: string
  type: 'crop' | 'weather' | 'pest' | 'fertilizer' | 'market'
  title: string
  titleHindi: string
  description: string
  descriptionHindi: string
  priority: 'high' | 'medium' | 'low'
  date: string
  location: string
  hasAudio: boolean
  isRead: boolean
  audioUrl?: string
  imageUrl?: string
}

interface AdvisoryModuleProps {
  isHindi?: boolean
}

const mockAdvisories: Advisory[] = [
  {
    id: '1',
    type: 'weather',
    title: 'Heavy Rain Alert - Next 48 Hours',
    titleHindi: 'भारी बारिश की चेतावनी - अगले 48 घंटे',
    description: 'Heavy rainfall expected. Ensure proper drainage in fields. Avoid fertilizer application.',
    descriptionHindi: 'भारी बारिश की संभावना। खेतों में उचित जल निकासी सुनिश्चित करें। उर्वरक डालने से बचें।',
    priority: 'high',
    date: '2025-09-28',
    location: 'Punjab, India',
    hasAudio: true,
    isRead: false,
    audioUrl: '/audio/weather-alert.mp3',
    imageUrl: '/images/rain-alert.jpg'
  },
  {
    id: '2',
    type: 'pest',
    title: 'Brown Plant Hopper Alert',
    titleHindi: 'भूरे पौधे फुदके की चेतावनी',
    description: 'Brown plant hopper detected in nearby fields. Apply recommended pesticide immediately.',
    descriptionHindi: 'आस-पास के खेतों में भूरे पौधे फुदके का पता चला। तुरंत सुझाए गए कीटनाशक का छिड़काव करें।',
    priority: 'high',
    date: '2025-09-27',
    location: 'Punjab, India',
    hasAudio: true,
    isRead: false,
    audioUrl: '/audio/pest-alert.mp3'
  },
  {
    id: '3',
    type: 'fertilizer',
    title: 'Optimal Time for Nitrogen Application',
    titleHindi: 'नाइट्रोजन के लिए उत्तम समय',
    description: 'Based on your crop stage, this is the ideal time for nitrogen fertilizer application.',
    descriptionHindi: 'आपकी फसल की अवस्था के आधार पर, यह नाइट्रोजन उर्वरक डालने का आदर्श समय है।',
    priority: 'medium',
    date: '2025-09-26',
    location: 'Punjab, India',
    hasAudio: true,
    isRead: true,
    audioUrl: '/audio/fertilizer-advice.mp3'
  },
  {
    id: '4',
    type: 'crop',
    title: 'Wheat Sowing Guidelines 2025',
    titleHindi: 'गेहूं बुवाई दिशानिर्देश 2025',
    description: 'Complete guidelines for wheat sowing including seed variety, spacing, and depth.',
    descriptionHindi: 'बीज की किस्म, दूरी और गहराई सहित गेहूं की बुवाई के लिए पूर्ण दिशानिर्देश।',
    priority: 'medium',
    date: '2025-09-25',
    location: 'Punjab, India',
    hasAudio: true,
    isRead: true,
    audioUrl: '/audio/wheat-sowing.mp3'
  }
]

const priorityColors = {
  high: 'from-[#E53935] to-[#FF5722]',
  medium: 'from-[#FFD54F] to-[#FFC107]',
  low: 'from-[#66BB6A] to-[#4CAF50]'
}

const typeIcons = {
  crop: Sprout,
  weather: Cloud,
  pest: Bug,
  fertilizer: Droplets,
  market: Calendar
}

export function AdvisoryModule({ isHindi = false }: AdvisoryModuleProps) {
  const [advisories, setAdvisories] = useState<Advisory[]>(mockAdvisories)
  const [filteredAdvisories, setFilteredAdvisories] = useState<Advisory[]>(mockAdvisories)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  useEffect(() => {
    let filtered = advisories

    if (selectedType !== 'all') {
      filtered = filtered.filter(advisory => advisory.type === selectedType)
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(advisory => advisory.priority === selectedPriority)
    }

    if (searchTerm) {
      filtered = filtered.filter(advisory => 
        advisory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advisory.titleHindi.includes(searchTerm) ||
        advisory.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredAdvisories(filtered)
  }, [advisories, selectedType, selectedPriority, searchTerm])

  const markAsRead = (id: string) => {
    setAdvisories(prev => prev.map(advisory => 
      advisory.id === id ? { ...advisory, isRead: true } : advisory
    ))
  }

  const playAudio = (id: string, audioUrl?: string) => {
    if (playingAudio === id) {
      setPlayingAudio(null)
      // Stop audio playback
    } else {
      setPlayingAudio(id)
      // Start audio playback
      markAsRead(id)
    }
  }

  const downloadAdvisory = (advisory: Advisory) => {
    // Simulate download
    console.log('Downloading advisory:', advisory.title)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] bg-clip-text text-transparent mb-2">
            {isHindi ? 'फसल सलाह' : 'Crop Advisories'}
          </h1>
          <p className="text-[#B0BEC5]">
            {isHindi 
              ? 'व्यक्तिगत कृषि सलाह और मार्गदर्शन प्राप्त करें' 
              : 'Get personalized farming advice and guidance'
            }
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B0BEC5]" />
              <input
                type="text"
                placeholder={isHindi ? 'सलाह खोजें...' : 'Search advisories...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी प्रकार' : 'All Types'}</option>
              <option value="crop">{isHindi ? 'फसल' : 'Crop'}</option>
              <option value="weather">{isHindi ? 'मौसम' : 'Weather'}</option>
              <option value="pest">{isHindi ? 'कीट' : 'Pest'}</option>
              <option value="fertilizer">{isHindi ? 'उर्वरक' : 'Fertilizer'}</option>
              <option value="market">{isHindi ? 'बाज़ार' : 'Market'}</option>
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी प्राथमिकता' : 'All Priority'}</option>
              <option value="high">{isHindi ? 'उच्च' : 'High'}</option>
              <option value="medium">{isHindi ? 'मध्यम' : 'Medium'}</option>
              <option value="low">{isHindi ? 'कम' : 'Low'}</option>
            </select>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-[#B0BEC5]">
                {isHindi ? 'कुल:' : 'Total:'} <span className="text-[#F5F5F5] font-medium">{filteredAdvisories.length}</span>
              </span>
              <span className="text-[#E53935]">
                {isHindi ? 'नई:' : 'New:'} <span className="font-medium">{filteredAdvisories.filter(a => !a.isRead).length}</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Advisories List */}
        <div className="space-y-4">
          {filteredAdvisories.map((advisory, index) => {
            const TypeIcon = typeIcons[advisory.type]
            const priorityColor = priorityColors[advisory.priority]
            
            return (
              <motion.div
                key={advisory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glassmorphism-dark p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  !advisory.isRead 
                    ? 'border-[#66BB6A]/30 shadow-[#66BB6A]/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => markAsRead(advisory.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Priority Indicator */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${priorityColor} flex items-center justify-center`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[#F5F5F5] font-semibold text-lg">
                            {isHindi ? advisory.titleHindi : advisory.title}
                          </h3>
                          {!advisory.isRead && (
                            <span className="w-2 h-2 bg-[#66BB6A] rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-[#B0BEC5] mb-3">
                          {isHindi ? advisory.descriptionHindi : advisory.description}
                        </p>
                      </div>
                      
                      {/* Priority Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${priorityColor}`}>
                        {isHindi 
                          ? advisory.priority === 'high' ? 'उच्च' : advisory.priority === 'medium' ? 'मध्यम' : 'कम'
                          : advisory.priority.toUpperCase()
                        }
                      </span>
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-sm text-[#B0BEC5] mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(advisory.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {advisory.location}
                      </div>
                      {advisory.isRead && (
                        <div className="flex items-center gap-1 text-[#66BB6A]">
                          <CheckCircle className="w-4 h-4" />
                          {isHindi ? 'पढ़ा गया' : 'Read'}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {advisory.hasAudio && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            playAudio(advisory.id, advisory.audioUrl)
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                            playingAudio === advisory.id
                              ? 'bg-[#E53935] text-white'
                              : 'bg-[#66BB6A]/20 text-[#66BB6A] hover:bg-[#66BB6A]/30'
                          }`}
                        >
                          {playingAudio === advisory.id ? (
                            <>
                              <Pause className="w-4 h-4" />
                              {isHindi ? 'रोकें' : 'Stop'}
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              {isHindi ? 'सुनें' : 'Listen'}
                            </>
                          )}
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadAdvisory(advisory)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-[#B0BEC5] rounded-lg font-medium text-sm hover:bg-white/20 hover:text-[#F5F5F5] transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        {isHindi ? 'डाउनलोड' : 'Download'}
                      </motion.button>

                      <div className="flex items-center gap-1 text-[#B0BEC5]">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{isHindi ? 'महत्वपूर्ण' : 'Important'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredAdvisories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#B0BEC5]" />
            </div>
            <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
              {isHindi ? 'कोई सलाह नहीं मिली' : 'No Advisories Found'}
            </h3>
            <p className="text-[#B0BEC5]">
              {isHindi 
                ? 'अपने फिल्टर बदलें या बाद में फिर से जांचें'
                : 'Try adjusting your filters or check back later'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}