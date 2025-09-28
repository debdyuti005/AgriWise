'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Wheat, DollarSign, CloudRain, Package, Menu } from 'lucide-react'
import { FarmerSidebar } from './FarmerSidebar'

export function FarmerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D]">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] rounded-xl flex items-center justify-center shadow-lg"
        >
          <Menu className="w-6 h-6 text-[#0D0D0D]" />
        </motion.button>
      </div>

      {/* Sidebar */}
      <FarmerSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentRoute="/dashboard/farmer"
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-80' : 'lg:ml-80'}`}>
        <div className="p-6">
          <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] bg-clip-text text-transparent">
            Farmer Dashboard
          </h1>
          <p className="text-[#B0BEC5] mt-2">
            Monitor your crops, check weather updates, and manage your farm efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Wheat className="w-8 h-8 text-[#66BB6A]" />
              <span className="text-[#66BB6A] font-medium">+5.2%</span>
            </div>
            <h3 className="text-[#F5F5F5] text-2xl font-bold">85%</h3>
            <p className="text-[#B0BEC5] text-sm">Crop Health</p>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-[#FFD54F]" />
              <span className="text-[#66BB6A] font-medium">+8.1%</span>
            </div>
            <h3 className="text-[#F5F5F5] text-2xl font-bold">₹2,500</h3>
            <p className="text-[#B0BEC5] text-sm">Market Price</p>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-[#4DD0E1]" />
              <span className="text-[#E53935] font-medium">-12.3%</span>
            </div>
            <h3 className="text-[#F5F5F5] text-2xl font-bold">68%</h3>
            <p className="text-[#B0BEC5] text-sm">Soil Moisture</p>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <CloudRain className="w-8 h-8 text-[#9C27B0]" />
              <span className="text-[#E53935] font-medium">2</span>
            </div>
            <h3 className="text-[#F5F5F5] text-2xl font-bold">Active</h3>
            <p className="text-[#B0BEC5] text-sm">Weather Alerts</p>
          </div>
        </div>

            <div className="glassmorphism-dark p-8 rounded-2xl border border-white/10">
              <h2 className="text-[#F5F5F5] text-2xl font-bold mb-6">Farm Overview</h2>
              <div className="text-center text-[#B0BEC5]">
                <p>Farm management features coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
