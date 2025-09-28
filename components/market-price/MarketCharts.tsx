'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Map } from 'lucide-react'

interface CropPrice {
  id: string
  name: string
  price: number
  unit: string
  change: number
  changePercent: number
  location: string
  lastUpdated: string
  trend: 'rising' | 'falling' | 'stable'
  recommendation: 'sell' | 'hold' | 'avoid'
}

interface MarketChartsProps {
  selectedLocation: string
  dateRange: string
  watchlistCrops: CropPrice[]
}

export function MarketCharts({ selectedLocation, dateRange, watchlistCrops }: MarketChartsProps) {
  // Mock data for charts - replace with real API calls
  const priceHistoryData = [
    { date: 'Week 1', wheat: 2765, rice: 3245, maize: 1825, soybean: 4380, cotton: 6580 },
    { date: 'Week 2', wheat: 2780, rice: 3220, maize: 1840, soybean: 4320, cotton: 6620 },
    { date: 'Week 3', wheat: 2795, rice: 3200, maize: 1865, soybean: 4250, cotton: 6650 },
    { date: 'Week 4', wheat: 2850, rice: 3200, maize: 1950, soybean: 4200, cotton: 6800 }
  ]

  const regionalComparisonData = [
    { region: 'Local', wheat: 2850, rice: 3200, maize: 1950, soybean: 4200 },
    { region: 'State', wheat: 2720, rice: 3150, maize: 1880, soybean: 4150 },
    { region: 'National', wheat: 2650, rice: 3080, maize: 1820, soybean: 4050 }
  ]

  const cropDistributionData = watchlistCrops.map(crop => ({
    name: crop.name,
    value: crop.price,
    color: crop.trend === 'rising' ? '#4CAF50' : crop.trend === 'falling' ? '#E53935' : '#FFC107'
  }))

  const mandiPriceData = [
    { mandi: 'Delhi', distance: '25 km', wheat: 2850, rice: 3200, advantage: '+5%' },
    { mandi: 'Gurgaon', distance: '45 km', wheat: 2820, rice: 3180, advantage: '+3%' },
    { mandi: 'Faridabad', distance: '38 km', wheat: 2880, rice: 3220, advantage: '+7%' },
    { mandi: 'Meerut', distance: '65 km', wheat: 2790, rice: 3150, advantage: '+1%' },
    { mandi: 'Panipat', distance: '52 km', wheat: 2860, rice: 3210, advantage: '+6%' }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glassmorphism-dark p-3 rounded-lg border border-white/20 backdrop-blur-xl">
          <p className="text-[#F5F5F5] font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ₹{entry.value}
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
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4CAF50] to-[#81D4FA] bg-clip-text text-transparent mb-2">
          Market Analytics & Trends
        </h2>
        <p className="text-[#B0BEC5]">Comprehensive market analysis and price comparisons</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Price History Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#4CAF50]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Price History Trends</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  dataKey="date" 
                  stroke="#B0BEC5" 
                  fontSize={12}
                />
                <YAxis stroke="#B0BEC5" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="wheat" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#4CAF50', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rice" 
                  stroke="#FFC107" 
                  strokeWidth={3}
                  dot={{ fill: '#FFC107', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#FFC107', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="maize" 
                  stroke="#81D4FA" 
                  strokeWidth={3}
                  dot={{ fill: '#81D4FA', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#81D4FA', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Regional Comparison Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-[#81D4FA]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Regional Price Comparison</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  dataKey="region" 
                  stroke="#B0BEC5" 
                  fontSize={12}
                />
                <YAxis stroke="#B0BEC5" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="wheat" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rice" fill="#FFC107" radius={[4, 4, 0, 0]} />
                <Bar dataKey="maize" fill="#81D4FA" radius={[4, 4, 0, 0]} />
                <Bar dataKey="soybean" fill="#E53935" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Watchlist Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-[#FFC107]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Watchlist Price Distribution</h3>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cropDistributionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {cropDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {cropDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#F5F5F5] text-sm">{item.name}</span>
                </div>
                <span className="text-[#B0BEC5] text-sm">₹{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Mandi Prices */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <Map className="w-5 h-5 text-[#E53935]" />
            <h3 className="text-[#F5F5F5] text-xl font-semibold">Nearby Mandi Prices</h3>
          </div>
          
          <div className="space-y-4">
            {mandiPriceData.map((mandi, index) => (
              <motion.div
                key={mandi.mandi}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-[#1B1B1B]/50 to-[#2A2A2A]/50 border border-white/10 hover:border-[#81D4FA]/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="text-[#F5F5F5] font-semibold">{mandi.mandi} Mandi</h4>
                    <p className="text-[#B0BEC5] text-sm">{mandi.distance} away</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      parseInt(mandi.advantage.replace('%', '')) > 5 
                        ? 'bg-[#4CAF50]/20 text-[#4CAF50]' 
                        : 'bg-[#FFC107]/20 text-[#FFC107]'
                    }`}>
                      {mandi.advantage}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[#B0BEC5] text-xs">Wheat</p>
                    <p className="text-[#F5F5F5] font-medium">₹{mandi.wheat}</p>
                  </div>
                  <div>
                    <p className="text-[#B0BEC5] text-xs">Rice</p>
                    <p className="text-[#F5F5F5] font-medium">₹{mandi.rice}</p>
                  </div>
                </div>

                {/* Distance indicator */}
                <div className="mt-3 w-full bg-[#1B1B1B] rounded-full h-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(20, 100 - parseInt(mandi.distance))}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                    className={`h-1 rounded-full ${
                      parseInt(mandi.distance) < 30 
                        ? 'bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]' 
                        : parseInt(mandi.distance) < 50
                        ? 'bg-gradient-to-r from-[#FFC107] to-[#FFD54F]'
                        : 'bg-gradient-to-r from-[#E53935] to-[#EF5350]'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#4CAF50]/10 to-[#66BB6A]/5 border border-[#4CAF50]/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
              <span className="text-[#4CAF50] font-medium text-sm">Best Deal</span>
            </div>
            <p className="text-[#F5F5F5] text-sm">Faridabad Mandi offers +7% better rates for both wheat and rice. Consider the transport cost.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}