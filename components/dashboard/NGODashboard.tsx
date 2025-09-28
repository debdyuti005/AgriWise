'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Package, 
  GraduationCap, 
  Users, 
  TrendingUp, 
  MessageCircle,
  MapPin,
  Filter,
  Search,
  Upload,
  BarChart3,
  HandHeart,
  FileText,
  Calendar,
  Phone,
  Mail,
  Target,
  Award
} from 'lucide-react'
import { OverviewCard } from '@/components/dashboard/OverviewCard'
import { ChatPanel } from '@/components/dashboard/ChatPanel'
import { ReportExportButton } from '@/components/dashboard/ReportExportButton'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'

// Mock data for NGO dashboard
const impactData = [
  { name: 'Jan', value: 150 },
  { name: 'Feb', value: 180 },
  { name: 'Mar', value: 220 },
  { name: 'Apr', value: 280 },
  { name: 'May', value: 320 },
  { name: 'Jun', value: 380 }
]

const engagementData = [
  { name: 'Training', value: 45 },
  { name: 'Resources', value: 35 },
  { name: 'Surveys', value: 15 },
  { name: 'Collaboration', value: 25 }
]

const farmerProfiles = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    village: 'Kheda',
    crop: 'Wheat, Rice',
    landSize: '2.5 acres',
    vulnerability: 'high',
    lastSupport: '1 week ago',
    needsAssessment: 8.5,
    phone: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Sunita Devi',
    village: 'Madhupura',
    crop: 'Cotton, Vegetables',
    landSize: '1.8 acres',
    vulnerability: 'medium',
    lastSupport: '3 days ago',
    needsAssessment: 6.2,
    phone: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'Mohan Singh',
    village: 'Sunderpur',
    crop: 'Sugarcane, Mustard',
    landSize: '4.1 acres',
    vulnerability: 'low',
    lastSupport: '2 weeks ago',
    needsAssessment: 4.1,
    phone: '+91 98765 43212'
  }
]

const resourceDistribution = [
  {
    id: 1,
    resource: 'Improved Seeds',
    quantity: '500 kg',
    beneficiaries: 125,
    village: 'Kheda',
    date: '2024-01-10',
    status: 'completed'
  },
  {
    id: 2,
    resource: 'Organic Fertilizer',
    quantity: '300 bags',
    beneficiaries: 89,
    village: 'Madhupura',
    date: '2024-01-15',
    status: 'in-progress'
  },
  {
    id: 3,
    resource: 'Farming Tools',
    quantity: '50 sets',
    beneficiaries: 50,
    village: 'Sunderpur',
    date: '2024-01-20',
    status: 'planned'
  }
]

const trainingPrograms = [
  {
    id: 1,
    title: 'Organic Farming Techniques',
    type: 'Workshop',
    participants: 45,
    date: '2024-01-25',
    status: 'scheduled',
    materials: ['PDF Guide', 'Video Tutorial', 'Audio Instructions']
  },
  {
    id: 2,
    title: 'Water Conservation Methods',
    type: 'Field Demo',
    participants: 32,
    date: '2024-01-22',
    status: 'completed',
    materials: ['Video Recording', 'Practice Manual']
  },
  {
    id: 3,
    title: 'Financial Literacy for Farmers',
    type: 'Online Session',
    participants: 78,
    date: '2024-01-30',
    status: 'upcoming',
    materials: ['Presentation', 'Audio Guide', 'Worksheet']
  }
]

export function NGODashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'profiles' | 'resources' | 'training' | 'surveys'>('profiles')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVulnerability, setSelectedVulnerability] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const filteredFarmers = farmerProfiles.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         farmer.village.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVulnerability = selectedVulnerability === 'all' || farmer.vulnerability === selectedVulnerability
    return matchesSearch && matchesVulnerability
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E53935] opacity-3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#66BB6A] opacity-3 rounded-full blur-3xl" />
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#E53935] to-[#66BB6A] bg-clip-text text-transparent">
                NGO/Cooperative Dashboard
              </h1>
              <p className="text-[#B0BEC5] mt-2">
                Empowering communities through resource distribution, training, and collaborative support.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ReportExportButton 
                reportType="Impact Report" 
                role="ngo"
                fileName="ngo-impact-report"
              />
              <motion.button
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E53935] to-[#66BB6A] text-[#0D0D0D] rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-[#E53935]/25 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Group Advisory
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
            title="Resources Distributed"
            value="1,240"
            subtitle="Items this month"
            icon={Package}
            trend={{ value: 18.5, isPositive: true }}
            color="danger"
          />
          <OverviewCard
            title="Active Training"
            value="45"
            subtitle="Programs running"
            icon={GraduationCap}
            trend={{ value: 12.3, isPositive: true }}
            color="primary"
          />
          <OverviewCard
            title="Farmer Profiles"
            value="890"
            subtitle="Under support"
            icon={Users}
            trend={{ value: 8.7, isPositive: true }}
            color="accent"
          />
          <OverviewCard
            title="Engagement Score"
            value="8.7/10"
            subtitle="Community rating"
            icon={Award}
            trend={{ value: 5.2, isPositive: true }}
            color="secondary"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnalyticsCharts
                data={impactData}
                chartType="area"
                title="Community Impact Over Time"
                color="#E53935"
                height={300}
              />
            </motion.div>

            {/* Engagement Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalyticsCharts
                data={engagementData}
                chartType="pie"
                title="Engagement by Program Type"
                color="#66BB6A"
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
              <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-xl overflow-x-auto">
                {[
                  { id: 'profiles', label: 'Farmer Profiles', icon: Users },
                  { id: 'resources', label: 'Resource Tracking', icon: Package },
                  { id: 'training', label: 'Training Programs', icon: GraduationCap },
                  { id: 'surveys', label: 'Surveys & Feedback', icon: BarChart3 }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-[#E53935] to-[#66BB6A] text-[#0D0D0D]' 
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
              {activeTab === 'profiles' && (
                <div className="space-y-4">
                  {/* Search and Filter Bar */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#B0BEC5]" />
                      <input
                        type="text"
                        placeholder="Search farmers by name or village..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/20 transition-all duration-300"
                      />
                    </div>
                    <select
                      value={selectedVulnerability}
                      onChange={(e) => setSelectedVulnerability(e.target.value as any)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[#F5F5F5] focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/20 transition-all duration-300"
                    >
                      <option value="all">All Vulnerability Levels</option>
                      <option value="high">High Vulnerability</option>
                      <option value="medium">Medium Vulnerability</option>
                      <option value="low">Low Vulnerability</option>
                    </select>
                  </div>

                  {/* Farmer Profiles List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {filteredFarmers.map((farmer) => (
                      <div key={farmer.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#E53935]/30 transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-[#F5F5F5] font-medium">{farmer.name}</h4>
                              <span className={`
                                px-2 py-1 rounded text-xs font-medium
                                ${farmer.vulnerability === 'high' ? 'bg-[#E53935]/20 text-[#E53935]' :
                                  farmer.vulnerability === 'medium' ? 'bg-[#FFD54F]/20 text-[#FFD54F]' :
                                  'bg-[#66BB6A]/20 text-[#66BB6A]'
                                }
                              `}>
                                {farmer.vulnerability} risk
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm text-[#B0BEC5] mb-2">
                              <div>
                                <span className="block">Village: {farmer.village}</span>
                                <span className="block">Crops: {farmer.crop}</span>
                              </div>
                              <div>
                                <span className="block">Land: {farmer.landSize}</span>
                                <span className="block">Last support: {farmer.lastSupport}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[#B0BEC5] text-sm">Needs Assessment:</span>
                              <div className="flex-1 bg-white/10 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-gradient-to-r from-[#E53935] to-[#66BB6A]"
                                  style={{ width: `${farmer.needsAssessment * 10}%` }}
                                />
                              </div>
                              <span className="text-[#F5F5F5] text-sm font-medium">{farmer.needsAssessment}/10</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 bg-[#66BB6A]/20 rounded-lg hover:bg-[#66BB6A]/30 transition-colors duration-300">
                              <Phone className="w-4 h-4 text-[#66BB6A]" />
                            </button>
                            <button className="p-2 bg-[#E53935]/20 rounded-lg hover:bg-[#E53935]/30 transition-colors duration-300">
                              <MessageCircle className="w-4 h-4 text-[#E53935]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Resource Distribution Log</h4>
                    <button className="px-4 py-2 bg-[#66BB6A]/20 text-[#66BB6A] rounded-lg text-sm font-medium hover:bg-[#66BB6A]/30 transition-colors duration-300">
                      Log New Distribution
                    </button>
                  </div>
                  {resourceDistribution.map((resource) => (
                    <div key={resource.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[#F5F5F5] font-medium">{resource.resource}</h4>
                          <div className="text-[#B0BEC5] text-sm mt-1">
                            {resource.quantity} → {resource.beneficiaries} beneficiaries in {resource.village}
                          </div>
                        </div>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${resource.status === 'completed' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            resource.status === 'in-progress' ? 'bg-[#FFD54F]/20 text-[#FFD54F]' :
                            'bg-[#4DD0E1]/20 text-[#4DD0E1]'
                          }
                        `}>
                          {resource.status}
                        </span>
                      </div>
                      <div className="text-[#B0BEC5] text-sm">Date: {resource.date}</div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'training' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Training & Awareness Programs</h4>
                    <button className="px-4 py-2 bg-[#4DD0E1]/20 text-[#4DD0E1] rounded-lg text-sm font-medium hover:bg-[#4DD0E1]/30 transition-colors duration-300 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Content
                    </button>
                  </div>
                  {trainingPrograms.map((program) => (
                    <div key={program.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-[#F5F5F5] font-medium">{program.title}</h4>
                          <div className="text-[#B0BEC5] text-sm mt-1">
                            {program.type} • {program.participants} participants • {program.date}
                          </div>
                        </div>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${program.status === 'completed' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            program.status === 'scheduled' ? 'bg-[#4DD0E1]/20 text-[#4DD0E1]' :
                            'bg-[#FFD54F]/20 text-[#FFD54F]'
                          }
                        `}>
                          {program.status}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {program.materials.map((material, index) => (
                          <span key={index} className="px-2 py-1 bg-[#E53935]/20 text-[#E53935] rounded text-xs">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'surveys' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Survey & Feedback Collection</h4>
                    <button className="px-4 py-2 bg-[#FFD54F]/20 text-[#FFD54F] rounded-lg text-sm font-medium hover:bg-[#FFD54F]/30 transition-colors duration-300">
                      Create Survey
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Organic Farming Adoption', responses: 234, completion: 78 },
                      { title: 'Training Program Feedback', responses: 156, completion: 92 },
                      { title: 'Resource Need Assessment', responses: 189, completion: 65 },
                      { title: 'Community Support Rating', responses: 298, completion: 85 }
                    ].map((survey, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <h5 className="text-[#F5F5F5] font-medium mb-2">{survey.title}</h5>
                        <div className="text-[#B0BEC5] text-sm mb-2">
                          {survey.responses} responses • {survey.completion}% completion
                        </div>
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-[#E53935] to-[#66BB6A]"
                            style={{ width: `${survey.completion}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Collaboration Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#4DD0E1]/20 rounded-lg">
                  <HandHeart className="w-5 h-5 text-[#4DD0E1]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Collaboration Panel</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Extension Officers</span>
                    <span className="text-[#66BB6A] text-sm">12 active</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Coordinating farmer outreach programs</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Government Dept</span>
                    <span className="text-[#FFD54F] text-sm">3 departments</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Policy alignment and resource approval</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Other NGOs</span>
                    <span className="text-[#4DD0E1] text-sm">8 partners</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Joint initiatives and knowledge sharing</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#E53935] to-[#66BB6A] text-[#0D0D0D] rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300">
                Schedule Coordination Meeting
              </button>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#66BB6A]/20 rounded-lg">
                  <Target className="w-5 h-5 text-[#66BB6A]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Recent Activities</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    activity: 'Distributed 200 kg seeds in Kheda village',
                    time: '2 hours ago',
                    type: 'resource',
                    icon: Package
                  },
                  {
                    activity: 'Completed organic farming workshop',
                    time: '1 day ago',
                    type: 'training',
                    icon: GraduationCap
                  },
                  {
                    activity: 'Survey responses reached 85% completion',
                    time: '2 days ago',
                    type: 'feedback',
                    icon: BarChart3
                  },
                  {
                    activity: 'New collaboration with govt dept',
                    time: '3 days ago',
                    type: 'collaboration',
                    icon: HandHeart
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`
                      p-2 rounded-lg
                      ${activity.type === 'resource' ? 'bg-[#E53935]/20' :
                        activity.type === 'training' ? 'bg-[#66BB6A]/20' :
                        activity.type === 'feedback' ? 'bg-[#FFD54F]/20' :
                        'bg-[#4DD0E1]/20'
                      }
                    `}>
                      <activity.icon className={`
                        w-4 h-4
                        ${activity.type === 'resource' ? 'text-[#E53935]' :
                          activity.type === 'training' ? 'text-[#66BB6A]' :
                          activity.type === 'feedback' ? 'text-[#FFD54F]' :
                          'text-[#4DD0E1]'
                        }
                      `} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#F5F5F5] text-sm">{activity.activity}</p>
                      <p className="text-[#B0BEC5] text-xs mt-1">{activity.time}</p>
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
                  { icon: MessageCircle, label: 'Send Group Advisory', color: '#E53935' },
                  { icon: Package, label: 'Log Resource Distribution', color: '#66BB6A' },
                  { icon: Upload, label: 'Upload Training Material', color: '#4DD0E1' },
                  { icon: BarChart3, label: 'Create Feedback Survey', color: '#FFD54F' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#E53935]/30 transition-all duration-300 group"
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
        role="ngo" 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  )
}