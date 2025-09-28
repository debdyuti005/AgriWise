'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  ShoppingCart, 
  TrendingUp, 
  Target, 
  BarChart3, 
  MessageCircle,
  Bell,
  Users,
  Package,
  DollarSign,
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  Star,
  PieChart,
  Activity,
  Lightbulb,
  HeartHandshake
} from 'lucide-react'
import { OverviewCard } from '@/components/dashboard/OverviewCard'
import { ChatPanel } from '@/components/dashboard/ChatPanel'
import { ReportExportButton } from '@/components/dashboard/ReportExportButton'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'

// Mock data for Startup dashboard
const marketplaceData = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 58000 },
  { name: 'Jun', value: 67000 }
]

const productPerformanceData = [
  { name: 'Seeds', value: 35 },
  { name: 'Fertilizers', value: 28 },
  { name: 'Tools', value: 22 },
  { name: 'Pesticides', value: 15 }
]

const promotionCampaigns = [
  {
    id: 1,
    title: 'Smart Irrigation Systems',
    targetAudience: 'Cotton Farmers',
    reach: 1250,
    engagement: 8.5,
    conversions: 23,
    budget: 5000,
    status: 'active',
    region: 'Maharashtra'
  },
  {
    id: 2,
    title: 'Organic Fertilizer Package',
    targetAudience: 'Vegetable Growers',
    reach: 890,
    engagement: 12.3,
    conversions: 45,
    budget: 3500,
    status: 'completed',
    region: 'Punjab'
  },
  {
    id: 3,
    title: 'Precision Farming Tools',
    targetAudience: 'Tech-Savvy Farmers',
    reach: 650,
    engagement: 15.7,
    conversions: 18,
    budget: 4200,
    status: 'scheduled',
    region: 'Gujarat'
  }
]

const pilotPrograms = [
  {
    id: 1,
    name: 'AI-Powered Crop Monitoring',
    participants: 50,
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    region: 'Karnataka',
    status: 'active',
    progress: 65,
    keyMetrics: {
      satisfaction: 8.7,
      adoption: 73,
      yield_improvement: 18.5
    }
  },
  {
    id: 2,
    name: 'Blockchain Supply Chain',
    participants: 30,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    region: 'Andhra Pradesh',
    status: 'planning',
    progress: 25,
    keyMetrics: {
      satisfaction: 0,
      adoption: 0,
      yield_improvement: 0
    }
  },
  {
    id: 3,
    name: 'Drone-Based Pesticide Application',
    participants: 75,
    startDate: '2023-12-01',
    endDate: '2024-03-01',
    region: 'Haryana',
    status: 'completed',
    progress: 100,
    keyMetrics: {
      satisfaction: 9.2,
      adoption: 85,
      yield_improvement: 22.3
    }
  }
]

const marketplaceProducts = [
  {
    id: 1,
    name: 'Smart Soil Sensor Kit',
    category: 'IoT Devices',
    price: 2500,
    sales: 145,
    rating: 4.6,
    inventory: 89,
    regions: ['Punjab', 'Haryana', 'UP']
  },
  {
    id: 2,
    name: 'Organic Fertilizer Blend',
    category: 'Fertilizers',
    price: 850,
    sales: 324,
    rating: 4.8,
    inventory: 156,
    regions: ['Maharashtra', 'Karnataka', 'Tamil Nadu']
  },
  {
    id: 3,
    name: 'Weather-Resistant Seeds',
    category: 'Seeds',
    price: 1200,
    sales: 278,
    rating: 4.5,
    inventory: 234,
    regions: ['Gujarat', 'Rajasthan', 'MP']
  }
]

const farmerFeedback = [
  {
    id: 1,
    farmer: 'Raj Kumar',
    product: 'Smart Soil Sensor Kit',
    rating: 5,
    feedback: 'Excellent product! Helped increase my crop yield by 20%.',
    region: 'Punjab',
    date: '2024-01-20',
    category: 'positive'
  },
  {
    id: 2,
    farmer: 'Sunita Patel',
    product: 'Organic Fertilizer Blend',
    rating: 4,
    feedback: 'Good quality fertilizer, but delivery was delayed.',
    region: 'Gujarat',
    date: '2024-01-18',
    category: 'constructive'
  },
  {
    id: 3,
    farmer: 'Mohan Singh',
    product: 'Weather-Resistant Seeds',
    rating: 5,
    feedback: 'Amazing seeds! They survived the unexpected frost.',
    region: 'Haryana',
    date: '2024-01-15',
    category: 'positive'
  }
]

export function StartupDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'promotions' | 'marketplace' | 'analytics' | 'pilots' | 'feedback'>('promotions')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4DD0E1] opacity-3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FFD54F] opacity-3 rounded-full blur-3xl" />
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F] bg-clip-text text-transparent">
                Startup Dashboard
              </h1>
              <p className="text-[#B0BEC5] mt-2">
                Innovating agriculture through technology, marketplace solutions, and data-driven insights.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ReportExportButton 
                reportType="Business Analytics" 
                role="startup"
                fileName="startup-business-report"
              />
              <motion.button
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F] text-[#0D0D0D] rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-[#4DD0E1]/25 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5" />
                Direct Promotion
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
            title="Products Promoted"
            value="24"
            subtitle="Active campaigns"
            icon={Rocket}
            trend={{ value: 15.3, isPositive: true }}
            color="primary"
          />
          <OverviewCard
            title="Marketplace Activity"
            value="₹2.3L"
            subtitle="Monthly revenue"
            icon={ShoppingCart}
            trend={{ value: 23.7, isPositive: true }}
            color="accent"
          />
          <OverviewCard
            title="Pilot Programs"
            value="8"
            subtitle="Running pilots"
            icon={Target}
            trend={{ value: 12.5, isPositive: true }}
            color="secondary"
          />
          <OverviewCard
            title="User Analytics"
            value="4.2K"
            subtitle="Active farmers"
            icon={BarChart3}
            trend={{ value: 18.9, isPositive: true }}
            color="danger"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Marketplace Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnalyticsCharts
                data={marketplaceData}
                chartType="line"
                title="Marketplace Revenue Trend"
                color="#4DD0E1"
                height={300}
              />
            </motion.div>

            {/* Product Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalyticsCharts
                data={productPerformanceData}
                chartType="bar"
                title="Product Category Performance"
                color="#FFD54F"
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
                  { id: 'promotions', label: 'Direct Promotions', icon: Bell },
                  { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
                  { id: 'analytics', label: 'Data Insights', icon: BarChart3 },
                  { id: 'pilots', label: 'Pilot Programs', icon: Target },
                  { id: 'feedback', label: 'Farmer Feedback', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 whitespace-nowrap
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F] text-[#0D0D0D]' 
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
              {activeTab === 'promotions' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Promotion Campaigns</h4>
                    <button className="px-4 py-2 bg-[#4DD0E1]/20 text-[#4DD0E1] rounded-lg text-sm font-medium hover:bg-[#4DD0E1]/30 transition-colors duration-300">
                      Create Campaign
                    </button>
                  </div>
                  {promotionCampaigns.map((campaign) => (
                    <div key={campaign.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#4DD0E1]/30 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-[#F5F5F5] font-medium">{campaign.title}</h4>
                          <div className="text-[#B0BEC5] text-sm mt-1">
                            Target: {campaign.targetAudience} • {campaign.region}
                          </div>
                        </div>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${campaign.status === 'active' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            campaign.status === 'completed' ? 'bg-[#4DD0E1]/20 text-[#4DD0E1]' :
                            'bg-[#FFD54F]/20 text-[#FFD54F]'
                          }
                        `}>
                          {campaign.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-[#B0BEC5]">Reach:</span>
                          <div className="text-[#F5F5F5] font-medium">{campaign.reach}</div>
                        </div>
                        <div>
                          <span className="text-[#B0BEC5]">Engagement:</span>
                          <div className="text-[#F5F5F5] font-medium">{campaign.engagement}%</div>
                        </div>
                        <div>
                          <span className="text-[#B0BEC5]">Conversions:</span>
                          <div className="text-[#F5F5F5] font-medium">{campaign.conversions}</div>
                        </div>
                        <div>
                          <span className="text-[#B0BEC5]">Budget:</span>
                          <div className="text-[#F5F5F5] font-medium">₹{campaign.budget}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'marketplace' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Marketplace Products</h4>
                    <button className="px-4 py-2 bg-[#66BB6A]/20 text-[#66BB6A] rounded-lg text-sm font-medium hover:bg-[#66BB6A]/30 transition-colors duration-300">
                      Add Product
                    </button>
                  </div>
                  {marketplaceProducts.map((product) => (
                    <div key={product.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-[#F5F5F5] font-medium">{product.name}</h4>
                          <div className="text-[#B0BEC5] text-sm mt-1">
                            {product.category} • ₹{product.price}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#FFD54F] fill-current" />
                          <span className="text-[#F5F5F5] text-sm font-medium">{product.rating}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-[#B0BEC5]">Sales:</span>
                          <div className="text-[#F5F5F5] font-medium">{product.sales}</div>
                        </div>
                        <div>
                          <span className="text-[#B0BEC5]">Inventory:</span>
                          <div className="text-[#F5F5F5] font-medium">{product.inventory}</div>
                        </div>
                        <div>
                          <span className="text-[#B0BEC5]">Revenue:</span>
                          <div className="text-[#F5F5F5] font-medium">₹{(product.sales * product.price).toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {product.regions.map((region, index) => (
                          <span key={index} className="px-2 py-1 bg-[#4DD0E1]/20 text-[#4DD0E1] rounded text-xs">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <h4 className="text-[#F5F5F5] font-medium">Anonymized Data Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { metric: 'Chat Interactions', value: '45.2K', change: '+18%', icon: MessageCircle },
                      { metric: 'Problem Categories', value: '8', change: 'Most: Pest Control', icon: PieChart },
                      { metric: 'Seasonal Patterns', value: 'Identified', change: 'Kharif prep peak', icon: Activity },
                      { metric: 'Success Rate', value: '87%', change: '+5% from last month', icon: TrendingUp }
                    ].map((insight, index) => (
                      <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <insight.icon className="w-5 h-5 text-[#FFD54F]" />
                          <span className="text-[#F5F5F5] font-medium text-sm">{insight.metric}</span>
                        </div>
                        <div className="text-[#F5F5F5] text-lg font-bold">{insight.value}</div>
                        <div className="text-[#B0BEC5] text-xs">{insight.change}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h5 className="text-[#F5F5F5] font-medium mb-2">Top Farmer Queries</h5>
                    <div className="space-y-2">
                      {[
                        'Organic pest control methods',
                        'Soil pH management techniques',
                        'Irrigation scheduling optimization',
                        'Crop rotation best practices'
                      ].map((query, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-[#B0BEC5] text-sm">{query}</span>
                          <span className="text-[#FFD54F] text-sm font-medium">{350 - index * 50} queries</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pilots' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[#F5F5F5] font-medium">Pilot Program Tracker</h4>
                    <button className="px-4 py-2 bg-[#FFD54F]/20 text-[#FFD54F] rounded-lg text-sm font-medium hover:bg-[#FFD54F]/30 transition-colors duration-300">
                      Launch Pilot
                    </button>
                  </div>
                  {pilotPrograms.map((pilot) => (
                    <div key={pilot.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-[#F5F5F5] font-medium">{pilot.name}</h4>
                          <div className="text-[#B0BEC5] text-sm mt-1">
                            {pilot.participants} participants • {pilot.region}
                          </div>
                          <div className="text-[#B0BEC5] text-sm">
                            {pilot.startDate} - {pilot.endDate}
                          </div>
                        </div>
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${pilot.status === 'active' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            pilot.status === 'completed' ? 'bg-[#4DD0E1]/20 text-[#4DD0E1]' :
                            'bg-[#FFD54F]/20 text-[#FFD54F]'
                          }
                        `}>
                          {pilot.status}
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[#B0BEC5] text-sm">Progress</span>
                          <span className="text-[#F5F5F5] text-sm font-medium">{pilot.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F]"
                            style={{ width: `${pilot.progress}%` }}
                          />
                        </div>
                      </div>
                      {pilot.status === 'completed' && (
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-[#B0BEC5]">Satisfaction:</span>
                            <div className="text-[#F5F5F5] font-medium">{pilot.keyMetrics.satisfaction}/10</div>
                          </div>
                          <div>
                            <span className="text-[#B0BEC5]">Adoption:</span>
                            <div className="text-[#F5F5F5] font-medium">{pilot.keyMetrics.adoption}%</div>
                          </div>
                          <div>
                            <span className="text-[#B0BEC5]">Yield ↑:</span>
                            <div className="text-[#F5F5F5] font-medium">{pilot.keyMetrics.yield_improvement}%</div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="space-y-4">
                  <h4 className="text-[#F5F5F5] font-medium">Structured Farmer Feedback</h4>
                  {farmerFeedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#F5F5F5] font-medium text-sm">{feedback.farmer}</span>
                            <span className="text-[#B0BEC5] text-xs">• {feedback.region}</span>
                          </div>
                          <div className="text-[#B0BEC5] text-sm">
                            Product: {feedback.product}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < feedback.rating ? 'text-[#FFD54F] fill-current' : 'text-[#B0BEC5]'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#F5F5F5] text-sm mb-2">"{feedback.feedback}"</p>
                      <div className="flex justify-between items-center">
                        <span className={`
                          px-2 py-1 rounded text-xs font-medium
                          ${feedback.category === 'positive' ? 'bg-[#66BB6A]/20 text-[#66BB6A]' :
                            'bg-[#FFD54F]/20 text-[#FFD54F]'
                          }
                        `}>
                          {feedback.category}
                        </span>
                        <span className="text-[#B0BEC5] text-xs">{feedback.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Innovation Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#FFD54F]/20 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-[#FFD54F]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Innovation Metrics</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">R&D Investment</span>
                    <span className="text-[#4DD0E1] text-sm">₹12.5L</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">25% of revenue allocated to research</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Patents Filed</span>
                    <span className="text-[#66BB6A] text-sm">5 pending</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">AI crop monitoring & blockchain supply chain</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Tech Partnerships</span>
                    <span className="text-[#FFD54F] text-sm">8 active</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Universities, tech companies, research institutes</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F] text-[#0D0D0D] rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300">
                View Innovation Roadmap
              </button>
            </motion.div>

            {/* Partnership Network */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#66BB6A]/20 rounded-lg">
                  <HeartHandshake className="w-5 h-5 text-[#66BB6A]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Partnership Network</h3>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">FPOs & Cooperatives</span>
                    <span className="text-[#66BB6A] text-sm">45 partners</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Direct farmer reach and product distribution</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Government Schemes</span>
                    <span className="text-[#4DD0E1] text-sm">12 integrated</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Subsidy alignment and policy compliance</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#F5F5F5] font-medium text-sm">Agri Corporates</span>
                    <span className="text-[#FFD54F] text-sm">18 collaborations</span>
                  </div>
                  <p className="text-[#B0BEC5] text-xs">Supply chain integration and co-innovation</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-[#4DD0E1] to-[#FFD54F] text-[#0D0D0D] rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300">
                Expand Partnership Network
              </button>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#E53935]/20 rounded-lg">
                  <Activity className="w-5 h-5 text-[#E53935]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Recent Activities</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    activity: 'Smart sensor campaign reached 1.2K farmers',
                    time: '3 hours ago',
                    type: 'promotion',
                    icon: Bell
                  },
                  {
                    activity: 'New product added to marketplace',
                    time: '1 day ago',
                    type: 'marketplace',
                    icon: ShoppingCart
                  },
                  {
                    activity: 'Pilot program completion: 85% adoption',
                    time: '2 days ago',
                    type: 'pilot',
                    icon: Target
                  },
                  {
                    activity: 'Partnership signed with 5 new FPOs',
                    time: '4 days ago',
                    type: 'partnership',
                    icon: HeartHandshake
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`
                      p-2 rounded-lg
                      ${activity.type === 'promotion' ? 'bg-[#4DD0E1]/20' :
                        activity.type === 'marketplace' ? 'bg-[#66BB6A]/20' :
                        activity.type === 'pilot' ? 'bg-[#FFD54F]/20' :
                        'bg-[#E53935]/20'
                      }
                    `}>
                      <activity.icon className={`
                        w-4 h-4
                        ${activity.type === 'promotion' ? 'text-[#4DD0E1]' :
                          activity.type === 'marketplace' ? 'text-[#66BB6A]' :
                          activity.type === 'pilot' ? 'text-[#FFD54F]' :
                          'text-[#E53935]'
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
              transition={{ delay: 0.5 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <h3 className="text-[#F5F5F5] font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Bell, label: 'Launch Promotion Campaign', color: '#4DD0E1' },
                  { icon: Package, label: 'Add Marketplace Product', color: '#66BB6A' },
                  { icon: Target, label: 'Start New Pilot Program', color: '#FFD54F' },
                  { icon: BarChart3, label: 'Generate Analytics Report', color: '#E53935' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:border-[#4DD0E1]/30 transition-all duration-300 group"
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
        role="startup" 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  )
}