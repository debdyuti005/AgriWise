'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Plus, X, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Volume2 } from 'lucide-react'

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

interface PriceAlert {
  id: string
  cropId: string
  cropName: string
  alertType: 'above' | 'below'
  targetPrice: number
  currentPrice: number
  isActive: boolean
  triggered: boolean
  createdAt: string
}

interface PriceAlertCardProps {
  crops: CropPrice[]
}

export function PriceAlertCard({ crops }: PriceAlertCardProps) {
  const [alertIdCounter, setAlertIdCounter] = useState(3)
  const [currentDate, setCurrentDate] = useState('')
  
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-CA'))
  }, [])
  
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      cropId: 'wheat',
      cropName: 'Wheat',
      alertType: 'above',
      targetPrice: 2900,
      currentPrice: 2850,
      isActive: true,
      triggered: false,
      createdAt: '2025-09-26'
    },
    {
      id: '2',
      cropId: 'maize',
      cropName: 'Maize',
      alertType: 'above',
      targetPrice: 1900,
      currentPrice: 1950,
      isActive: true,
      triggered: true,
      createdAt: '2025-09-25'
    }
  ])

  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    cropId: '',
    alertType: 'above' as 'above' | 'below',
    targetPrice: ''
  })

  const handleCreateAlert = () => {
    if (newAlert.cropId && newAlert.targetPrice) {
      const crop = crops.find(c => c.id === newAlert.cropId)
      if (crop) {
        const alert: PriceAlert = {
          id: alertIdCounter.toString(),
          cropId: newAlert.cropId,
          cropName: crop.name,
          alertType: newAlert.alertType,
          targetPrice: parseFloat(newAlert.targetPrice),
          currentPrice: crop.price,
          isActive: true,
          triggered: false,
          createdAt: currentDate
        }
        setAlerts([...alerts, alert])
        setAlertIdCounter(prev => prev + 1)
        setNewAlert({ cropId: '', alertType: 'above', targetPrice: '' })
        setShowCreateAlert(false)
      }
    }
  }

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ))
  }

  const activeAlerts = alerts.filter(alert => alert.isActive)
  const triggeredAlerts = alerts.filter(alert => alert.triggered && alert.isActive)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glassmorphism-dark p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#FFC107]" />
          <h3 className="text-[#F5F5F5] text-xl font-semibold">Price Alerts</h3>
          {triggeredAlerts.length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#E53935]"
            />
          )}
        </div>
        <motion.button
          onClick={() => setShowCreateAlert(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-[#4CAF50]/20 text-[#4CAF50] hover:bg-[#4CAF50]/30 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-[#4CAF50] font-bold text-lg">{activeAlerts.length}</p>
          <p className="text-[#B0BEC5] text-xs">Active</p>
        </div>
        <div className="text-center">
          <p className="text-[#E53935] font-bold text-lg">{triggeredAlerts.length}</p>
          <p className="text-[#B0BEC5] text-xs">Triggered</p>
        </div>
        <div className="text-center">
          <p className="text-[#FFC107] font-bold text-lg">{alerts.length - activeAlerts.length}</p>
          <p className="text-[#B0BEC5] text-xs">Paused</p>
        </div>
      </div>

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[#E53935] font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Alert Notifications
          </h4>
          <div className="space-y-3">
            {triggeredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-[#4CAF50]/20 to-[#66BB6A]/10 border border-[#4CAF50]/30 shadow-[0_0_20px_rgba(76,175,80,0.3)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                    <span className="text-[#4CAF50] font-semibold">Alert Triggered!</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#81D4FA]" />
                    <span className="text-[#81D4FA] text-xs">Voice + SMS sent</span>
                  </div>
                </div>
                <p className="text-[#F5F5F5] mb-2">
                  <strong>{alert.cropName}</strong> price is now <strong>₹{alert.currentPrice}</strong>
                  {alert.alertType === 'above' ? ' above' : ' below'} your target of ₹{alert.targetPrice}
                </p>
                <p className="text-[#4CAF50] text-sm font-medium">
                  📈 Good time to sell! Price increased by +{Math.round(((alert.currentPrice - alert.targetPrice) / alert.targetPrice) * 100)}%
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Active Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="w-12 h-12 mx-auto mb-3 text-[#B0BEC5]" />
            <h4 className="text-[#F5F5F5] font-medium mb-2">No price alerts set</h4>
            <p className="text-[#B0BEC5] text-sm">Create alerts to get notified when crop prices reach your target</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                alert.isActive
                  ? alert.triggered
                    ? 'bg-gradient-to-r from-[#4CAF50]/10 to-transparent border-[#4CAF50]/30 shadow-[0_0_15px_rgba(76,175,80,0.2)]'
                    : 'bg-gradient-to-r from-[#1B1B1B]/50 to-[#2A2A2A]/50 border-white/10'
                  : 'bg-gradient-to-r from-[#2A2A2A]/30 to-transparent border-white/5 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => toggleAlert(alert.id)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      alert.isActive
                        ? 'bg-[#4CAF50] border-[#4CAF50]'
                        : 'border-[#B0BEC5] hover:border-[#4CAF50]'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {alert.isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-white"
                      />
                    )}
                  </motion.button>
                  <div>
                    <h4 className="text-[#F5F5F5] font-semibold">{alert.cropName}</h4>
                    <p className="text-[#B0BEC5] text-sm">
                      Alert when price goes {alert.alertType} ₹{alert.targetPrice}
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleDeleteAlert(alert.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 rounded-full bg-[#E53935]/20 text-[#E53935] hover:bg-[#E53935]/30 transition-colors"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#B0BEC5] text-sm">Current: ₹{alert.currentPrice}</span>
                  <div className="w-1 h-1 rounded-full bg-[#B0BEC5]" />
                  <span className="text-[#B0BEC5] text-sm">Target: ₹{alert.targetPrice}</span>
                </div>
                <div className="flex items-center gap-1">
                  {alert.alertType === 'above' ? (
                    <TrendingUp className="w-4 h-4 text-[#4CAF50]" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-[#E53935]" />
                  )}
                  <span className={`text-xs font-medium ${
                    alert.currentPrice >= alert.targetPrice 
                      ? 'text-[#4CAF50]' 
                      : 'text-[#FFC107]'
                  }`}>
                    {alert.currentPrice >= alert.targetPrice ? 'Target reached' : 
                     `₹${Math.abs(alert.targetPrice - alert.currentPrice)} to go`}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-[#1B1B1B] rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(100, (alert.currentPrice / alert.targetPrice) * 100)}%` 
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-2 rounded-full ${
                    alert.currentPrice >= alert.targetPrice
                      ? 'bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]'
                      : 'bg-gradient-to-r from-[#FFC107] to-[#FFD54F]'
                  }`}
                />
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Alert Modal */}
      <AnimatePresence>
        {showCreateAlert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowCreateAlert(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 glassmorphism-dark p-6 rounded-2xl border border-white/20 backdrop-blur-xl z-50"
            >
              <h3 className="text-[#F5F5F5] text-xl font-semibold mb-4">Create Price Alert</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[#B0BEC5] text-sm font-medium block mb-2">Select Crop</label>
                  <select
                    value={newAlert.cropId}
                    onChange={(e) => setNewAlert({ ...newAlert, cropId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B]/80 border border-white/10 text-[#F5F5F5] focus:border-[#4CAF50]/50 focus:outline-none"
                  >
                    <option value="">Choose a crop</option>
                    {crops.map(crop => (
                      <option key={crop.id} value={crop.id}>{crop.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[#B0BEC5] text-sm font-medium block mb-2">Alert Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNewAlert({ ...newAlert, alertType: 'above' })}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                        newAlert.alertType === 'above'
                          ? 'bg-[#4CAF50]/20 border-[#4CAF50]/30 text-[#4CAF50]'
                          : 'bg-[#1B1B1B]/50 border-white/10 text-[#B0BEC5]'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 mx-auto mb-1" />
                      Above
                    </button>
                    <button
                      onClick={() => setNewAlert({ ...newAlert, alertType: 'below' })}
                      className={`flex-1 px-4 py-3 rounded-xl border transition-colors ${
                        newAlert.alertType === 'below'
                          ? 'bg-[#E53935]/20 border-[#E53935]/30 text-[#E53935]'
                          : 'bg-[#1B1B1B]/50 border-white/10 text-[#B0BEC5]'
                      }`}
                    >
                      <TrendingDown className="w-4 h-4 mx-auto mb-1" />
                      Below
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[#B0BEC5] text-sm font-medium block mb-2">Target Price (₹)</label>
                  <input
                    type="number"
                    value={newAlert.targetPrice}
                    onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                    placeholder="Enter target price"
                    className="w-full px-4 py-3 rounded-xl bg-[#1B1B1B]/80 border border-white/10 text-[#F5F5F5] focus:border-[#4CAF50]/50 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#2A2A2A] text-[#B0BEC5] hover:bg-[#3A3A3A] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateAlert}
                  disabled={!newAlert.cropId || !newAlert.targetPrice}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#4CAF50] text-white hover:bg-[#45A049] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Alert
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}