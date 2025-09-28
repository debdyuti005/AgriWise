'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  TrendingUp,
  MapPin,
  Radio,
  Shield,
  Settings
} from 'lucide-react'
import { OverviewCard } from '@/components/dashboard/OverviewCard'
import { ChatPanel } from '@/components/dashboard/ChatPanel'
import { ReportExportButton } from '@/components/dashboard/ReportExportButton'
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts'

// Mock data for government dashboard
const regionData = [
  { name: 'North', value: 1250 },
  { name: 'South', value: 890 },
  { name: 'East', value: 1100 },
  { name: 'West', value: 960 },
  { name: 'Central', value: 1340 }
]

const subsidyData = [
  { name: 'Jan', value: 2400000 },
  { name: 'Feb', value: 2100000 },
  { name: 'Mar', value: 2800000 },
  { name: 'Apr', value: 3200000 },
  { name: 'May', value: 2900000 },
  { name: 'Jun', value: 3100000 }
]

export function GovtDashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFD54F] opacity-3 rounded-full blur-3xl" />
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FFD54F] to-[#66BB6A] bg-clip-text text-transparent">
                Government Dashboard
              </h1>
              <p className="text-[#B0BEC5] mt-2">
                Regional oversight, policy management, and agricultural governance.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ReportExportButton 
                reportType="Regional Report" 
                role="govt"
                fileName="regional-agriculture-report"
              />
              <motion.button
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFD54F] to-[#66BB6A] text-[#0D0D0D] rounded-xl font-medium shadow-lg hover:shadow-xl hover:shadow-[#FFD54F]/25 transition-all duration-300"
              >
                <Radio className="w-5 h-5" />
                Broadcast Alert
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
            title="Total Farmers"
            value="15,420"
            subtitle="Registered in region"
            icon={Users}
            trend={{ value: 3.2, isPositive: true }}
            color="primary"
          />
          <OverviewCard
            title="Active Officers"
            value="78"
            subtitle="Extension officers"
            icon={Shield}
            trend={{ value: 1.8, isPositive: true }}
            color="accent"
          />
          <OverviewCard
            title="Subsidies Distributed"
            value="₹2.4M"
            subtitle="This month"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
            color="secondary"
          />
          <OverviewCard
            title="Crop Yield"
            value="+12%"
            subtitle="vs last season"
            icon={TrendingUp}
            trend={{ value: 8.3, isPositive: true }}
            color="primary"
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Regional Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnalyticsCharts
                data={regionData}
                chartType="bar"
                title="Regional Farmer Distribution"
                color="#FFD54F"
                height={300}
              />
            </motion.div>

            {/* Subsidy Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <AnalyticsCharts
                data={subsidyData}
                chartType="area"
                title="Monthly Subsidy Distribution (₹)"
                color="#66BB6A"
                height={300}
              />
            </motion.div>

            {/* Policy Management */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#4DD0E1]/20 rounded-lg">
                    <FileText className="w-5 h-5 text-[#4DD0E1]" />
                  </div>
                  <h3 className="text-[#F5F5F5] text-lg font-semibold">Active Policies</h3>
                </div>
                <button className="px-4 py-2 bg-[#66BB6A]/20 text-[#66BB6A] rounded-lg text-sm font-medium hover:bg-[#66BB6A]/30 transition-colors duration-300">
                  Create Policy
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    title: 'Drip Irrigation Subsidy Scheme',
                    status: 'Active',
                    beneficiaries: '2,340 farmers',
                    budget: '₹8.5M',
                    color: '#66BB6A'
                  },
                  { 
                    title: 'Organic Farming Initiative',
                    status: 'Pending Approval',
                    beneficiaries: '890 farmers',
                    budget: '₹3.2M',
                    color: '#FFD54F'
                  },
                  { 
                    title: 'Crop Insurance Coverage',
                    status: 'Under Review',
                    beneficiaries: '5,120 farmers',
                    budget: '₹12.8M',
                    color: '#4DD0E1'
                  }
                ].map((policy, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-[#F5F5F5] font-medium">{policy.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-[#B0BEC5]">
                          <span>Beneficiaries: {policy.beneficiaries}</span>
                          <span>Budget: {policy.budget}</span>
                        </div>
                      </div>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${policy.color}20`,
                          color: policy.color
                        }}
                      >
                        {policy.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Regional Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#E53935]/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-[#E53935]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold">Regional Alerts</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    type: 'Weather',
                    message: 'Heavy rainfall expected in Northern districts',
                    priority: 'high',
                    time: '2 hours ago'
                  },
                  {
                    type: 'Pest',
                    message: 'Locust swarm detected in Eastern region',
                    priority: 'critical',
                    time: '4 hours ago'
                  },
                  {
                    type: 'Market',
                    message: 'Wheat prices dropped 5% in Central markets',
                    priority: 'medium',
                    time: '1 day ago'
                  }
                ].map((alert, index) => (
                  <div key={index} className={`
                    p-3 rounded-lg border
                    ${alert.priority === 'critical' ? 'bg-[#E53935]/10 border-[#E53935]/30' :
                      alert.priority === 'high' ? 'bg-[#FFD54F]/10 border-[#FFD54F]/30' :
                      'bg-[#4DD0E1]/10 border-[#4DD0E1]/30'
                    }
                  `}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#F5F5F5] font-medium text-sm">{alert.type} Alert</span>
                      <span className={`
                        px-2 py-1 rounded text-xs font-medium
                        ${alert.priority === 'critical' ? 'bg-[#E53935]/20 text-[#E53935]' :
                          alert.priority === 'high' ? 'bg-[#FFD54F]/20 text-[#FFD54F]' :
                          'bg-[#4DD0E1]/20 text-[#4DD0E1]'
                        }
                      `}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-[#B0BEC5] text-sm mb-2">{alert.message}</p>
                    <div className="text-[#B0BEC5] text-xs">{alert.time}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Officer Management */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#66BB6A]/20 rounded-lg">
                    <Shield className="w-5 h-5 text-[#66BB6A]" />
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold">Officer Performance</h3>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Dr. Rajesh Kumar', region: 'North', farmers: 245, rating: 4.8 },
                  { name: 'Ms. Priya Singh', region: 'East', farmers: 198, rating: 4.6 },
                  { name: 'Mr. Amit Sharma', region: 'West', farmers: 167, rating: 4.9 }
                ].map((officer, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-[#F5F5F5] font-medium text-sm">{officer.name}</div>
                        <div className="text-[#B0BEC5] text-xs">{officer.region} Region</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#66BB6A] font-medium text-sm">★ {officer.rating}</div>
                        <div className="text-[#B0BEC5] text-xs">{officer.farmers} farmers</div>
                      </div>
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
                  { icon: Radio, label: 'Broadcast Policy Update', color: '#FFD54F' },
                  { icon: FileText, label: 'Generate Compliance Report', color: '#66BB6A' },
                  { icon: MapPin, label: 'View Regional Map', color: '#4DD0E1' },
                  { icon: Settings, label: 'System Configuration', color: '#E53935' }
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
        role="govt" 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  )
}