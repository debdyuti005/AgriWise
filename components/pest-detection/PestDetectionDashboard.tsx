'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Bug, Leaf, AlertTriangle, TrendingUp, Download, Filter, Calendar, Crop } from 'lucide-react'
import { OverviewCard } from './OverviewCard'
import { UploadDetectionCard } from './UploadDetectionCard'
import { DetectionHistoryTable } from './DetectionHistoryTable'
import { TreatmentTabs } from './TreatmentTabs'
import { PestDiseaseCharts } from './PestDiseaseCharts'
import { AIInsightsCard } from './AIInsightsCard'
import { FilterControls } from './FilterControls'
import { ReportDownloadButton } from './ReportDownloadButton'

interface DetectionResult {
  id: string
  date: string
  crop: string
  pestDisease: string
  severity: 'low' | 'medium' | 'high'
  confidence: number
  treatmentStatus: 'pending' | 'applied' | 'resolved'
  image?: string
}

export function PestDetectionDashboard() {
  const [selectedCrop, setSelectedCrop] = useState('all')
  const [selectedSeason, setSelectedSeason] = useState('current')
  const [dateRange, setDateRange] = useState('week')
  const [compareMode, setCompareMode] = useState(false)
  const [latestDetection, setLatestDetection] = useState<DetectionResult | null>(null)

  // Mock data - replace with real API calls
  const overviewData = {
    totalScans: 245,
    healthyRatio: 68,
    infectedRatio: 32,
    mostCommonIssue: { name: 'Aphids', percentage: 23 },
    criticalAlerts: 3
  }

  const detectionHistory: DetectionResult[] = [
    {
      id: '1',
      date: '2025-09-28',
      crop: 'Wheat',
      pestDisease: 'Leaf Rust',
      severity: 'high',
      confidence: 94,
      treatmentStatus: 'pending'
    },
    {
      id: '2',
      date: '2025-09-27',
      crop: 'Rice',
      pestDisease: 'Brown Planthopper',
      severity: 'medium',
      confidence: 87,
      treatmentStatus: 'applied'
    },
    {
      id: '3',
      date: '2025-09-26',
      crop: 'Maize',
      pestDisease: 'Aphids',
      severity: 'low',
      confidence: 91,
      treatmentStatus: 'resolved'
    }
  ]

  const handleImageUpload = useCallback((file: File) => {
    // Simulate AI detection process
    setTimeout(() => {
      const mockResult: DetectionResult = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        crop: 'Wheat',
        pestDisease: 'Powdery Mildew',
        severity: 'medium',
        confidence: 89,
        treatmentStatus: 'pending',
        image: URL.createObjectURL(file)
      }
      setLatestDetection(mockResult)
    }, 2000)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] via-[#1A1A1A] to-[#0D0D0D] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#66BB6A] via-[#FFD54F] to-[#E53935] bg-clip-text text-transparent">
            Pest & Disease Detection Dashboard
          </h1>
          <p className="text-[#B0BEC5] text-lg max-w-2xl mx-auto">
            Scan, track, and protect your crops with AI-powered detection and smart insights.
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(102, 187, 106, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass-dark px-6 py-3 rounded-2xl bg-gradient-to-r from-[#66BB6A]/20 to-[#4CAF50]/20 border border-[#66BB6A]/30 text-[#F5F5F5] font-medium flex items-center gap-2 backdrop-blur-xl"
            >
              <Upload className="w-5 h-5" />
              Upload Image
            </motion.button>

            <select 
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="liquid-glass-dark px-4 py-3 rounded-2xl bg-[#1A1A1A]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl"
            >
              <option value="all">All Crops</option>
              <option value="wheat">Wheat</option>
              <option value="rice">Rice</option>
              <option value="maize">Maize</option>
              <option value="cotton">Cotton</option>
            </select>

            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="liquid-glass-dark px-4 py-3 rounded-2xl bg-[#1A1A1A]/80 border border-white/10 text-[#F5F5F5] backdrop-blur-xl"
            >
              <option value="current">Current Season</option>
              <option value="kharif">Kharif</option>
              <option value="rabi">Rabi</option>
              <option value="zaid">Zaid</option>
            </select>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <OverviewCard
            title="Total Scans"
            value={overviewData.totalScans.toString()}
            icon={<Bug className="w-8 h-8" />}
            trend="+12%"
            glowColor="blue"
          />
          <OverviewCard
            title="Healthy vs Infected"
            value={`${overviewData.healthyRatio}% / ${overviewData.infectedRatio}%`}
            icon={<Leaf className="w-8 h-8" />}
            trend="68% healthy"
            glowColor="green"
          />
          <OverviewCard
            title="Most Common Issue"
            value={overviewData.mostCommonIssue.name}
            icon={<AlertTriangle className="w-8 h-8" />}
            trend={`${overviewData.mostCommonIssue.percentage}% cases`}
            glowColor="amber"
          />
          <OverviewCard
            title="Critical Alerts"
            value={overviewData.criticalAlerts.toString()}
            icon={<TrendingUp className="w-8 h-8" />}
            trend="Needs attention"
            glowColor="red"
          />
        </motion.div>

        {/* Filter Controls */}
        <FilterControls
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          dateRange={dateRange}
          setDateRange={setDateRange}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload & Recent Detection */}
          <div className="space-y-6">
            <UploadDetectionCard 
              onImageUpload={handleImageUpload}
              latestDetection={latestDetection}
            />
            <AIInsightsCard />
          </div>

          {/* Middle Column - Detection History */}
          <div className="lg:col-span-2 space-y-6">
            <DetectionHistoryTable detections={detectionHistory} />
            <TreatmentTabs latestDetection={latestDetection} />
          </div>
        </div>

        {/* Charts & Visualizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PestDiseaseCharts 
            selectedCrop={selectedCrop}
            dateRange={dateRange}
            compareMode={compareMode}
          />
        </motion.div>

        {/* Export Button */}
        <div className="flex justify-center">
          <ReportDownloadButton detections={detectionHistory} />
        </div>
      </div>
    </div>
  )
}