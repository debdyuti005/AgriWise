'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Map } from 'lucide-react'

interface PestDiseaseChartsProps {
  selectedCrop: string
  dateRange: string
  compareMode: boolean
}

export function PestDiseaseCharts({ selectedCrop, dateRange, compareMode }: PestDiseaseChartsProps) {
  // Mock data - replace with real API calls
  const trendData = [
    { week: 'Week 1', cases: 12, severity: 2.3 },
    { week: 'Week 2', cases: 19, severity: 2.8 },
    { week: 'Week 3', cases: 8, severity: 1.9 },
    { week: 'Week 4', cases: 24, severity: 3.1 },
    { week: 'Week 5', cases: 15, severity: 2.5 },
    { week: 'Week 6', cases: 11, severity: 2.2 },
    { week: 'Week 7', cases: 18, severity: 2.7 }
  ]

  const pestFrequencyData = [
    { pest: 'Aphids', wheat: 23, rice: 15, maize: 18 },
    { pest: 'Leaf Rust', wheat: 19, rice: 5, maize: 8 },
    { pest: 'Powdery Mildew', wheat: 15, rice: 12, maize: 22 },
    { pest: 'Brown Planthopper', wheat: 3, rice: 28, maize: 6 },
    { pest: 'Stem Borer', wheat: 8, rice: 21, maize: 25 }
  ]

  const severityData = [
    { name: 'Low', value: 45, color: '#66BB6A' },
    { name: 'Medium', value: 35, color: '#FFD54F' },
    { name: 'High', value: 20, color: '#E53935' }
  ]

  const regionalData = [
    { district: 'Punjab', intensity: 85, cases: 234 },
    { district: 'Haryana', intensity: 72, cases: 189 },
    { district: 'UP', intensity: 91, cases: 287 },
    { district: 'Bihar', intensity: 68, cases: 156 },
    { district: 'MP', intensity: 79, cases: 201 }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-dark p-3 rounded-lg border border-white/20 backdrop-blur-xl">
          <p className="text-[#F5F5F5] font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1] bg-clip-text text-transparent mb-2">
          Data Visualizations & Trends
        </h2>
        <p className="text-[#B0BEC5]">Analyze patterns and track outbreaks across your region</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#4DD0E1]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Pest/Disease Trends</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  dataKey="week" 
                  stroke="#B0BEC5" 
                  fontSize={12}
                />
                <YAxis stroke="#B0BEC5" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cases" 
                  stroke="#66BB6A" 
                  strokeWidth={3}
                  dot={{ fill: '#66BB6A', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#66BB6A', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="severity" 
                  stroke="#FFD54F" 
                  strokeWidth={3}
                  dot={{ fill: '#FFD54F', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#FFD54F', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-[#66BB6A]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Most Frequent Pests by Crop</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pestFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  dataKey="pest" 
                  stroke="#B0BEC5" 
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#B0BEC5" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="wheat" fill="#66BB6A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rice" fill="#FFD54F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="maize" fill="#4DD0E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-[#FFD54F]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Severity Distribution</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#F5F5F5] text-sm">{item.name} Risk</span>
                </div>
                <span className="text-[#B0BEC5] text-sm">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Regional Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Map className="w-5 h-5 text-[#E53935]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Regional Outbreak Intensity</h3>
          </div>
          
          <div className="space-y-4">
            {regionalData.map((region, index) => (
              <motion.div
                key={region.district}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[#F5F5F5] font-medium">{region.district}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#B0BEC5] text-sm">{region.cases} cases</span>
                    <span className={`text-sm font-medium ${
                      region.intensity > 80 ? 'text-[#E53935]' :
                      region.intensity > 60 ? 'text-[#FFD54F]' :
                      'text-[#66BB6A]'
                    }`}>
                      {region.intensity}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#1A1A1A] rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${region.intensity}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-3 rounded-full ${
                      region.intensity > 80 
                        ? 'bg-gradient-to-r from-[#E53935] to-[#D32F2F]' :
                      region.intensity > 60 
                        ? 'bg-gradient-to-r from-[#FFD54F] to-[#FFC107]' :
                        'bg-gradient-to-r from-[#66BB6A] to-[#4CAF50]'
                    } shadow-lg`}
                    style={{
                      boxShadow: region.intensity > 80 
                        ? '0 0 10px rgba(229, 57, 53, 0.5)' :
                      region.intensity > 60 
                        ? '0 0 10px rgba(255, 213, 79, 0.5)' :
                        '0 0 10px rgba(102, 187, 106, 0.5)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#E53935]/10 to-[#D32F2F]/10 border border-[#E53935]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              <span className="text-[#E53935] font-medium text-sm">High Risk Alert</span>
            </div>
            <p className="text-[#F5F5F5] text-sm">UP shows highest outbreak intensity. Immediate intervention recommended.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}