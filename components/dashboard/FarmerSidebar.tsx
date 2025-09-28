'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Sprout, 
  Cloud, 
  Coins, 
  Package, 
  MessageCircle, 
  BookOpen, 
  MessageSquare,
  User,
  Globe,
  Mic,
  MicOff,
  Volume2,
  ChevronRight,
  Bell,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SidebarItem {
  id: string
  title: string
  titleHindi: string
  icon: React.ComponentType<any>
  route: string
  description: string
  descriptionHindi: string
  badge?: number
}

interface FarmerSidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentRoute?: string
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'advisories',
    title: 'Crop Advisories',
    titleHindi: 'फसल सलाह',
    icon: Sprout,
    route: '/dashboard/farmer/advisories',
    description: 'Personalized farming advice',
    descriptionHindi: 'व्यक्तिगत कृषि सलाह',
    badge: 3
  },
  {
    id: 'schemes',
    title: 'Schemes & Subsidies',
    titleHindi: 'योजनाएं और सब्सिडी',
    icon: BookOpen,
    route: '/dashboard/farmer/schemes',
    description: 'Government benefits',
    descriptionHindi: 'सरकारी लाभ',
    badge: 2
  },
  {
    id: 'market',
    title: 'Market Prices',
    titleHindi: 'बाज़ार भाव',
    icon: Coins,
    route: '/dashboard/farmer/market',
    description: 'Live mandi rates',
    descriptionHindi: 'लाइव मंडी दरें'
  },
  {
    id: 'resources',
    title: 'Resources & Requests',
    titleHindi: 'संसाधन और अनुरोध',
    icon: Package,
    route: '/dashboard/farmer/resources',
    description: 'Seeds, fertilizers, tools',
    descriptionHindi: 'बीज, उर्वरक, औजार'
  },
  {
    id: 'chat',
    title: 'Expert Support',
    titleHindi: 'विशेषज्ञ सहायता',
    icon: MessageCircle,
    route: '/dashboard/farmer/chat',
    description: 'Chat with experts',
    descriptionHindi: 'विशेषज्ञों से बात करें',
    badge: 1
  },
  {
    id: 'training',
    title: 'Training & Videos',
    titleHindi: 'प्रशिक्षण और वीडियो',
    icon: Cloud,
    route: '/dashboard/farmer/training',
    description: 'Learning resources',
    descriptionHindi: 'सीखने के संसाधन'
  },
  {
    id: 'feedback',
    title: 'Feedback & Grievances',
    titleHindi: 'फीडबैक और शिकायतें',
    icon: MessageSquare,
    route: '/dashboard/farmer/feedback',
    description: 'Submit complaints',
    descriptionHindi: 'शिकायत दर्ज करें'
  },
  {
    id: 'profile',
    title: 'My Profile',
    titleHindi: 'मेरी प्रोफ़ाइल',
    icon: User,
    route: '/dashboard/farmer/profile',
    description: 'Manage account',
    descriptionHindi: 'खाता प्रबंधन'
  }
]

export function FarmerSidebar({ isOpen, onToggle, currentRoute }: FarmerSidebarProps) {
  const [isHindi, setIsHindi] = useState(false)
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const router = useRouter()

  const toggleLanguage = () => {
    setIsHindi(!isHindi)
  }

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive)
    if (!isVoiceActive) {
      setIsListening(true)
      // Simulate voice recognition
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  const handleItemClick = (item: SidebarItem) => {
    router.push(item.route)
    if (window.innerWidth < 1024) {
      onToggle()
    }
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    }
  }

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] backdrop-blur-xl border-r border-white/10 z-50 lg:relative lg:translate-x-0"
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-[#0D0D0D]" />
                </div>
                <div>
                  <h2 className="text-[#F5F5F5] font-bold text-lg">
                    {isHindi ? 'कृषि सहायक' : 'AgriWise'}
                  </h2>
                  <p className="text-[#B0BEC5] text-xs">
                    {isHindi ? 'किसान डैशबोर्ड' : 'Farmer Dashboard'}
                  </p>
                </div>
              </motion.div>
              
              <button
                onClick={onToggle}
                className="lg:hidden w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language and Voice Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  isHindi 
                    ? 'bg-[#66BB6A]/20 text-[#66BB6A] border border-[#66BB6A]/30' 
                    : 'bg-white/10 text-[#B0BEC5] border border-white/20 hover:border-[#66BB6A]/30'
                }`}
              >
                <Globe className="w-4 h-4" />
                {isHindi ? 'हिं' : 'EN'}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleVoice}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  isVoiceActive 
                    ? 'bg-[#66BB6A]/20 text-[#66BB6A] border border-[#66BB6A]/30' 
                    : 'bg-white/10 text-[#B0BEC5] border border-white/20 hover:border-[#66BB6A]/30'
                }`}
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Mic className="w-4 h-4" />
                  </motion.div>
                ) : isVoiceActive ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-2">
              {sidebarItems.map((item, index) => {
                const isActive = currentRoute === item.route
                const Icon = item.icon
                
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-[#66BB6A]/20 to-[#FFD54F]/20 border border-[#66BB6A]/30 shadow-lg shadow-[#66BB6A]/10'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#66BB6A]/30 hover:shadow-lg hover:shadow-[#66BB6A]/5'
                      }`}
                    >
                      {/* Glow effect */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-[#66BB6A]/10 to-[#FFD54F]/10 blur-xl"
                        />
                      )}
                      
                      <div className="relative flex items-center gap-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D]' 
                            : 'bg-white/10 text-[#66BB6A] group-hover:bg-white/20'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold text-sm ${
                              isActive ? 'text-[#F5F5F5]' : 'text-[#B0BEC5] group-hover:text-[#F5F5F5]'
                            }`}>
                              {isHindi ? item.titleHindi : item.title}
                            </h3>
                            {item.badge && (
                              <span className="bg-[#E53935] text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className={`text-xs ${
                            isActive ? 'text-[#B0BEC5]' : 'text-[#666] group-hover:text-[#B0BEC5]'
                          }`}>
                            {isHindi ? item.descriptionHindi : item.description}
                          </p>
                        </div>
                        
                        <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                          isActive 
                            ? 'text-[#66BB6A] rotate-90' 
                            : 'text-[#666] group-hover:text-[#B0BEC5] group-hover:translate-x-1'
                        }`} />
                      </div>
                    </motion.button>
                  </motion.div>
                )
              })}
            </nav>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 border-t border-white/10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-[#E53935]/20 to-[#FF5722]/20 border border-[#E53935]/30 rounded-xl text-left"
            >
              <div className="w-10 h-10 bg-[#E53935] rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-[#F5F5F5] font-semibold text-sm">
                  {isHindi ? 'आपातकालीन सहायता' : 'Emergency Help'}
                </h3>
                <p className="text-[#B0BEC5] text-xs">
                  {isHindi ? 'तुरंत सहायता के लिए कॉल करें' : 'Call for immediate assistance'}
                </p>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  )
}