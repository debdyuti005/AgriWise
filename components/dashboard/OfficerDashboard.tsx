'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  BookOpen, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { OverviewCard } from '@/components/dashboard/OverviewCard'
import { ChatPanel } from '@/components/dashboard/ChatPanel'
import { ReportExportButton } from '@/components/dashboard/ReportExportButton'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'

// Mock data for officer dashboard
const engagementData = [
  { name: 'Jan', value: 145 },
  { name: 'Feb', value: 162 },
  { name: 'Mar', value: 178 },
  { name: 'Apr', value: 195 },
  { name: 'May', value: 203 },
  { name: 'Jun', value: 218 }
]

const responseData = [
  { name: 'Mon', value: 89 },
  { name: 'Tue', value: 92 },
  { name: 'Wed', value: 87 },
  { name: 'Thu', value: 94 },
  { name: 'Fri', value: 91 },
  { name: 'Sat', value: 88 },
  { name: 'Sun', value: 85 }
]

const farmersList = [
  {
    id: 1,
    name: 'Raj Kumar Singh',
    village: 'Kheda',
    crop: 'Wheat, Rice',
    landSize: '3.5 acres',
    lastContact: '2 days ago',
    status: 'active',
    phone: '+91 98765 43210',
    issues: 2
  },
  {
    id: 2,
    name: 'Priya Sharma',
    village: 'Madhupura',
    crop: 'Cotton, Sugarcane',
    landSize: '5.2 acres',
    lastContact: '1 week ago',
    status: 'inactive',
    phone: '+91 98765 43211',
    issues: 0
  },
  {
    id: 3,
    name: 'Amit Patel',
    village: 'Sunderpur',
    crop: 'Tomato, Onion',
    landSize: '2.1 acres',
    lastContact: '3 hours ago',
    status: 'urgent',
    phone: '+91 98765 43212',
    issues: 5
  }
]

const activeQueries = [
  {
    id: 1,
    farmer: 'Raj Kumar Singh',
    query: 'Wheat crop showing yellowing leaves. Need immediate advice.',
    priority: 'high',
    time: '30 mins ago',
    category: 'pest-disease'
  },
  {
    id: 2,
    farmer: 'Amit Patel',
    query: 'Best time for tomato harvesting in current weather?',
    priority: 'medium',
    time: '2 hours ago',
    category: 'harvesting'
  },
  {
    id: 3,
    farmer: 'Suresh Yadav',
    query: 'Fertilizer recommendation for cotton flowering stage.',
    priority: 'low',
    time: '5 hours ago',
    category: 'fertilizer'
  }
]

const fieldVisits = [
  {
    id: 1,
    farmer: 'Raj Kumar Singh',
    date: '2024-01-15',
    time: '10:00 AM',
    purpose: 'Pest inspection',
    status: 'scheduled'
  },
  {
    id: 2,
    farmer: 'Priya Sharma',
    date: '2024-01-16',
    time: '2:00 PM',
    purpose: 'Irrigation setup',
    status: 'completed'
  },
  {
    id: 3,
    farmer: 'Amit Patel',
    date: '2024-01-17',
    time: '11:00 AM',
    purpose: 'Soil testing',
    status: 'pending'
  }
]

export function OfficerDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'farmers' | 'queries' | 'visits'>('farmers')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFarmers = farmersList.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.village.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#66BB6A] opacity-3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#4DD0E1] opacity-3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1] bg-clip-text text-transparent">
                Extension Officer Dashboard
              </h1>
              <p className="text-[#B0BEC5] mt-2">
                Manage farmers, provide guidance, and track field activities.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ReportExportButton 
                reportType="Activity Report" 
                role="officer"
                fileName="officer-activity-report"
              />
              <motion.button
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1] text-[#0D0D0D] rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-[#66BB6A]/25 transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5" />
                Broadcast Message
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <OverviewCard
            title="Farmers Assigned"
            value="218"
            subtitle="Active farmers"
            icon={Users}
            trend={{ value: 8.2, isPositive: true }}
            color="primary"
          />
          <OverviewCard
            title="Active Queries"
            value="47"
            subtitle="Pending responses"
            icon={MessageSquare}
            trend={{ value: 15.3, isPositive: false }}
            color="accent"
          />
          <OverviewCard
            title="Field Visits"
            value="23"
            subtitle="This month"
            icon={Calendar}
            trend={{ value: 12.1, isPositive: true }}
            color="secondary"
          />
          <OverviewCard
            title="Knowledge Base"
            value="156"
            subtitle="Articles shared"
            icon={BookOpen}
            trend={{ value: 6.8, isPositive: true }}
            color="primary"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Engagement Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnalyticsCharts
                data={engagementData}
                chartType="line"
                title="Farmer Engagement Trends"
                color="#66BB6A"
                height={300}
              />
            </motion.div>

            {/* Response Rate */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalyticsCharts
                data={responseData}
                chartType="bar"
                title="Weekly Response Rate (%)"
                color="#4DD0E1"
                height={250}
              />
            </motion.div>

            {/* Management Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              {/* Tab Navigation */}
              <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl">
                {[
                  { id: 'farmers', label: 'Farmer Directory', icon: Users },
                  { id: 'queries', label: 'Active Queries', icon: MessageSquare },
                  { id: 'visits', label: 'Field Visits', icon: Calendar }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex-1 justify-center
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1] text-[#0D0D0D]' 
                        : 'text-[#B0BEC5] hover:text-[#F5F5F5] hover:bg-white/5'
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'farmers' && (
                <div className="space-y-4">
                  {/* Search Bar */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B0BEC5]" />
                      <input
                        type="text"
                        placeholder="Search farmers by name or village..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A] focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-300"
                      />
                    </div>
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-[#66BB6A]/30 transition-colors duration-300">
                      <Filter className="w-4 h-4 text-[#B0BEC5]" />
                    </button>
                  </div>

                  {/* Farmers List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {filteredFarmers.map((farmer) => (
                      <div key={farmer.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#66BB6A]/30 transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-[#F5F5F5] font-medium">{farmer.name}</h4>
                              <span className={`
                                px-2 py-1 rounded text-xs font-medium
                                ${farmer.status === 'active' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                                  farmer.status === 'urgent' ? 'bg-[#E53935]/20 text-[#E53935]' :
                                  'bg-[#B0BEC5]/20 text-[#B0BEC5]'
                                }
                              `}>
                                {farmer.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-[#B0BEC5]">
                              <div>
                                <span className="block">Village: {farmer.village}</span>
                                <span className="block">Crops: {farmer.crop}</span>
                              </div>
                              <div>
                                <span className="block">Land: {farmer.landSize}</span>
                                <span className="block">Last contact: {farmer.lastContact}</span>
                              </div>
                            </div>
                            {farmer.issues > 0 && (
                              <div className="mt-2 text-[#E53935] text-sm font-medium">
                                {farmer.issues} pending issues
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-[#66BB6A]/20 rounded-lg hover:bg-[#66BB6A]/30 transition-colors duration-300">
                              <Phone className="w-4 h-4 text-[#66BB6A]" />
                            </button>
                            <button className="p-2 bg-[#4DD0E1]/20 rounded-lg hover:bg-[#4DD0E1]/30 transition-colors duration-300">
                              <MessageSquare className="w-4 h-4 text-[#4DD0E1]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'queries' && (
                <div className="space-y-4">
                  {activeQueries.map((query) => (
                    <div key={query.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[#F5F5F5] font-medium">{query.farmer}</h4>
                          <span className="text-[#B0BEC5] text-sm">{query.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${query.priority === 'high' ? 'bg-[#E53935]/20 text-[#E53935]' :
                              query.priority === 'medium' ? 'bg-[#FFD54F]/20 text-[#FFD54F]' :
                              'bg-[#66BB6A]/20 text-[#66BB6A]'
                            }
                          `}>
                            {query.priority}
                          </span>
                          <span className="px-2 py-1 bg-[#4DD0E1]/20 text-[#4DD0E1] rounded text-xs font-medium">
                            {query.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#B0BEC5] text-sm mb-3">{query.query}</p>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#66BB6A]/20 text-[#66BB6A] rounded text-sm font-medium hover:bg-[#66BB6A]/30 transition-colors duration-300">
                          Respond
                        </button>
                        <button className="px-3 py-1 bg-[#4DD0E1]/20 text-[#4DD0E1] rounded text-sm font-medium hover:bg-[#4DD0E1]/30 transition-colors duration-300">
                          Schedule Visit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'visits' && (
                <div className="space-y-4">
                  {fieldVisits.map((visit) => (
                    <div key={visit.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[#F5F5F5] font-medium">{visit.farmer}</h4>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium flex items-center gap-1
                          ${visit.status === 'completed' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            visit.status === 'scheduled' ? 'bg-[#4DD0E1]/20 text-[#4DD0E1]' :
                            'bg-[#FFD54F]/20 text-[#FFD54F]'
                          }
                        `}>
                          {visit.status === 'completed' && <CheckCircle className="w-3 h-3" />}
                          {visit.status === 'scheduled' && <Clock className="w-3 h-3" />}
                          {visit.status === 'pending' && <AlertTriangle className="w-3 h-3" />}
                          {visit.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-[#B0BEC5]">
                        <div>Date: {visit.date}</div>
                        <div>Time: {visit.time}</div>
                        <div>Purpose: {visit.purpose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Regional Analytics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#FFD54F]/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#FFD54F]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Regional Stats</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-[#B0BEC5]">Crop Health</span>
                  <span className="text-[#66BB6A] font-medium">92%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-[#B0BEC5]">Pest Incidents</span>
                  <span className="text-[#E53935] font-medium">8</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-[#B0BEC5]">Weather Alerts</span>
                  <span className="text-[#FFD54F] font-medium">3</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-[#B0BEC5]">Engagement Rate</span>
                  <span className="text-[#4DD0E1] font-medium">89%</span>
                </div>
              </div>
            </motion.div>

            {/* Knowledge Base Manager */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4DD0E1]/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#4DD0E1]" />
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold">Knowledge Base</h3>
                </div>
                <button className="px-3 py-1 bg-[#66BB6A]/20 text-[#66BB6A] rounded text-sm font-medium hover:bg-[#66BB6A]/30 transition-colors duration-300">
                  Add Article
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  'Wheat Disease Management',
                  'Organic Fertilizer Guide',
                  'Irrigation Best Practices',
                  'Pest Control Methods'
                ].map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-[#F5F5F5] text-sm">{article}</span>
                    <div className="flex gap-2">
                      <button className="text-[#4DD0E1] hover:text-[#66BB6A] transition-colors duration-300">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-[#F5F5F5] font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: MessageSquare, label: 'Broadcast Advisory', color: '#66BB6A' },
                  { icon: Calendar, label: 'Schedule Field Visit', color: '#FFD54F' },
                  { icon: TrendingUp, label: 'Generate Report', color: '#4DD0E1' },
                  { icon: AlertTriangle, label: 'Send Weather Alert', color: '#E53935' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#66BB6A]/30 transition-all duration-300 group"
                  >
                    <action.icon 
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                      style={{ color: action.color }}
                    />
                    <span className="text-[#B0BEC5] text-sm font-medium group-hover:text-[#F5F5F5] transition-colors duration-300">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      <ChatPanel 
        role="officer" 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  )
}