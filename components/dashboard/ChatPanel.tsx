'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Bot, User, Phone, FileText, X } from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'advisor' | 'bot'
  timestamp: Date
  type?: 'text' | 'audio' | 'image' | 'document'
}

interface ChatPanelProps {
  role: string
  isOpen: boolean
  onClose: () => void
}

const mockMessages: Record<string, Message[]> = {
  farmer: [
    {
      id: '1',
      content: 'Good morning! I notice your wheat crop is in the flowering stage. Here are some important care tips for optimal yield.',
      sender: 'advisor',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: '2', 
      content: 'Thank you for the advice! Should I increase irrigation frequency?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    }
  ],
  officer: [
    {
      id: '1',
      content: 'Farmer Raj Kumar from Village Kheda is asking about pest control for cotton. Please provide guidance.',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 45)
    }
  ],
  govt: [
    {
      id: '1',
      content: 'Monthly report: 1,245 farmers enrolled in new subsidy scheme. Extension officer feedback requested.',
      sender: 'bot',
      timestamp: new Date(Date.now() - 1000 * 60 * 60)
    }
  ]
}

export function ChatPanel({ role, isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages[role] || [])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAutoResponse(role, newMessage),
        sender: role === 'farmer' ? 'advisor' : 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 2000)
  }

  const getAutoResponse = (userRole: string, message: string): string => {
    const responses = {
      farmer: [
        'Thank you for your question. Based on current weather conditions and your crop stage, I recommend...',
        'I understand your concern. Let me connect you with our local extension officer for detailed guidance.',
        'Great observation! For your soil type and crop variety, the best approach would be...'
      ],
      officer: [
        'Request received. I\'ll prioritize this farmer query and provide advisory within 2 hours.',
        'Added to field visit schedule. Estimated visit date: Tomorrow 10 AM.',
        'Advisory sent to farmer group. Tracking engagement and feedback.'
      ],
      govt: [
        'Data compiled and added to monthly dashboard. Impact metrics updated.',
        'Policy recommendation noted. Forwarding to planning committee.',
        'Resource allocation approved. Distributing to regional officers.'
      ]
    }
    
    const roleResponses = responses[userRole as keyof typeof responses] || responses.farmer
    return roleResponses[Math.floor(Math.random() * roleResponses.length)]
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1A1A1A]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#66BB6A]/20 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-[#66BB6A]" />
                  </div>
                  <div>
                    <h3 className="text-[#F5F5F5] font-semibold">
                      {role === 'farmer' ? 'Advisory Support' : 
                       role === 'officer' ? 'Farmer Communications' :
                       'System Messages'}
                    </h3>
                    <p className="text-[#B0BEC5] text-sm">
                      {role === 'farmer' ? 'Get instant farming guidance' :
                       role === 'officer' ? 'Manage farmer queries' :
                       'Updates and notifications'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-[#B0BEC5]" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[80%] p-3 rounded-2xl
                    ${message.sender === 'user' 
                      ? 'bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D]' 
                      : 'glassmorphism-dark text-[#F5F5F5] border border-white/10'
                    }
                  `}>
                    <div className="flex items-start gap-2">
                      {message.sender !== 'user' && (
                        <div className="flex-shrink-0 mt-1">
                          {message.sender === 'bot' ? (
                            <Bot className="w-4 h-4 text-[#4DD0E1]" />
                          ) : (
                            <User className="w-4 h-4 text-[#66BB6A]" />
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`
                          text-xs mt-1 opacity-70
                          ${message.sender === 'user' ? 'text-[#0D0D0D]' : 'text-[#B0BEC5]'}
                        `}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-start"
                  >
                    <div className="glassmorphism-dark p-3 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#4DD0E1]" />
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-2 h-2 bg-[#4DD0E1] rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={
                    role === 'farmer' ? 'Ask about your crops...' :
                    role === 'officer' ? 'Send advisory message...' :
                    'Enter your message...'
                  }
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Quick Actions */}
              {role === 'farmer' && (
                <div className="flex gap-2 mt-3">
                  {[
                    { icon: Phone, label: 'Call Expert' },
                    { icon: FileText, label: 'Weather Report' }
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-[#B0BEC5] hover:text-[#F5F5F5] hover:border-[#66BB6A]/30 transition-all duration-300 text-sm"
                    >
                      <action.icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}