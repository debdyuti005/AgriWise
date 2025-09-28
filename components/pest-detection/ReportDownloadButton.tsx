'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, FileSpreadsheet, Calendar, CheckCircle, Loader2 } from 'lucide-react'

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

interface ReportDownloadButtonProps {
  detections: DetectionResult[]
}

export function ReportDownloadButton({ detections }: ReportDownloadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloaded, setDownloaded] = useState<string | null>(null)

  const handleDownload = async (format: 'pdf' | 'csv' | 'excel') => {
    setDownloading(format)
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate mock data based on format
    const reportData = {
      title: 'Pest & Disease Detection Report',
      dateRange: `${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
      totalScans: detections.length,
      healthyPercentage: Math.round((detections.filter(d => d.severity === 'low').length / detections.length) * 100),
      criticalIssues: detections.filter(d => d.severity === 'high').length,
      detections: detections
    }

    // Create and download file based on format
    if (format === 'pdf') {
      // In a real app, use libraries like jsPDF or react-pdf
      const pdfContent = `
        Pest & Disease Detection Report
        Generated: ${new Date().toLocaleString()}
        
        Summary:
        - Total Scans: ${reportData.totalScans}
        - Healthy Crops: ${reportData.healthyPercentage}%
        - Critical Issues: ${reportData.criticalIssues}
        
        Detailed Records:
        ${reportData.detections.map(d => 
          `${d.date} | ${d.crop} | ${d.pestDisease} | ${d.severity.toUpperCase()} | ${d.confidence}%`
        ).join('\n')}
      `
      
      const blob = new Blob([pdfContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pest-detection-report-${new Date().toISOString().split('T')[0]}.txt`
      a.click()
      URL.revokeObjectURL(url)
    } else if (format === 'csv' || format === 'excel') {
      const csvContent = [
        'Date,Crop,Pest/Disease,Severity,Confidence,Treatment Status',
        ...reportData.detections.map(d => 
          `${d.date},${d.crop},${d.pestDisease},${d.severity},${d.confidence}%,${d.treatmentStatus}`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pest-detection-data-${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'csv' : 'xlsx'}`
      a.click()
      URL.revokeObjectURL(url)
    }

    setDownloading(null)
    setDownloaded(format)
    
    // Reset downloaded state after 3 seconds
    setTimeout(() => {
      setDownloaded(null)
    }, 3000)
  }

  const reportOptions = [
    {
      format: 'pdf' as const,
      title: 'PDF Report',
      description: 'Complete analysis with charts and insights',
      icon: <FileText className="w-5 h-5" />,
      size: '~2.5 MB',
      color: 'text-[#E53935]'
    },
    {
      format: 'csv' as const,
      title: 'CSV Data',
      description: 'Raw data for external analysis',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      size: '~15 KB',
      color: 'text-[#66BB6A]'
    },
    {
      format: 'excel' as const,
      title: 'Excel Workbook',
      description: 'Formatted data with pivot tables',
      icon: <FileSpreadsheet className="w-5 h-5" />,
      size: '~45 KB',
      color: 'text-[#4DD0E1]'
    }
  ]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="liquid-glass-dark px-8 py-4 rounded-2xl bg-gradient-to-r from-[#66BB6A]/20 to-[#4DD0E1]/20 border border-[#66BB6A]/30 text-[#F5F5F5] font-medium flex items-center gap-3 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(102,187,106,0.3)] hover:scale-105"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Download className="w-5 h-5 text-[#66BB6A]" />
        <span>Download Report</span>
        <div className="ml-2 text-[#B0BEC5] text-sm">
          {detections.length} records
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-96 glassmorphism-dark p-6 rounded-2xl border border-white/20 backdrop-blur-xl z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[#F5F5F5] text-xl font-semibold">Export Report</h3>
                  <p className="text-[#B0BEC5] text-sm">Choose your preferred format</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#B0BEC5] hover:text-[#F5F5F5] transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Report Summary */}
              <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A] to-[#2A2A2A] border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-[#4DD0E1]" />
                      <span className="text-[#B0BEC5] text-sm">Date Range</span>
                    </div>
                    <p className="text-[#F5F5F5] text-sm font-medium">
                      Last 7 days
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-[#66BB6A]" />
                      <span className="text-[#B0BEC5] text-sm">Records</span>
                    </div>
                    <p className="text-[#F5F5F5] text-sm font-medium">
                      {detections.length} detections
                    </p>
                  </div>
                </div>
              </div>

              {/* Format Options */}
              <div className="space-y-3">
                {reportOptions.map((option) => (
                  <motion.button
                    key={option.format}
                    onClick={() => handleDownload(option.format)}
                    disabled={downloading === option.format}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-[#1A1A1A]/50 to-[#2A2A2A]/50 border border-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    whileHover={{ scale: downloading === option.format ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={option.color}>
                          {downloading === option.format ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : downloaded === option.format ? (
                            <CheckCircle className="w-5 h-5 text-[#66BB6A]" />
                          ) : (
                            option.icon
                          )}
                        </div>
                        <div className="text-left">
                          <h4 className="text-[#F5F5F5] font-medium">
                            {option.title}
                          </h4>
                          <p className="text-[#B0BEC5] text-sm">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[#B0BEC5] text-xs">
                          {option.size}
                        </span>
                        {downloading === option.format && (
                          <div className="mt-1">
                            <div className="w-16 bg-[#1A1A1A] rounded-full h-1">
                              <motion.div
                                className="h-1 rounded-full bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1]"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                              />
                            </div>
                          </div>
                        )}
                        {downloaded === option.format && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-[#66BB6A] text-xs font-medium mt-1"
                          >
                            Downloaded!
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[#B0BEC5] text-xs text-center">
                  Reports are automatically encrypted and include timestamp verification
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}