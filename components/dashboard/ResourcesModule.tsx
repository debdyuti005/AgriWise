'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  User,
  Phone,
  AlertTriangle,
  FileText,
  Download,
  Eye
} from 'lucide-react'

interface ResourceRequest {
  id: string
  type: 'seeds' | 'fertilizer' | 'tools' | 'pesticide' | 'equipment'
  item: string
  itemHindi: string
  quantity: number
  unit: string
  unitHindi: string
  status: 'pending' | 'approved' | 'in-transit' | 'delivered' | 'rejected'
  requestDate: string
  expectedDelivery?: string
  actualDelivery?: string
  supplier: string
  supplierHindi: string
  cost: number
  subsidyAmount?: number
  urgency: 'low' | 'medium' | 'high'
  notes?: string
  notesHindi?: string
  trackingId?: string
}

interface ResourcesModuleProps {
  isHindi?: boolean
}

const mockRequests: ResourceRequest[] = [
  {
    id: '1',
    type: 'seeds',
    item: 'Wheat Seeds - PBW 725',
    itemHindi: 'गेहूं के बीज - पीबीडब्ल्यू 725',
    quantity: 50,
    unit: 'kg',
    unitHindi: 'किलो',
    status: 'in-transit',
    requestDate: '2025-09-20',
    expectedDelivery: '2025-09-30',
    supplier: 'Punjab Agro Industries',
    supplierHindi: 'पंजाब एग्रो इंडस्ट्रीज',
    cost: 2500,
    subsidyAmount: 500,
    urgency: 'high',
    notes: 'Required for next sowing season',
    notesHindi: 'अगली बुवाई के मौसम के लिए आवश्यक',
    trackingId: 'TRK123456'
  },
  {
    id: '2',
    type: 'fertilizer',
    item: 'NPK Fertilizer (12:32:16)',
    itemHindi: 'एनपीके उर्वरक (12:32:16)',
    quantity: 100,
    unit: 'kg',
    unitHindi: 'किलो',
    status: 'approved',
    requestDate: '2025-09-25',
    expectedDelivery: '2025-10-05',
    supplier: 'Haryana Fertilizers Ltd',
    supplierHindi: 'हरियाणा फर्टिलाइजर्स लिमिटेड',
    cost: 3200,
    subsidyAmount: 800,
    urgency: 'medium',
    notes: 'For winter crop preparation',
    notesHindi: 'सर्दी की फसल की तैयारी के लिए',
    trackingId: 'TRK123457'
  },
  {
    id: '3',
    type: 'tools',
    item: 'Power Tiller',
    itemHindi: 'पावर टिलर',
    quantity: 1,
    unit: 'piece',
    unitHindi: 'पीस',
    status: 'pending',
    requestDate: '2025-09-28',
    supplier: 'Agriculture Equipment Co-op',
    supplierHindi: 'कृषि उपकरण सहकारी',
    cost: 45000,
    subsidyAmount: 15000,
    urgency: 'low',
    notes: 'For land preparation',
    notesHindi: 'भूमि तैयारी के लिए'
  },
  {
    id: '4',
    type: 'pesticide',
    item: 'Fungicide - Mancozeb',
    itemHindi: 'फंगीसाइड - मैंकोज़ेब',
    quantity: 5,
    unit: 'liter',
    unitHindi: 'लीटर',
    status: 'delivered',
    requestDate: '2025-09-15',
    expectedDelivery: '2025-09-22',
    actualDelivery: '2025-09-21',
    supplier: 'Crop Protection Solutions',
    supplierHindi: 'फसल सुरक्षा समाधान',
    cost: 1800,
    subsidyAmount: 360,
    urgency: 'high',
    notes: 'For pest control',
    notesHindi: 'कीट नियंत्रण के लिए',
    trackingId: 'TRK123458'
  }
]

const statusColors = {
  pending: 'from-[#FFD54F] to-[#FFC107]',
  approved: 'from-[#4DD0E1] to-[#00BCD4]',
  'in-transit': 'from-[#FF9800] to-[#F57C00]',
  delivered: 'from-[#66BB6A] to-[#4CAF50]',
  rejected: 'from-[#E53935] to-[#F44336]'
}

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  'in-transit': Truck,
  delivered: CheckCircle,
  rejected: XCircle
}

const typeIcons = {
  seeds: Package,
  fertilizer: Package,
  tools: Package,
  pesticide: Package,
  equipment: Package
}

const urgencyColors = {
  low: 'text-[#66BB6A]',
  medium: 'text-[#FFD54F]',
  high: 'text-[#E53935]'
}

export function ResourcesModule({ isHindi = false }: ResourcesModuleProps) {
  const [requests] = useState<ResourceRequest[]>(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<ResourceRequest | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNewRequest, setShowNewRequest] = useState(false)

  const filteredRequests = requests.filter(request => {
    if (filterStatus !== 'all' && request.status !== filterStatus) return false
    if (filterType !== 'all' && request.type !== filterType) return false
    if (searchTerm && !request.item.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !request.itemHindi.includes(searchTerm)) return false
    return true
  })

  const getStatusText = (status: string) => {
    if (!isHindi) {
      return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
    }
    
    switch (status) {
      case 'pending': return 'लंबित'
      case 'approved': return 'स्वीकृत'
      case 'in-transit': return 'परिवहन में'
      case 'delivered': return 'डिलीवर हुआ'
      case 'rejected': return 'अस्वीकृत'
      default: return status
    }
  }

  const getTypeText = (type: string) => {
    if (!isHindi) {
      return type.charAt(0).toUpperCase() + type.slice(1)
    }
    
    switch (type) {
      case 'seeds': return 'बीज'
      case 'fertilizer': return 'उर्वरक'
      case 'tools': return 'औजार'
      case 'pesticide': return 'कीटनाशक'
      case 'equipment': return 'उपकरण'
      default: return type
    }
  }

  const getUrgencyText = (urgency: string) => {
    if (!isHindi) {
      return urgency.charAt(0).toUpperCase() + urgency.slice(1)
    }
    
    switch (urgency) {
      case 'low': return 'कम'
      case 'medium': return 'मध्यम'
      case 'high': return 'उच्च'
      default: return urgency
    }
  }

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
                {isHindi ? 'संसाधन और अनुरोध' : 'Resources & Requests'}
              </h1>
              <p className="text-[#B0BEC5]">
                {isHindi 
                  ? 'बीज, उर्वरक, औजार का अनुरोध करें और ट्रैक करें'
                  : 'Request and track seeds, fertilizers, tools and equipment'
                }
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNewRequest(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              {isHindi ? 'नया अनुरोध' : 'New Request'}
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
              <Clock className="w-8 h-8 text-[#FFD54F]" />
              <span className="text-[#FFD54F] font-medium">
                {requests.filter(r => r.status === 'pending').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'लंबित' : 'Pending'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Truck className="w-8 h-8 text-[#FF9800]" />
              <span className="text-[#FF9800] font-medium">
                {requests.filter(r => r.status === 'in-transit').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'परिवहन में' : 'In Transit'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-8 h-8 text-[#66BB6A]" />
              <span className="text-[#66BB6A] font-medium">
                {requests.filter(r => r.status === 'delivered').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'डिलीवर हुआ' : 'Delivered'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-8 h-8 text-[#E53935]" />
              <span className="text-[#E53935] font-medium">
                {requests.filter(r => r.urgency === 'high').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'जरूरी' : 'Urgent'}
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
                placeholder={isHindi ? 'वस्तु खोजें...' : 'Search items...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              />
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी प्रकार' : 'All Types'}</option>
              <option value="seeds">{isHindi ? 'बीज' : 'Seeds'}</option>
              <option value="fertilizer">{isHindi ? 'उर्वरक' : 'Fertilizer'}</option>
              <option value="tools">{isHindi ? 'औजार' : 'Tools'}</option>
              <option value="pesticide">{isHindi ? 'कीटनाशक' : 'Pesticide'}</option>
              <option value="equipment">{isHindi ? 'उपकरण' : 'Equipment'}</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी स्थिति' : 'All Status'}</option>
              <option value="pending">{isHindi ? 'लंबित' : 'Pending'}</option>
              <option value="approved">{isHindi ? 'स्वीकृत' : 'Approved'}</option>
              <option value="in-transit">{isHindi ? 'परिवहन में' : 'In Transit'}</option>
              <option value="delivered">{isHindi ? 'डिलीवर हुआ' : 'Delivered'}</option>
              <option value="rejected">{isHindi ? 'अस्वीकृत' : 'Rejected'}</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-[#B0BEC5]">
              <span>{isHindi ? 'कुल अनुरोध:' : 'Total Requests:'}</span>
              <span className="text-[#F5F5F5] font-medium">{filteredRequests.length}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requests List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRequests.map((request, index) => {
              const StatusIcon = statusIcons[request.status]
              const TypeIcon = typeIcons[request.type]
              const statusColor = statusColors[request.status]
              
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glassmorphism-dark p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedRequest?.id === request.id
                      ? 'border-[#66BB6A]/30 shadow-[#66BB6A]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${statusColor} flex items-center justify-center`}>
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-[#F5F5F5] font-semibold text-lg">
                          {isHindi ? request.itemHindi : request.item}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[request.urgency]}`}>
                            {getUrgencyText(request.urgency)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${statusColor}`}>
                            {getStatusText(request.status)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-[#B0BEC5] mb-3">
                        <span>{request.quantity} {isHindi ? request.unitHindi : request.unit}</span>
                        <span>₹{request.cost.toLocaleString()}</span>
                        {request.subsidyAmount && (
                          <span className="text-[#66BB6A]">
                            -₹{request.subsidyAmount.toLocaleString()} {isHindi ? 'सब्सिडी' : 'subsidy'}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-[#B0BEC5]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(request.requestDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {isHindi ? request.supplierHindi : request.supplier}
                          </div>
                        </div>
                        {request.trackingId && (
                          <div className="text-xs font-mono text-[#66BB6A] bg-[#66BB6A]/10 px-2 py-1 rounded">
                            {request.trackingId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Request Details */}
          <div className="lg:sticky lg:top-6">
            {selectedRequest ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glassmorphism-dark p-8 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                    {isHindi ? selectedRequest.itemHindi : selectedRequest.item}
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${statusColors[selectedRequest.status]}`}>
                      {getStatusText(selectedRequest.status)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgencyColors[selectedRequest.urgency]}`}>
                      {getUrgencyText(selectedRequest.urgency)} {isHindi ? 'प्राथमिकता' : 'Priority'}
                    </span>
                  </div>
                </div>

                {/* Request Details */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-1">
                        {isHindi ? 'मात्रा' : 'Quantity'}
                      </h4>
                      <div className="text-[#F5F5F5] font-bold">
                        {selectedRequest.quantity} {isHindi ? selectedRequest.unitHindi : selectedRequest.unit}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-1">
                        {isHindi ? 'लागत' : 'Cost'}
                      </h4>
                      <div className="text-[#F5F5F5] font-bold">
                        ₹{selectedRequest.cost.toLocaleString()}
                      </div>
                      {selectedRequest.subsidyAmount && (
                        <div className="text-[#66BB6A] text-sm">
                          -₹{selectedRequest.subsidyAmount.toLocaleString()} {isHindi ? 'सब्सिडी' : 'subsidy'}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-[#66BB6A] font-medium mb-2">
                      {isHindi ? 'आपूर्तिकर्ता' : 'Supplier'}
                    </h4>
                    <div className="text-[#F5F5F5] font-medium">
                      {isHindi ? selectedRequest.supplierHindi : selectedRequest.supplier}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-1">
                        {isHindi ? 'अनुरोध तिथि' : 'Request Date'}
                      </h4>
                      <div className="text-[#F5F5F5]">
                        {new Date(selectedRequest.requestDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-1">
                        {isHindi ? 'अपेक्षित डिलीवरी' : 'Expected Delivery'}
                      </h4>
                      <div className="text-[#F5F5F5]">
                        {selectedRequest.expectedDelivery 
                          ? new Date(selectedRequest.expectedDelivery).toLocaleDateString()
                          : isHindi ? 'टीबीडी' : 'TBD'
                        }
                      </div>
                    </div>
                  </div>

                  {selectedRequest.trackingId && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-2">
                        {isHindi ? 'ट्रैकिंग आईडी' : 'Tracking ID'}
                      </h4>
                      <div className="font-mono text-[#F5F5F5] bg-[#66BB6A]/10 px-3 py-2 rounded border border-[#66BB6A]/20">
                        {selectedRequest.trackingId}
                      </div>
                    </div>
                  )}

                  {selectedRequest.notes && (
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="text-[#66BB6A] font-medium mb-2">
                        {isHindi ? 'टिप्पणी' : 'Notes'}
                      </h4>
                      <p className="text-[#B0BEC5]">
                        {isHindi ? selectedRequest.notesHindi : selectedRequest.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {selectedRequest.status === 'in-transit' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Truck className="w-5 h-5" />
                      {isHindi ? 'ट्रैक करें' : 'Track Order'}
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-white/10 text-[#B0BEC5] rounded-xl hover:bg-white/20 hover:text-[#F5F5F5] transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-3 bg-white/10 text-[#B0BEC5] rounded-xl hover:bg-white/20 hover:text-[#F5F5F5] transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="glassmorphism-dark p-8 rounded-2xl border border-white/10 text-center">
                <Eye className="w-12 h-12 text-[#B0BEC5] mx-auto mb-4" />
                <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
                  {isHindi ? 'अनुरोध चुनें' : 'Select a Request'}
                </h3>
                <p className="text-[#B0BEC5]">
                  {isHindi 
                    ? 'विस्तृत जानकारी देखने के लिए कोई अनुरोध चुनें'
                    : 'Choose a request to view detailed information'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}