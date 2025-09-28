'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff,
  Paperclip,
  Phone,
  Video,
  User,
  Bot,
  Clock,
  CheckCircle,
  Settings,
  Search,
  Filter,
  MapPin,
  Star,
  MoreVertical
} from 'lucide-react'

interface Message {
  id: string
  senderId: string
  senderName: string
  senderNameHindi: string
  senderType: 'farmer' | 'expert' | 'officer' | 'ngo' | 'bot'
  content: string
  contentHindi?: string
  timestamp: string
  type: 'text' | 'audio' | 'image' | 'file'
  audioUrl?: string
  imageUrl?: string
  fileUrl?: string
  isRead: boolean
  replyTo?: string
}

interface ChatContact {
  id: string
  name: string
  nameHindi: string
  role: string
  roleHindi: string
  type: 'expert' | 'officer' | 'ngo' | 'support'
  avatar?: string
  isOnline: boolean
  lastSeen?: string
  specialization: string
  specializationHindi: string
  rating: number
  location: string
  locationHindi: string
  unreadCount: number
  lastMessage?: Message
}

interface ChatSupportModuleProps {
  isHindi?: boolean
}

const mockContacts: ChatContact[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    nameHindi: 'डॉ. राजेश कुमार',
    role: 'Agricultural Extension Officer',
    roleHindi: 'कृषि विस्तार अधिकारी',
    type: 'officer',
    isOnline: true,
    specialization: 'Crop Management',
    specializationHindi: 'फसल प्रबंधन',
    rating: 4.8,
    location: 'Ludhiana, Punjab',
    locationHindi: 'लुधियाना, पंजाब',
    unreadCount: 2
  },
  {
    id: '2',
    name: 'Prof. Meera Singh',
    nameHindi: 'प्रो. मीरा सिंह',
    role: 'Soil Health Expert',
    roleHindi: 'मृदा स्वास्थ्य विशेषज्ञ',
    type: 'expert',
    isOnline: false,
    lastSeen: '2025-09-28T10:30:00Z',
    specialization: 'Soil Analysis',
    specializationHindi: 'मृदा विश्लेषण',
    rating: 4.9,
    location: 'Chandigarh',
    locationHindi: 'चंडीगढ़',
    unreadCount: 0
  },
  {
    id: '3',
    name: 'Green Future NGO',
    nameHindi: 'ग्रीन फ्यूचर एनजीओ',
    role: 'Agricultural Support',
    roleHindi: 'कृषि सहायता',
    type: 'ngo',
    isOnline: true,
    specialization: 'Organic Farming',
    specializationHindi: 'जैविक खेती',
    rating: 4.7,
    location: 'Delhi',
    locationHindi: 'दिल्ली',
    unreadCount: 1
  },
  {
    id: 'bot',
    name: 'AgriWise Assistant',
    nameHindi: 'एग्रीवाइज सहायक',
    role: 'AI Assistant',
    roleHindi: 'एआई सहायक',
    type: 'support',
    isOnline: true,
    specialization: '24/7 Support',
    specializationHindi: '24/7 सहायता',
    rating: 4.5,
    location: 'Always Available',
    locationHindi: 'हमेशा उपलब्ध',
    unreadCount: 0
  }
]

const mockMessages: { [key: string]: Message[] } = {
  '1': [
    {
      id: '1',
      senderId: '1',
      senderName: 'Dr. Rajesh Kumar',
      senderNameHindi: 'डॉ. राजेश कुमार',
      senderType: 'officer',
      content: 'Good morning! I saw your query about wheat pest control. The brown plant hopper you mentioned is indeed a concern this season.',
      contentHindi: 'सुप्रभात! मैंने गेहूं के कीट नियंत्रण के बारे में आपका सवाल देखा। आपने जिस भूरे पौधे फुदके का उल्लेख किया है, वह वास्तव में इस मौसम में चिंता का विषय है।',
      timestamp: '2025-09-28T09:00:00Z',
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: 'farmer',
      senderName: 'You',
      senderNameHindi: 'आप',
      senderType: 'farmer',
      content: 'Yes, I noticed them yesterday. What should I do immediately?',
      contentHindi: 'हाँ, मैंने कल उन्हें देखा था। मुझे तुरंत क्या करना चाहिए?',
      timestamp: '2025-09-28T09:05:00Z',
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Dr. Rajesh Kumar',
      senderNameHindi: 'डॉ. राजेश कुमार',
      senderType: 'officer',
      content: 'Apply Imidacloprid 17.8 SL @ 0.3ml per liter of water. Spray in evening hours. Avoid spraying during flowering stage.',
      contentHindi: 'इमिडाक्लोप्रिड 17.8 एसएल @ 0.3 मिली प्रति लीटर पानी का छिड़काव करें। शाम के समय छिड़काव करें। फूल आने के समय छिड़काव से बचें।',
      timestamp: '2025-09-28T09:10:00Z',
      type: 'text',
      isRead: false
    }
  ]
}

export function ChatSupportModule({ isHindi = false }: ChatSupportModuleProps) {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(mockContacts[0])
  const [messages, setMessages] = useState<Message[]>(mockMessages['1'] || [])
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const filteredContacts = mockContacts.filter(contact => {
    if (filterType !== 'all' && contact.type !== filterType) return false
    if (searchTerm && !contact.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !contact.nameHindi.includes(searchTerm)) return false
    return true
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'farmer',
      senderName: 'You',
      senderNameHindi: 'आप',
      senderType: 'farmer',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: true
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedContact.id,
        senderName: selectedContact.name,
        senderNameHindi: selectedContact.nameHindi,
        senderType: selectedContact.type as any,
        content: isHindi ? 'मैं आपकी मदद करूंगा। कृपया अधिक विवरण दें।' : 'I will help you with that. Please provide more details.',
        timestamp: new Date().toISOString(),
        type: 'text',
        isRead: false
      }
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic
  }

  const selectContact = (contact: ChatContact) => {
    setSelectedContact(contact)
    setMessages(mockMessages[contact.id] || [])
  }

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case 'expert': return 'text-[#66BB6A]'
      case 'officer': return 'text-[#4DD0E1]'
      case 'ngo': return 'text-[#FFD54F]'
      case 'support': return 'text-[#9C27B0]'
      default: return 'text-[#B0BEC5]'
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
            {isHindi ? 'विशेषज्ञ सहायता' : 'Expert Support'}
          </h1>
          <p className="text-[#B0BEC5]">
            {isHindi 
              ? 'कृषि विशेषज्ञों, अधिकारियों और एनजीओ से सीधे बात करें'
              : 'Connect directly with agricultural experts, officers and NGOs'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1 glassmorphism-dark rounded-2xl border border-white/10 flex flex-col">
            {/* Search and Filter */}
            <div className="p-4 border-b border-white/10">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B0BEC5]" />
                <input
                  type="text"
                  placeholder={isHindi ? 'संपर्क खोजें...' : 'Search contacts...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg text-[#F5F5F5] placeholder-[#B0BEC5] text-sm focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-[#F5F5F5] text-sm focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              >
                <option value="all">{isHindi ? 'सभी' : 'All'}</option>
                <option value="expert">{isHindi ? 'विशेषज्ञ' : 'Experts'}</option>
                <option value="officer">{isHindi ? 'अधिकारी' : 'Officers'}</option>
                <option value="ngo">{isHindi ? 'एनजीओ' : 'NGOs'}</option>
                <option value="support">{isHindi ? 'सहायता' : 'Support'}</option>
              </select>
            </div>

            {/* Contacts List */}
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  whileHover={{ x: 4 }}
                  onClick={() => selectContact(contact)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-all duration-300 ${
                    selectedContact?.id === contact.id
                      ? 'bg-[#66BB6A]/10 border-l-4 border-l-[#66BB6A]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-full flex items-center justify-center">
                        {contact.type === 'support' ? (
                          <Bot className="w-5 h-5 text-[#0D0D0D]" />
                        ) : (
                          <User className="w-5 h-5 text-[#0D0D0D]" />
                        )}
                      </div>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#66BB6A] rounded-full border-2 border-[#1A1A1A]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-[#F5F5F5] font-medium text-sm truncate">
                          {isHindi ? contact.nameHindi : contact.name}
                        </h3>
                        {contact.unreadCount > 0 && (
                          <span className="bg-[#E53935] text-white text-xs px-2 py-0.5 rounded-full font-medium min-w-[20px] text-center">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${getContactTypeColor(contact.type)} mb-1`}>
                        {isHindi ? contact.roleHindi : contact.role}
                      </p>
                      <p className="text-[#B0BEC5] text-xs truncate">
                        {isHindi ? contact.specializationHindi : contact.specialization}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-[#FFD54F] fill-current" />
                        <span className="text-[#B0BEC5] text-xs">{contact.rating}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 glassmorphism-dark rounded-2xl border border-white/10 flex flex-col">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-full flex items-center justify-center">
                        {selectedContact.type === 'support' ? (
                          <Bot className="w-6 h-6 text-[#0D0D0D]" />
                        ) : (
                          <User className="w-6 h-6 text-[#0D0D0D]" />
                        )}
                      </div>
                      {selectedContact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#66BB6A] rounded-full border-2 border-[#1A1A1A]" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-[#F5F5F5] font-semibold">
                        {isHindi ? selectedContact.nameHindi : selectedContact.name}
                      </h2>
                      <p className={`text-sm ${getContactTypeColor(selectedContact.type)}`}>
                        {isHindi ? selectedContact.roleHindi : selectedContact.role}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#B0BEC5]">
                        {selectedContact.isOnline ? (
                          <span className="text-[#66BB6A]">{isHindi ? 'ऑनलाइन' : 'Online'}</span>
                        ) : (
                          <span>{isHindi ? 'अंतिम देखा:' : 'Last seen:'} {selectedContact.lastSeen ? formatTime(selectedContact.lastSeen) : 'N/A'}</span>
                        )}
                        <MapPin className="w-3 h-3" />
                        <span>{isHindi ? selectedContact.locationHindi : selectedContact.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20 transition-all duration-300"
                    >
                      <Video className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20 transition-all duration-300"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`flex ${message.senderType === 'farmer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.senderType === 'farmer'
                            ? 'bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D]'
                            : 'bg-white/10 text-[#F5F5F5]'
                        } p-4 rounded-2xl ${
                          message.senderType === 'farmer' 
                            ? 'rounded-br-sm' 
                            : 'rounded-bl-sm'
                        }`}>
                          <p className="text-sm leading-relaxed">
                            {isHindi && message.contentHindi ? message.contentHindi : message.content}
                          </p>
                          <div className={`flex items-center justify-between mt-2 text-xs ${
                            message.senderType === 'farmer' 
                              ? 'text-[#0D0D0D]/70' 
                              : 'text-[#B0BEC5]'
                          }`}>
                            <span>{formatTime(message.timestamp)}</span>
                            {message.senderType === 'farmer' && (
                              <div className="flex items-center gap-1">
                                {message.isRead ? (
                                  <CheckCircle className="w-3 h-3" />
                                ) : (
                                  <Clock className="w-3 h-3" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20 transition-all duration-300"
                    >
                      <Paperclip className="w-5 h-5" />
                    </motion.button>

                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder={isHindi ? 'संदेश लिखें...' : 'Type a message...'}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleRecording}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isRecording
                          ? 'bg-[#E53935] text-white'
                          : 'bg-white/10 text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/20'
                      }`}
                    >
                      {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="w-10 h-10 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-full flex items-center justify-center text-[#0D0D0D] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-[#B0BEC5] mx-auto mb-4" />
                  <h3 className="text-[#F5F5F5] font-semibold text-xl mb-2">
                    {isHindi ? 'बातचीत शुरू करें' : 'Start a Conversation'}
                  </h3>
                  <p className="text-[#B0BEC5]">
                    {isHindi 
                      ? 'एक संपर्क चुनें और विशेषज्ञों से बात करना शुरू करें'
                      : 'Select a contact and start chatting with experts'
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}