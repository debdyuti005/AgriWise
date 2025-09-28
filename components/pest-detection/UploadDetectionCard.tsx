'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Camera, X, CheckCircle, AlertTriangle, Clock } from 'lucide-react'

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

interface UploadDetectionCardProps {
  onImageUpload: (file: File) => void
  latestDetection: DetectionResult | null
}

export function UploadDetectionCard({ onImageUpload, latestDetection }: UploadDetectionCardProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      setUploading(true)
      setPreviewImage(URL.createObjectURL(file))
      onImageUpload(file)
      
      // Simulate upload delay
      setTimeout(() => {
        setUploading(false)
      }, 2000)
    }
  }, [onImageUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }, [handleFile])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return { border: 'border-[#66BB6A]/50', glow: 'shadow-[0_0_20px_rgba(102,187,106,0.3)]', text: 'text-[#66BB6A]' }
      case 'medium': return { border: 'border-[#FFD54F]/50', glow: 'shadow-[0_0_20px_rgba(255,213,79,0.3)]', text: 'text-[#FFD54F]' }
      case 'high': return { border: 'border-[#E53935]/50', glow: 'shadow-[0_0_20px_rgba(229,57,53,0.3)]', text: 'text-[#E53935]' }
      default: return { border: 'border-white/20', glow: '', text: 'text-[#B0BEC5]' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
      >
        <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#4DD0E1]" />
          Upload Crop Image
        </h3>

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-[#66BB6A] bg-[#66BB6A]/10' 
              : 'border-white/20 hover:border-[#4DD0E1]/50'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          {uploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="w-16 h-16 mx-auto border-4 border-[#4DD0E1] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#4DD0E1] font-medium">Analyzing image...</p>
            </motion.div>
          ) : previewImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-32 h-32 mx-auto rounded-lg object-cover"
              />
              <p className="text-[#66BB6A] font-medium">Image uploaded successfully!</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 mx-auto text-[#B0BEC5]" />
              <div>
                <p className="text-[#F5F5F5] font-medium">Drop your crop image here</p>
                <p className="text-[#B0BEC5] text-sm mt-1">or click to browse</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Latest Detection Result */}
      <AnimatePresence>
        {latestDetection && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`glassmorphism-dark p-6 rounded-2xl border backdrop-blur-xl ${getSeverityColor(latestDetection.severity).border} ${getSeverityColor(latestDetection.severity).glow}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#F5F5F5] text-xl font-semibold">Latest Detection</h3>
              <div className="flex items-center gap-2">
                {latestDetection.severity === 'low' && <CheckCircle className="w-5 h-5 text-[#66BB6A]" />}
                {latestDetection.severity === 'medium' && <AlertTriangle className="w-5 h-5 text-[#FFD54F]" />}
                {latestDetection.severity === 'high' && <AlertTriangle className="w-5 h-5 text-[#E53935]" />}
                <span className={`text-sm font-medium capitalize ${getSeverityColor(latestDetection.severity).text}`}>
                  {latestDetection.severity} Risk
                </span>
              </div>
            </div>

            {latestDetection.image && (
              <div className="mb-4">
                <img 
                  src={latestDetection.image} 
                  alt="Detected crop" 
                  className="w-full h-48 rounded-lg object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[#B0BEC5] text-sm">Crop</p>
                <p className="text-[#F5F5F5] font-medium">{latestDetection.crop}</p>
              </div>
              <div>
                <p className="text-[#B0BEC5] text-sm">Detected Issue</p>
                <p className="text-[#F5F5F5] font-medium">{latestDetection.pestDisease}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#B0BEC5] text-sm">Confidence</span>
                  <span className="text-[#F5F5F5] text-sm font-medium">{latestDetection.confidence}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A] rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${latestDetection.confidence}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-2 rounded-full bg-gradient-to-r from-[#66BB6A] to-[#4DD0E1]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B0BEC5]" />
                <span className="text-[#B0BEC5] text-sm">
                  Detected on {new Date(latestDetection.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}