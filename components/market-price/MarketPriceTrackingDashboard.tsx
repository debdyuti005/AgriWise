'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, Plus, MapPin, Calendar, Filter, Bell } from 'lucide-react'
import { PriceTicker } from './PriceTicker'
import { WatchlistCard } from './WatchlistCard'
import { CropPriceCard } from './CropPriceCard'
import { MarketCharts } from './MarketCharts'
import { PriceAlertCard } from './PriceAlertCard'
import { RecommendationCard } from './RecommendationCard'

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

export function MarketPriceTrackingDashboard() {
  const [selectedLocation, setSelectedLocation] = useState('local')
  const [dateRange, setDateRange] = useState('week')
  const [watchlist, setWatchlist] = useState<string[]>(['wheat', 'rice', 'maize'])
  const [showAddToWatchlist, setShowAddToWatchlist] = useState(false)

  // Mock data - replace with real API calls
  const liveMarketData: CropPrice[] = [
    {
      id: 'wheat',
      name: 'Wheat',
      price: 2850,
      unit: '₹/quintal',
      change: 85,
      changePercent: 3.1,
      location: 'Delhi Mandi',
      lastUpdated: '2 mins ago',
      trend: 'rising',
      recommendation: 'sell'
    },
    {
      id: 'rice',
      name: 'Rice',
      price: 3200,
      unit: '₹/quintal',
      change: -45,
      changePercent: -1.4,
      location: 'Punjab Mandi',
      lastUpdated: '5 mins ago',
      trend: 'falling',
      recommendation: 'hold'
    },
    {
      id: 'maize',
      name: 'Maize',
      price: 1950,
      unit: '₹/quintal',
      change: 125,
      changePercent: 6.8,
      location: 'UP Mandi',
      lastUpdated: '1 min ago',
      trend: 'rising',
      recommendation: 'sell'
    },
    {
      id: 'soybean',
      name: 'Soybean',
      price: 4200,
      unit: '₹/quintal',
      change: -180,
      changePercent: -4.1,
      location: 'MP Mandi',
      lastUpdated: '3 mins ago',
      trend: 'falling',
      recommendation: 'avoid'
    },
    {
      id: 'cotton',
      name: 'Cotton',
      price: 6800,
      unit: '₹/quintal',
      change: 220,
      changePercent: 3.3,
      location: 'Gujarat Mandi',
      lastUpdated: '4 mins ago',
      trend: 'rising',
      recommendation: 'sell'
    }
  ]

  const watchlistCrops = liveMarketData.filter(crop => watchlist.includes(crop.id))
  const trendingCrops = liveMarketData.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 3)

  const handleAddToWatchlist = (cropId: string) => {
    if (!watchlist.includes(cropId)) {
      setWatchlist([...watchlist, cropId])
    }
    setShowAddToWatchlist(false)
  }

  const handleRemoveFromWatchlist = (cropId: string) => {
    setWatchlist(watchlist.filter(id => id !== cropId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101010] via-[#1B1B1B] to-[#101010]">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#4CAF50] via-[#FFC107] to-[#4CAF50] bg-clip-text text-transparent">
            Market Price Tracking
          </h1>
          <p className="text-[#B0BEC5] text-lg max-w-2xl mx-auto">
            Stay updated with real-time mandi prices and crop trends to maximize your profits.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <motion.button
              onClick={() => setShowAddToWatchlist(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(76, 175, 80, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass-dark px-6 py-3 rounded-2xl bg-gradient-to-r from-[#4CAF50]/20 to-[#66BB6A]/20 border border-[#4CAF50]/30 text-[#F5F5F5] font-medium flex items-center gap-2 backdrop-blur-xl"
            >
              <Plus className="w-5 h-5" />
              Add to Watchlist
            </motion.button>

            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="liquid-glass-dark px-4 py-3 rounded-2xl bg-[#1B1B1B]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl"
            >
              <option value="local">Local Mandi</option>
              <option value="state">State Average</option>
              <option value="national">National Average</option>
            </select>

            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="liquid-glass-dark px-4 py-3 rounded-2xl bg-[#1B1B1B]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl"
            >
              <option value="week">1 Week</option>
              <option value="month">1 Month</option>
              <option value="quarter">3 Months</option>
              <option value="halfyear">6 Months</option>
            </select>
          </div>
        </motion.div>

        {/* Live Price Ticker */}
        <PriceTicker crops={liveMarketData} />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Watchlist & Trending */}
          <div className="space-y-6">
            <WatchlistCard 
              watchlistCrops={watchlistCrops}
              onRemove={handleRemoveFromWatchlist}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
            >
              <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FFC107]" />
                Trending Crops
              </h3>
              <div className="space-y-3">
                {trendingCrops.map((crop, index) => (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded-xl border ${
                      crop.trend === 'rising' 
                        ? 'bg-gradient-to-r from-[#4CAF50]/10 to-transparent border-[#4CAF50]/30 shadow-[0_0_15px_rgba(76,175,80,0.2)]' 
                        : crop.trend === 'falling'
                        ? 'bg-gradient-to-r from-[#E53935]/10 to-transparent border-[#E53935]/30 shadow-[0_0_15px_rgba(229,57,53,0.2)]'
                        : 'bg-gradient-to-r from-[#FFC107]/10 to-transparent border-[#FFC107]/30 shadow-[0_0_15px_rgba(255,193,7,0.2)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[#F5F5F5] font-medium">{crop.name}</h4>
                        <p className="text-[#B0BEC5] text-sm">{crop.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#F5F5F5] font-semibold">{crop.price} {crop.unit}</p>
                        <div className="flex items-center gap-1">
                          {crop.trend === 'rising' ? (
                            <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-[#E53935]" />
                          )}
                          <span className={`text-sm font-medium ${
                            crop.trend === 'rising' ? 'text-[#4CAF50]' : 'text-[#E53935]'
                          }`}>
                            {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Detailed Price Cards */}
          <div className="space-y-6">
            {watchlistCrops.map((crop, index) => (
              <CropPriceCard 
                key={crop.id} 
                crop={crop} 
                index={index}
                dateRange={dateRange}
              />
            ))}
          </div>

          {/* Right Column - Alerts & Recommendations */}
          <div className="space-y-6">
            <PriceAlertCard crops={liveMarketData} />
            <RecommendationCard crops={liveMarketData} />
          </div>
        </div>

        {/* Charts Section */}
        <MarketCharts 
          selectedLocation={selectedLocation}
          dateRange={dateRange}
          watchlistCrops={watchlistCrops}
        />

        {/* Add to Watchlist Modal */}
        <AnimatePresence>
          {showAddToWatchlist && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowAddToWatchlist(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 glassmorphism-dark p-6 rounded-2xl border border-white/20 backdrop-blur-xl z-50"
              >
                <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Add to Watchlist</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {liveMarketData.filter(crop => !watchlist.includes(crop.id)).map((crop) => (
                    <motion.button
                      key={crop.id}
                      onClick={() => handleAddToWatchlist(crop.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-3 rounded-xl bg-gradient-to-r from-[#1B1B1B]/50 to-[#2A2A2A]/50 border border-white/10 hover:border-[#4CAF50]/30 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[#F5F5F5] font-medium">{crop.name}</span>
                        <span className="text-[#B0BEC5] text-sm">{crop.price} {crop.unit}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => setShowAddToWatchlist(false)}
                  className="mt-4 w-full px-4 py-2 rounded-xl bg-[#2A2A2A] text-[#B0BEC5] hover:bg-[#3A3A3A] transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}