'use client'

import { motion } from 'framer-motion'
import { Filter, Calendar, BarChart3, Crop } from 'lucide-react'

interface FilterControlsProps {
  selectedCrop: string
  setSelectedCrop: (crop: string) => void
  dateRange: string
  setDateRange: (range: string) => void
  compareMode: boolean
  setCompareMode: (mode: boolean) => void
}

export function FilterControls({ 
  selectedCrop, 
  setSelectedCrop, 
  dateRange, 
  setDateRange, 
  compareMode, 
  setCompareMode 
}: FilterControlsProps) {
  
  const crops = [
    { value: 'all', label: 'All Crops' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'rice', label: 'Rice' },
    { value: 'maize', label: 'Maize' },
    { value: 'cotton', label: 'Cotton' },
    { value: 'sugarcane', label: 'Sugarcane' }
  ]

  const dateRanges = [
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'season', label: 'Current Season' },
    { value: 'year', label: 'This Year' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-[#4DD0E1]" />
        <h3 className="text-[#F5F5F5] text-xl font-semibold">Filter Controls</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Crop Selector */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#B0BEC5] text-sm font-medium">
            <Crop className="w-4 h-4" />
            Crop Type
          </label>
          <motion.select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full liquid-glass-dark px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl focus:border-[#66BB6A]/50 focus:outline-none focus:ring-2 focus:ring-[#66BB6A]/20 transition-all duration-200 hover:border-white/20"
            whileFocus={{ scale: 1.02 }}
          >
            {crops.map((crop) => (
              <option key={crop.value} value={crop.value} className="bg-[#1A1A1A] text-[#F5F5F5]">
                {crop.label}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Date Range Selector */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#B0BEC5] text-sm font-medium">
            <Calendar className="w-4 h-4" />
            Date Range
          </label>
          <motion.select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full liquid-glass-dark px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl focus:border-[#4DD0E1]/50 focus:outline-none focus:ring-2 focus:ring-[#4DD0E1]/20 transition-all duration-200 hover:border-white/20"
            whileFocus={{ scale: 1.02 }}
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value} className="bg-[#1A1A1A] text-[#F5F5F5]">
                {range.label}
              </option>
            ))}
          </motion.select>
        </div>

        {/* Compare Mode Toggle */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#B0BEC5] text-sm font-medium">
            <BarChart3 className="w-4 h-4" />
            Compare Crops
          </label>
          <div className="flex items-center h-12">
            <motion.button
              onClick={() => setCompareMode(!compareMode)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                compareMode 
                  ? 'bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1] shadow-[0_0_20px_rgba(102,187,106,0.3)]' 
                  : 'bg-[#2A2A2A] border border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                  compareMode ? 'left-7' : 'left-0.5'
                }`}
                layout
              />
            </motion.button>
            <span className={`ml-3 text-sm font-medium ${compareMode ? 'text-[#66BB6A]' : 'text-[#B0BEC5]'}`}>
              {compareMode ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* Active Filters Display */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[#B0BEC5] text-sm font-medium">
            <Filter className="w-4 h-4" />
            Active Filters
          </label>
          <div className="flex flex-wrap gap-2 min-h-[3rem] items-start content-start">
            {selectedCrop !== 'all' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#66BB6A]/20 text-[#66BB6A] border border-[#66BB6A]/30"
              >
                {crops.find(c => c.value === selectedCrop)?.label}
                <button
                  onClick={() => setSelectedCrop('all')}
                  className="ml-1 hover:bg-[#66BB6A]/30 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </motion.span>
            )}
            
            {dateRange !== 'week' && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#4DD0E1]/20 text-[#4DD0E1] border border-[#4DD0E1]/30"
              >
                {dateRanges.find(r => r.value === dateRange)?.label}
                <button
                  onClick={() => setDateRange('week')}
                  className="ml-1 hover:bg-[#4DD0E1]/30 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </motion.span>
            )}
            
            {compareMode && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFD54F]/20 text-[#FFD54F] border border-[#FFD54F]/30"
              >
                Compare Mode
                <button
                  onClick={() => setCompareMode(false)}
                  className="ml-1 hover:bg-[#FFD54F]/30 rounded-full p-0.5 transition-colors"
                >
                  ×
                </button>
              </motion.span>
            )}

            {selectedCrop === 'all' && dateRange === 'week' && !compareMode && (
              <span className="text-[#B0BEC5] text-xs italic py-2">
                No active filters
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Filter Buttons */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#B0BEC5] text-sm font-medium">Quick Filters:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => {
              setSelectedCrop('wheat')
              setDateRange('month')
            }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#66BB6A]/10 text-[#66BB6A] border border-[#66BB6A]/20 hover:bg-[#66BB6A]/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Wheat This Month
          </motion.button>
          <motion.button
            onClick={() => {
              setSelectedCrop('all')
              setDateRange('week')
              setCompareMode(true)
            }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#4DD0E1]/10 text-[#4DD0E1] border border-[#4DD0E1]/20 hover:bg-[#4DD0E1]/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Compare All Crops
          </motion.button>
          <motion.button
            onClick={() => {
              setSelectedCrop('all')
              setDateRange('season')
            }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFD54F]/10 text-[#FFD54F] border border-[#FFD54F]/20 hover:bg-[#FFD54F]/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Current Season
          </motion.button>
          <motion.button
            onClick={() => {
              setSelectedCrop('all')
              setDateRange('week')
              setCompareMode(false)
            }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-[#B0BEC5] border border-white/20 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear All
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}