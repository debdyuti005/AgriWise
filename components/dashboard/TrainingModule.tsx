'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Play, 
  Download, 
  Bookmark, 
  BookmarkCheck,
  Search,
  Filter,
  Clock,
  User,
  Star,
  Eye,
  Volume2,
  FileText,
  Image as ImageIcon,
  Video,
  Headphones,
  Tag,
  Calendar,
  Award,
  CheckCircle
} from 'lucide-react'

interface TrainingContent {
  id: string
  title: string
  titleHindi: string
  description: string
  descriptionHindi: string
  category: 'pest-control' | 'irrigation' | 'fertilizer' | 'organic' | 'marketing' | 'subsidy' | 'new-crops'
  type: 'video' | 'audio' | 'text' | 'image'
  duration?: number // in minutes
  instructor: string
  instructorHindi: string
  level: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  views: number
  isBookmarked: boolean
  isCompleted: boolean
  thumbnailUrl?: string
  contentUrl: string
  downloadable: boolean
  tags: string[]
  tagsHindi: string[]
  publishDate: string
  language: 'hindi' | 'english' | 'punjabi'
  transcript?: string
  transcriptHindi?: string
}

interface TrainingModuleProps {
  isHindi?: boolean
}

const mockContent: TrainingContent[] = [
  {
    id: '1',
    title: 'Organic Pest Control Methods',
    titleHindi: 'जैविक कीट नियंत्रण विधियां',
    description: 'Learn natural and organic methods to control pests without harmful chemicals.',
    descriptionHindi: 'हानिकारक रसायनों के बिना कीटों को नियंत्रित करने के प्राकृतिक और जैविक तरीके सीखें।',
    category: 'pest-control',
    type: 'video',
    duration: 25,
    instructor: 'Dr. Amit Sharma',
    instructorHindi: 'डॉ. अमित शर्मा',
    level: 'intermediate',
    rating: 4.8,
    views: 1250,
    isBookmarked: true,
    isCompleted: false,
    thumbnailUrl: '/thumbnails/organic-pest-control.jpg',
    contentUrl: '/videos/organic-pest-control.mp4',
    downloadable: true,
    tags: ['organic', 'pest control', 'natural methods', 'eco-friendly'],
    tagsHindi: ['जैविक', 'कीट नियंत्रण', 'प्राकृतिक तरीके', 'पर्यावरण-अनुकूल'],
    publishDate: '2025-09-20',
    language: 'hindi',
    transcript: 'Transcript available in Hindi and English...',
    transcriptHindi: 'हिंदी और अंग्रेजी में ट्रांसक्रिप्ट उपलब्ध...'
  },
  {
    id: '2',
    title: 'Drip Irrigation Setup Guide',
    titleHindi: 'ड्रिप सिंचाई सेटअप गाइड',
    description: 'Step-by-step guide to set up an efficient drip irrigation system.',
    descriptionHindi: 'एक कुशल ड्रिप सिंचाई प्रणाली स्थापित करने के लिए चरणबद्ध गाइड।',
    category: 'irrigation',
    type: 'video',
    duration: 18,
    instructor: 'Eng. Priya Patel',
    instructorHindi: 'इंजी. प्रिया पटेल',
    level: 'beginner',
    rating: 4.7,
    views: 892,
    isBookmarked: false,
    isCompleted: true,
    thumbnailUrl: '/thumbnails/drip-irrigation.jpg',
    contentUrl: '/videos/drip-irrigation.mp4',
    downloadable: true,
    tags: ['irrigation', 'water saving', 'setup guide', 'efficiency'],
    tagsHindi: ['सिंचाई', 'पानी की बचत', 'सेटअप गाइड', 'दक्षता'],
    publishDate: '2025-09-15',
    language: 'hindi'
  },
  {
    id: '3',
    title: 'Government Subsidy Application Process',
    titleHindi: 'सरकारी सब्सिडी आवेदन प्रक्रिया',
    description: 'Complete guide on how to apply for various government agricultural subsidies.',
    descriptionHindi: 'विभिन्न सरकारी कृषि सब्सिडी के लिए आवेदन करने की पूरी गाइड।',
    category: 'subsidy',
    type: 'text',
    instructor: 'Mr. Suresh Kumar',
    instructorHindi: 'श्री सुरेश कुमार',
    level: 'beginner',
    rating: 4.9,
    views: 2150,
    isBookmarked: true,
    isCompleted: false,
    contentUrl: '/documents/subsidy-guide.pdf',
    downloadable: true,
    tags: ['government', 'subsidy', 'application', 'benefits'],
    tagsHindi: ['सरकार', 'सब्सिडी', 'आवेदन', 'लाभ'],
    publishDate: '2025-09-25',
    language: 'hindi'
  },
  {
    id: '4',
    title: 'Soil Health Testing at Home',
    titleHindi: 'घर पर मिट्टी स्वास्थ्य परीक्षण',
    description: 'Learn simple methods to test soil health and fertility at home.',
    descriptionHindi: 'घर पर मिट्टी के स्वास्थ्य और उर्वरता का परीक्षण करने के सरल तरीके सीखें।',
    category: 'fertilizer',
    type: 'audio',
    duration: 15,
    instructor: 'Dr. Kavita Singh',
    instructorHindi: 'डॉ. कविता सिंह',
    level: 'intermediate',
    rating: 4.6,
    views: 675,
    isBookmarked: false,
    isCompleted: false,
    contentUrl: '/audio/soil-testing.mp3',
    downloadable: true,
    tags: ['soil health', 'testing', 'fertility', 'DIY'],
    tagsHindi: ['मिट्टी स्वास्थ्य', 'परीक्षण', 'उर्वरता', 'खुद करें'],
    publishDate: '2025-09-18',
    language: 'hindi'
  }
]

const categoryColors = {
  'pest-control': 'from-[#E53935] to-[#F44336]',
  'irrigation': 'from-[#4DD0E1] to-[#00BCD4]',
  'fertilizer': 'from-[#66BB6A] to-[#4CAF50]',
  'organic': 'from-[#8BC34A] to-[#689F38]',
  'marketing': 'from-[#FFD54F] to-[#FFC107]',
  'subsidy': 'from-[#9C27B0] to-[#7B1FA2]',
  'new-crops': 'from-[#FF9800] to-[#F57C00]'
}

const typeIcons = {
  video: Video,
  audio: Headphones,
  text: FileText,
  image: ImageIcon
}

const levelColors = {
  beginner: 'text-[#66BB6A]',
  intermediate: 'text-[#FFD54F]',
  advanced: 'text-[#E53935]'
}

export function TrainingModule({ isHindi = false }: TrainingModuleProps) {
  const [content] = useState<TrainingContent[]>(mockContent)
  const [selectedContent, setSelectedContent] = useState<TrainingContent | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [completedOnly, setCompletedOnly] = useState(false)

  const filteredContent = content.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false
    if (filterType !== 'all' && item.type !== filterType) return false
    if (filterLevel !== 'all' && item.level !== filterLevel) return false
    if (bookmarkedOnly && !item.isBookmarked) return false
    if (completedOnly && !item.isCompleted) return false
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.titleHindi.includes(searchTerm)) return false
    return true
  })

  const getCategoryText = (category: string) => {
    if (!isHindi) {
      return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
    }
    
    switch (category) {
      case 'pest-control': return 'कीट नियंत्रण'
      case 'irrigation': return 'सिंचाई'
      case 'fertilizer': return 'उर्वरक'
      case 'organic': return 'जैविक'
      case 'marketing': return 'विपणन'
      case 'subsidy': return 'सब्सिडी'
      case 'new-crops': return 'नई फसलें'
      default: return category
    }
  }

  const getLevelText = (level: string) => {
    if (!isHindi) {
      return level.charAt(0).toUpperCase() + level.slice(1)
    }
    
    switch (level) {
      case 'beginner': return 'शुरुआती'
      case 'intermediate': return 'मध्यम'
      case 'advanced': return 'उन्नत'
      default: return level
    }
  }

  const toggleBookmark = (contentId: string) => {
    // Implement bookmark toggle logic
    console.log('Toggle bookmark for:', contentId)
  }

  const markAsCompleted = (contentId: string) => {
    // Implement completion logic
    console.log('Mark as completed:', contentId)
  }

  const downloadContent = (content: TrainingContent) => {
    if (content.downloadable) {
      // Implement download logic
      console.log('Download:', content.title)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] bg-clip-text text-transparent mb-2">
            {isHindi ? 'प्रशिक्षण और वीडियो' : 'Training & Videos'}
          </h1>
          <p className="text-[#B0BEC5]">
            {isHindi 
              ? 'कृषि प्रशिक्षण सामग्री और शैक्षिक वीडियो देखें'
              : 'Access agricultural training materials and educational videos'
            }
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-[#66BB6A]" />
              <span className="text-[#66BB6A] font-medium">{content.length}</span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'कुल सामग्री' : 'Total Content'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-[#4DD0E1]" />
              <span className="text-[#4DD0E1] font-medium">
                {content.filter(c => c.isCompleted).length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'पूर्ण किया गया' : 'Completed'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="w-8 h-8 text-[#FFD54F]" />
              <span className="text-[#FFD54F] font-medium">
                {content.filter(c => c.isBookmarked).length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'बुकमार्क' : 'Bookmarked'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-[#E53935]" />
              <span className="text-[#E53935] font-medium">
                {Math.round(content.reduce((sum, c) => sum + c.rating, 0) / content.length * 10) / 10}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'औसत रेटिंग' : 'Avg Rating'}
            </h3>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B0BEC5]" />
              <input
                type="text"
                placeholder={isHindi ? 'सामग्री खोजें...' : 'Search content...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी श्रेणी' : 'All Categories'}</option>
              <option value="pest-control">{isHindi ? 'कीट नियंत्रण' : 'Pest Control'}</option>
              <option value="irrigation">{isHindi ? 'सिंचाई' : 'Irrigation'}</option>
              <option value="fertilizer">{isHindi ? 'उर्वरक' : 'Fertilizer'}</option>
              <option value="organic">{isHindi ? 'जैविक' : 'Organic'}</option>
              <option value="marketing">{isHindi ? 'विपणन' : 'Marketing'}</option>
              <option value="subsidy">{isHindi ? 'सब्सिडी' : 'Subsidy'}</option>
              <option value="new-crops">{isHindi ? 'नई फसलें' : 'New Crops'}</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी प्रकार' : 'All Types'}</option>
              <option value="video">{isHindi ? 'वीडियो' : 'Video'}</option>
              <option value="audio">{isHindi ? 'ऑडियो' : 'Audio'}</option>
              <option value="text">{isHindi ? 'टेक्स्ट' : 'Text'}</option>
              <option value="image">{isHindi ? 'इमेज' : 'Image'}</option>
            </select>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी स्तर' : 'All Levels'}</option>
              <option value="beginner">{isHindi ? 'शुरुआती' : 'Beginner'}</option>
              <option value="intermediate">{isHindi ? 'मध्यम' : 'Intermediate'}</option>
              <option value="advanced">{isHindi ? 'उन्नत' : 'Advanced'}</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-[#B0BEC5]">
              <span>{isHindi ? 'कुल:' : 'Total:'}</span>
              <span className="text-[#F5F5F5] font-medium">{filteredContent.length}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-[#B0BEC5] cursor-pointer">
              <input
                type="checkbox"
                checked={bookmarkedOnly}
                onChange={(e) => setBookmarkedOnly(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#66BB6A] focus:ring-[#66BB6A]/50"
              />
              {isHindi ? 'केवल बुकमार्क' : 'Bookmarked Only'}
            </label>
            <label className="flex items-center gap-2 text-sm text-[#B0BEC5] cursor-pointer">
              <input
                type="checkbox"
                checked={completedOnly}
                onChange={(e) => setCompletedOnly(e.target.checked)}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#66BB6A] focus:ring-[#66BB6A]/50"
              />
              {isHindi ? 'केवल पूर्ण' : 'Completed Only'}
            </label>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map((item, index) => {
            const TypeIcon = typeIcons[item.type]
            const categoryColor = categoryColors[item.category]
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glassmorphism-dark p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedContent(item)}
              >
                {/* Content Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${categoryColor} flex items-center justify-center`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-[#66BB6A]" />
                    )}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(item.id)
                      }}
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                    >
                      {item.isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-[#FFD54F]" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-[#B0BEC5]" />
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Content Info */}
                <div className="mb-4">
                  <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2 group-hover:text-[#66BB6A] transition-colors duration-300">
                    {isHindi ? item.titleHindi : item.title}
                  </h3>
                  <p className="text-[#B0BEC5] text-sm mb-3 line-clamp-2">
                    {isHindi ? item.descriptionHindi : item.description}
                  </p>
                </div>

                {/* Metadata */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${categoryColor}`}>
                      {getCategoryText(item.category)}
                    </span>
                    <span className={`text-xs font-medium ${levelColors[item.level]}`}>
                      {getLevelText(item.level)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#B0BEC5]">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{isHindi ? item.instructorHindi : item.instructor}</span>
                    </div>
                    {item.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.duration}m</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-[#B0BEC5]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#FFD54F] fill-current" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(isHindi ? item.tagsHindi : item.tags).slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-white/10 rounded-lg text-xs text-[#B0BEC5]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] py-2 px-4 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {item.type === 'video' ? (isHindi ? 'देखें' : 'Watch') : 
                     item.type === 'audio' ? (isHindi ? 'सुनें' : 'Listen') : 
                     (isHindi ? 'पढ़ें' : 'Read')}
                  </motion.button>
                  
                  {item.downloadable && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadContent(item)
                      }}
                      className="px-3 py-2 bg-white/10 text-[#B0BEC5] rounded-lg hover:bg-white/20 hover:text-[#F5F5F5] transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredContent.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#B0BEC5]" />
            </div>
            <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
              {isHindi ? 'कोई सामग्री नहीं मिली' : 'No Content Found'}
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