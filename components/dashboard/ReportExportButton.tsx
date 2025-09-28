'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react'

interface ReportExportButtonProps {
  reportType: string
  reportData?: any
  fileName?: string
  role: string
}

export function ReportExportButton({ 
  reportType, 
  reportData, 
  fileName, 
  role 
}: ReportExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf')

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock report data based on role
    const data = generateReportData(role, reportType)
    
    if (exportFormat === 'csv') {
      downloadCSV(data, fileName || `${reportType}-${role}-report`)
    } else {
      downloadPDF(data, fileName || `${reportType}-${role}-report`)
    }

    setIsExporting(false)
  }

  const generateReportData = (userRole: string, type: string) => {
    const baseData = {
      timestamp: new Date().toISOString(),
      role: userRole,
      type: type
    }

    switch (userRole) {
      case 'farmer':
        return {
          ...baseData,
          cropData: ['Wheat: 2.5 acres', 'Rice: 1.8 acres'],
          advisories: 12,
          marketPrices: 'Updated daily',
          subsidyStatus: 'Eligible for 3 schemes'
        }
      case 'officer':
        return {
          ...baseData,
          farmersManaged: 145,
          advisoriesSent: 89,
          fieldVisits: 23,
          responseRate: '94%'
        }
      case 'govt':
        return {
          ...baseData,
          totalFarmers: 15420,
          activeOfficers: 78,
          subsidyDistribution: '₹2.4M',
          cropYield: '+12% vs last season'
        }
      case 'ngo':
        return {
          ...baseData,
          resourcesDistributed: 1240,
          trainingSessions: 45,
          farmerReach: 890,
          impactScore: '8.7/10'
        }
      case 'startup':
        return {
          ...baseData,
          productsPromoted: 15,
          marketplaceOrders: 234,
          pilotPrograms: 5,
          farmerFeedback: '4.6/5 stars'
        }
      default:
        return baseData
    }
  }

  const downloadCSV = (data: any, filename: string) => {
    const csvContent = Object.entries(data)
      .map(([key, value]) => `${key},${value}`)
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const downloadPDF = async (data: any, filename: string) => {
    // Note: In a real implementation, you'd use jsPDF here
    // For now, we'll create a simple text file as demonstration
    const pdfContent = `
AgriWise Report - ${reportType}
Generated: ${new Date().toLocaleString()}
Role: ${role.toUpperCase()}

Report Data:
${Object.entries(data)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

---
This report was generated automatically by AgriWise Dashboard
    `.trim()

    const blob = new Blob([pdfContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.txt`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getReportIcon = () => {
    switch (reportType.toLowerCase()) {
      case 'analytics':
        return TrendingUp
      case 'calendar':
      case 'schedule':
        return Calendar
      default:
        return FileText
    }
  }

  const ReportIcon = getReportIcon()

  return (
    <div className="flex items-center gap-3">
      {/* Format Toggle */}
      <div className="flex bg-white/5 rounded-lg p-1">
        {(['pdf', 'csv'] as const).map((format) => (
          <button
            key={format}
            onClick={() => setExportFormat(format)}
            className={`
              px-3 py-1 rounded text-xs font-medium transition-all duration-200
              ${exportFormat === format 
                ? 'bg-[#66BB6A] text-[#0D0D0D]' 
                : 'text-[#B0BEC5] hover:text-[#F5F5F5]'
              }
            `}
          >
            {format.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Export Button */}
      <motion.button
        onClick={handleExport}
        disabled={isExporting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
          ${isExporting 
            ? 'bg-white/5 text-[#B0BEC5] cursor-not-allowed' 
            : 'bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] hover:shadow-lg hover:shadow-[#66BB6A]/25'
          }
        `}
      >
        {isExporting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-[#B0BEC5] border-t-transparent rounded-full"
            />
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <ReportIcon className="w-4 h-4" />
            <span>Export {reportType}</span>
            <Download className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  )
}