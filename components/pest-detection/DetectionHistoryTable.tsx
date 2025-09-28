'use client'

import { motion } from 'framer-motion'
import { Eye, Download, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react'

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

interface DetectionHistoryTableProps {
  detections: DetectionResult[]
}

export function DetectionHistoryTable({ detections }: DetectionHistoryTableProps) {
  const getSeverityPill = (severity: string) => {
    switch (severity) {
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#66BB6A]/20 text-[#66BB6A] border border-[#66BB6A]/30">
            <div className="w-2 h-2 rounded-full bg-[#66BB6A] animate-pulse" />
            Low
          </span>
        )
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#FFD54F]/20 text-[#FFD54F] border border-[#FFD54F]/30">
            <div className="w-2 h-2 rounded-full bg-[#FFD54F] animate-pulse" />
            Medium
          </span>
        )
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#E53935]/20 text-[#E53935] border border-[#E53935]/30">
            <div className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
            High
          </span>
        )
      default:
        return <span className="text-[#B0BEC5]">Unknown</span>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-[#FFD54F]" />
      case 'applied':
        return <AlertTriangle className="w-4 h-4 text-[#4DD0E1]" />
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-[#66BB6A]" />
      default:
        return <Clock className="w-4 h-4 text-[#B0BEC5]" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="text-[#FFD54F] capitalize">Pending</span>
      case 'applied':
        return <span className="text-[#4DD0E1] capitalize">Applied</span>
      case 'resolved':
        return <span className="text-[#66BB6A] capitalize">Resolved</span>
      default:
        return <span className="text-[#B0BEC5] capitalize">{status}</span>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#F5F5F5] text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#4DD0E1]" />
          Detection History
        </h3>
        <div className="text-[#B0BEC5] text-sm">
          {detections.length} records found
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Date</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Crop</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Pest/Disease</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Severity</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Confidence</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Status</th>
              <th className="text-left text-[#B0BEC5] text-sm font-medium py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((detection, index) => (
              <motion.tr
                key={detection.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200"
              >
                <td className="py-4 px-2">
                  <span className="text-[#F5F5F5] text-sm">
                    {new Date(detection.date).toLocaleDateString()}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[#F5F5F5] font-medium">{detection.crop}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-[#F5F5F5]">{detection.pestDisease}</span>
                </td>
                <td className="py-4 px-2">
                  {getSeverityPill(detection.severity)}
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-12 bg-[#1A1A1A] rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1]"
                        style={{ width: `${detection.confidence}%` }}
                      />
                    </div>
                    <span className="text-[#F5F5F5] text-sm font-medium">
                      {detection.confidence}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(detection.treatmentStatus)}
                    {getStatusText(detection.treatmentStatus)}
                  </div>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-[#4DD0E1]/20 text-[#4DD0E1] hover:bg-[#4DD0E1]/30 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-[#66BB6A]/20 text-[#66BB6A] hover:bg-[#66BB6A]/30 transition-colors"
                      title="Download Report"
                    >
                      <Download className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {detections.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A1A1A] flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#B0BEC5]" />
          </div>
          <h4 className="text-[#F5F5F5] font-medium mb-2">No detections yet</h4>
          <p className="text-[#B0BEC5] text-sm">Upload crop images to start tracking pest and disease detections</p>
        </div>
      )}
    </motion.div>
  )
}