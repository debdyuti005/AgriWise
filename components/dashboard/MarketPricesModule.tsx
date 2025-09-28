'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Calendar, 
  RefreshCw,
  Bell,
  Search,
  Filter,
  BarChart3,
  DollarSign,
  ShoppingCart,
  Truck,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

interface MarketPrice {
  id: string
  crop: string
  cropHindi: string
  variety: string
  varietyHindi: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  market: string
  marketHindi: string
  district: string
  districtHindi: string
  date: string
  unit: string
  unitHindi: string
  quality: 'FAQ' | 'Grade A' | 'Grade B'
  recommendation: 'sell' | 'hold' | 'buy'
}

interface PriceHistory {
  date: string
  price: number
}

interface MarketPricesModuleProps {
  isHindi?: boolean
}

const mockPrices: MarketPrice[] = [
  {
    id: '1',
    crop: 'Wheat',
    cropHindi: 'गेहूं',
    variety: 'PBW 725',
    varietyHindi: 'पीबीडब्ल्यू 725',
    currentPrice: 2580,
    previousPrice: 2450,
    change: 130,
    changePercent: 5.31,
    market: 'Ludhiana Mandi',
    marketHindi: 'लुधियाना मंडी',
    district: 'Ludhiana',
    districtHindi: 'लुधियाना',
    date: '2025-09-28',
    unit: 'per quintal',
    unitHindi: 'प्रति क्विंटल',
    quality: 'FAQ',
    recommendation: 'sell'
  },
  {
    id: '2',
    crop: 'Rice',
    cropHindi: 'चावल',
    variety: 'Basmati 1121',
    varietyHindi: 'बासमती 1121',
    currentPrice: 4200,
    previousPrice: 4350,
    change: -150,
    changePercent: -3.45,
    market: 'Karnal Mandi',
    marketHindi: 'करनाल मंडी',
    district: 'Karnal',
    districtHindi: 'करनाल',
    date: '2025-09-28',
    unit: 'per quintal',
    unitHindi: 'प्रति क्विंटल',
    quality: 'Grade A',
    recommendation: 'hold'
  },
  {
    id: '3',
    crop: 'Cotton',
    cropHindi: 'कपास',
    variety: 'Medium Staple',
    varietyHindi: 'मध्यम स्टेपल',
    currentPrice: 6800,
    previousPrice: 6650,
    change: 150,
    changePercent: 2.26,
    market: 'Bathinda Mandi',
    marketHindi: 'बठिंडा मंडी',
    district: 'Bathinda',
    districtHindi: 'बठिंडा',
    date: '2025-09-28',
    unit: 'per quintal',
    unitHindi: 'प्रति क्विंटल',
    quality: 'FAQ',
    recommendation: 'sell'
  },
  {
    id: '4',
    crop: 'Maize',
    cropHindi: 'मक्का',
    variety: 'Hybrid',
    varietyHindi: 'संकर',
    currentPrice: 1980,
    previousPrice: 2020,
    change: -40,
    changePercent: -1.98,
    market: 'Amritsar Mandi',
    marketHindi: 'अमृतसर मंडी',
    district: 'Amritsar',
    districtHindi: 'अमृतसर',
    date: '2025-09-28',
    unit: 'per quintal',
    unitHindi: 'प्रति क्विंटल',
    quality: 'FAQ',
    recommendation: 'hold'
  }
]

const mockPriceHistory: { [key: string]: PriceHistory[] } = {
  '1': [
    { date: '2025-09-21', price: 2300 },
    { date: '2025-09-22', price: 2350 },
    { date: '2025-09-23', price: 2380 },
    { date: '2025-09-24', price: 2400 },
    { date: '2025-09-25', price: 2420 },
    { date: '2025-09-26', price: 2450 },
    { date: '2025-09-27', price: 2480 },
    { date: '2025-09-28', price: 2580 }
  ],
  '2': [
    { date: '2025-09-21', price: 4500 },
    { date: '2025-09-22', price: 4450 },
    { date: '2025-09-23', price: 4400 },
    { date: '2025-09-24', price: 4380 },
    { date: '2025-09-25', price: 4360 },
    { date: '2025-09-26', price: 4350 },
    { date: '2025-09-27', price: 4320 },
    { date: '2025-09-28', price: 4200 }
  ]
}

const recommendationColors = {
  sell: 'from-[#66BB6A] to-[#4CAF50]',
  hold: 'from-[#FFD54F] to-[#FFC107]',
  buy: 'from-[#4DD0E1] to-[#00BCD4]'
}

const recommendationIcons = {
  sell: TrendingUp,
  hold: Clock,
  buy: TrendingDown
}

export function MarketPricesModule({ isHindi = false }: MarketPricesModuleProps) {
  const [prices] = useState<MarketPrice[]>(mockPrices)
  const [selectedPrice, setSelectedPrice] = useState<MarketPrice | null>(mockPrices[0])
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>(mockPrices)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCrop, setSelectedCrop] = useState<string>('all')
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [priceAlerts, setPriceAlerts] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    let filtered = prices

    if (selectedCrop !== 'all') {
      filtered = filtered.filter(price => price.crop.toLowerCase() === selectedCrop.toLowerCase())
    }

    if (selectedDistrict !== 'all') {
      filtered = filtered.filter(price => price.district.toLowerCase() === selectedDistrict.toLowerCase())
    }

    if (searchTerm) {
      filtered = filtered.filter(price => 
        price.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.cropHindi.includes(searchTerm) ||
        price.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.marketHindi.includes(searchTerm)
      )
    }

    setFilteredPrices(filtered)
  }, [prices, selectedCrop, selectedDistrict, searchTerm])

  const refreshPrices = async () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 2000)
  }

  const togglePriceAlert = (priceId: string) => {
    setPriceAlerts(prev => ({
      ...prev,
      [priceId]: !prev[priceId]
    }))
  }

  const getRecommendationText = (recommendation: string) => {
    if (!isHindi) {
      return recommendation.charAt(0).toUpperCase() + recommendation.slice(1)
    }
    
    switch (recommendation) {
      case 'sell': return 'बेचें'
      case 'hold': return 'रोकें'
      case 'buy': return 'खरीदें'
      default: return recommendation
    }
  }

  const uniqueCrops = [...new Set(prices.map(p => p.crop))]
  const uniqueDistricts = [...new Set(prices.map(p => p.district))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] bg-clip-text text-transparent mb-2">
                {isHindi ? 'बाज़ार भाव' : 'Market Prices'}
              </h1>
              <p className="text-[#B0BEC5]">
                {isHindi 
                  ? 'लाइव मंडी दरें और बिक्री की सिफारिशें देखें'
                  : 'View live mandi rates and selling recommendations'
                }
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={refreshPrices}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isHindi ? 'ताज़ा करें' : 'Refresh'}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-[#66BB6A]" />
              <span className="text-[#66BB6A] font-medium">
                {prices.filter(p => p.recommendation === 'sell').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'बिक्री योग्य' : 'Ready to Sell'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-[#FFD54F]" />
              <span className="text-[#FFD54F] font-medium">
                {prices.filter(p => p.recommendation === 'hold').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'प्रतीक्षा करें' : 'Hold & Wait'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-8 h-8 text-[#4DD0E1]" />
              <span className="text-[#4DD0E1] font-medium">
                {Math.round(prices.reduce((sum, p) => sum + p.changePercent, 0) / prices.length * 100) / 100}%
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'औसत वृद्धि' : 'Avg Growth'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-[#E53935]" />
              <span className="text-[#E53935] font-medium">
                {Object.values(priceAlerts).filter(Boolean).length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'सक्रिय अलर्ट' : 'Active Alerts'}
            </h3>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glassmorphism-dark p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B0BEC5]" />
              <input
                type="text"
                placeholder={isHindi ? 'फसल या मंडी खोजें...' : 'Search crop or market...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              />
            </div>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी फसलें' : 'All Crops'}</option>
              {uniqueCrops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी जिले' : 'All Districts'}</option>
              {uniqueDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm text-[#B0BEC5]">
              <span>{isHindi ? 'अंतिम अपडेट:' : 'Last updated:'}</span>
              <span className="text-[#F5F5F5] font-medium">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Prices List */}
          <div className="lg:col-span-1 space-y-4">
            {filteredPrices.map((price, index) => {
              const RecommendationIcon = recommendationIcons[price.recommendation]
              const recommendationColor = recommendationColors[price.recommendation]
              
              return (
                <motion.div
                  key={price.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glassmorphism-dark p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedPrice?.id === price.id
                      ? 'border-[#66BB6A]/30 shadow-[#66BB6A]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedPrice(price)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[#F5F5F5] font-semibold text-lg">
                        {isHindi ? price.cropHindi : price.crop}
                      </h3>
                      <p className="text-[#B0BEC5] text-sm">
                        {isHindi ? price.varietyHindi : price.variety}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePriceAlert(price.id)
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        priceAlerts[price.id]
                          ? 'bg-[#E53935] text-white'
                          : 'bg-white/10 text-[#B0BEC5] hover:bg-white/20'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-2xl font-bold text-[#F5F5F5]">
                        ₹{price.currentPrice.toLocaleString()}
                      </div>
                      <div className="text-[#B0BEC5] text-sm">
                        {isHindi ? price.unitHindi : price.unit}
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${
                      price.change >= 0 ? 'text-[#66BB6A]' : 'text-[#E53935]'
                    }`}>
                      {price.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {price.change >= 0 ? '+' : ''}₹{price.change}
                      <span className="text-xs">({price.changePercent >= 0 ? '+' : ''}{price.changePercent}%)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[#B0BEC5] text-sm">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      {isHindi ? price.marketHindi : price.market}
                    </div>
                    <div className="text-[#B0BEC5] text-sm">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {new Date(price.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${recommendationColor} bg-opacity-20`}>
                    <RecommendationIcon className="w-4 h-4 text-white" />
                    <span className="text-white font-medium text-sm">
                      {getRecommendationText(price.recommendation)}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Charts and Details */}
          <div className="lg:col-span-2 space-y-6">
            {selectedPrice && (
              <>
                {/* Price Chart */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="glassmorphism-dark p-8 rounded-2xl border border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#F5F5F5]">
                      {isHindi ? `${selectedPrice.cropHindi} - मूल्य रुझान` : `${selectedPrice.crop} - Price Trend`}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-[#B0BEC5]">
                      <BarChart3 className="w-4 h-4" />
                      {isHindi ? '7 दिन' : '7 Days'}
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockPriceHistory[selectedPrice.id] || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis 
                          dataKey="date" 
                          stroke="#B0BEC5"
                          fontSize={12}
                          tickFormatter={(value) => new Date(value).toLocaleDateString().slice(-5)}
                        />
                        <YAxis 
                          stroke="#B0BEC5"
                          fontSize={12}
                          tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1A1A1A',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            color: '#F5F5F5'
                          }}
                          formatter={(value: any) => [`₹${value}`, isHindi ? 'मूल्य' : 'Price']}
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke="#66BB6A" 
                          strokeWidth={3}
                          dot={{ fill: '#66BB6A', strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: '#66BB6A', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Market Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="glassmorphism-dark p-8 rounded-2xl border border-white/10"
                >
                  <h3 className="text-xl font-bold text-[#F5F5F5] mb-6">
                    {isHindi ? 'बाज़ार विवरण' : 'Market Details'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'वर्तमान मूल्य' : 'Current Price'}
                        </h4>
                        <div className="text-2xl font-bold text-[#F5F5F5]">
                          ₹{selectedPrice.currentPrice.toLocaleString()}
                        </div>
                        <div className="text-[#B0BEC5] text-sm">
                          {isHindi ? selectedPrice.unitHindi : selectedPrice.unit}
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'पिछला मूल्य' : 'Previous Price'}
                        </h4>
                        <div className="text-xl font-bold text-[#B0BEC5]">
                          ₹{selectedPrice.previousPrice.toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'गुणवत्ता' : 'Quality'}
                        </h4>
                        <div className="text-[#F5F5F5] font-medium">
                          {selectedPrice.quality}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'मूल्य परिवर्तन' : 'Price Change'}
                        </h4>
                        <div className={`text-xl font-bold ${
                          selectedPrice.change >= 0 ? 'text-[#66BB6A]' : 'text-[#E53935]'
                        }`}>
                          {selectedPrice.change >= 0 ? '+' : ''}₹{selectedPrice.change}
                        </div>
                        <div className={`text-sm ${
                          selectedPrice.changePercent >= 0 ? 'text-[#66BB6A]' : 'text-[#E53935]'
                        }`}>
                          ({selectedPrice.changePercent >= 0 ? '+' : ''}{selectedPrice.changePercent}%)
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'मंडी' : 'Market'}
                        </h4>
                        <div className="text-[#F5F5F5] font-medium">
                          {isHindi ? selectedPrice.marketHindi : selectedPrice.market}
                        </div>
                        <div className="text-[#B0BEC5] text-sm">
                          {isHindi ? selectedPrice.districtHindi : selectedPrice.district}
                        </div>
                      </div>

                      <div className="p-4 bg-white/5 rounded-lg">
                        <h4 className="text-[#66BB6A] font-medium mb-2">
                          {isHindi ? 'सिफारिश' : 'Recommendation'}
                        </h4>
                        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${recommendationColors[selectedPrice.recommendation]} bg-opacity-20`}>
                          {(() => {
                            const Icon = recommendationIcons[selectedPrice.recommendation]
                            return <Icon className="w-4 h-4 text-white" />
                          })()}
                          <span className="text-white font-medium">
                            {getRecommendationText(selectedPrice.recommendation)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {isHindi ? 'बिक्री करें' : 'Sell Now'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-white/10 text-[#B0BEC5] rounded-xl hover:bg-white/20 hover:text-[#F5F5F5] transition-all duration-300 flex items-center gap-2"
                    >
                      <Truck className="w-5 h-5" />
                      {isHindi ? 'ट्रांसपोर्ट' : 'Transport'}
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}