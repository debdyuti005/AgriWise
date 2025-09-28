'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Download, 
  ExternalLink,
  User,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Bell,
  Search,
  Filter,
  ChevronRight,
  Award,
  Target,
  Info
} from 'lucide-react'

interface Scheme {
  id: string
  name: string
  nameHindi: string
  description: string
  descriptionHindi: string
  eligibility: string[]
  eligibilityHindi: string[]
  benefits: string
  benefitsHindi: string
  amount: number
  deadline: string
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'equipment'
  status: 'eligible' | 'not-eligible' | 'applied' | 'approved' | 'rejected'
  applicationSteps: string[]
  applicationStepsHindi: string[]
  documents: string[]
  documentsHindi: string[]
  isNew: boolean
}

interface SchemesModuleProps {
  isHindi?: boolean
}

const mockSchemes: Scheme[] = [
  {
    id: '1',
    name: 'PM-KISAN Samman Nidhi',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    description: 'Direct income support of ₹6000 per year to farmer families owning cultivable land.',
    descriptionHindi: 'खेती योग्य भूमि वाले किसान परिवारों को प्रति वर्ष ₹6000 की प्रत्यक्ष आय सहायता।',
    eligibility: ['Small and marginal farmers', 'Own cultivable land', 'Valid Aadhaar card'],
    eligibilityHindi: ['छोटे और सीमांत किसान', 'खेती योग्य भूमि का मालिक', 'वैध आधार कार्ड'],
    benefits: '₹2000 every 4 months directly to bank account',
    benefitsHindi: 'हर 4 महीने में ₹2000 सीधे बैंक खाते में',
    amount: 6000,
    deadline: '2025-12-31',
    category: 'subsidy',
    status: 'eligible',
    applicationSteps: [
      'Visit PM-KISAN portal',
      'Click on "New Farmer Registration"',
      'Fill personal and land details',
      'Upload required documents',
      'Submit application'
    ],
    applicationStepsHindi: [
      'पीएम-किसान पोर्टल पर जाएं',
      '"नया किसान पंजीकरण" पर क्लिक करें',
      'व्यक्तिगत और भूमि विवरण भरें',
      'आवश्यक दस्तावेज अपलोड करें',
      'आवेदन जमा करें'
    ],
    documents: ['Aadhaar Card', 'Bank Passbook', 'Land Records', 'Mobile Number'],
    documentsHindi: ['आधार कार्ड', 'बैंक पासबुक', 'भूमि रिकॉर्ड', 'मोबाइल नंबर'],
    isNew: false
  },
  {
    id: '2',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    description: 'Crop insurance scheme providing financial support to farmers in case of crop loss.',
    descriptionHindi: 'फसल हानि की स्थिति में किसानों को वित्तीय सहायता प्रदान करने वाली फसल बीमा योजना।',
    eligibility: ['All farmers', 'Own or tenant farmers', 'Notified crops only'],
    eligibilityHindi: ['सभी किसान', 'मालिक या किरायेदार किसान', 'केवल अधिसूचित फसलें'],
    benefits: 'Up to 100% sum insured for crop losses',
    benefitsHindi: 'फसल हानि के लिए 100% तक बीमित राशि',
    amount: 200000,
    deadline: '2025-11-15',
    category: 'insurance',
    status: 'eligible',
    applicationSteps: [
      'Contact nearest bank or insurance company',
      'Fill crop insurance application form',
      'Submit with required documents',
      'Pay premium amount',
      'Get policy document'
    ],
    applicationStepsHindi: [
      'निकटतम बैंक या बीमा कंपनी से संपर्क करें',
      'फसल बीमा आवेदन फॉर्म भरें',
      'आवश्यक दस्तावेजों के साथ जमा करें',
      'प्रीमियम राशि का भुगतान करें',
      'पॉलिसी दस्तावेज प्राप्त करें'
    ],
    documents: ['Aadhaar Card', 'Bank Account', 'Land Records', 'Sowing Certificate'],
    documentsHindi: ['आधार कार्ड', 'बैंक खाता', 'भूमि रिकॉर्ड', 'बुवाई प्रमाण पत्र'],
    isNew: true
  },
  {
    id: '3',
    name: 'KCC - Kisan Credit Card',
    nameHindi: 'केसीसी - किसान क्रेडिट कार्ड',
    description: 'Credit facility for farmers to meet their cultivation and other needs.',
    descriptionHindi: 'किसानों की खेती और अन्य आवश्यकताओं को पूरा करने के लिए ऋण सुविधा।',
    eligibility: ['All farmers', 'Tenant farmers with agreement', 'SHG members'],
    eligibilityHindi: ['सभी किसान', 'समझौते वाले किरायेदार किसान', 'स्वयं सहायता समूह के सदस्य'],
    benefits: 'Flexible credit limit, low interest rate',
    benefitsHindi: 'लचीली ऋण सीमा, कम ब्याज दर',
    amount: 300000,
    deadline: '2025-10-30',
    category: 'loan',
    status: 'applied',
    applicationSteps: [
      'Visit nearest bank branch',
      'Fill KCC application form',
      'Submit documents',
      'Bank verification process',
      'Card issuance'
    ],
    applicationStepsHindi: [
      'निकटतम बैंक शाखा में जाएं',
      'केसीसी आवेदन फॉर्म भरें',
      'दस्तावेज जमा करें',
      'बैंक सत्यापन प्रक्रिया',
      'कार्ड जारी करना'
    ],
    documents: ['Identity Proof', 'Address Proof', 'Land Documents', 'Income Proof'],
    documentsHindi: ['पहचान प्रमाण', 'पता प्रमाण', 'भूमि दस्तावेज', 'आय प्रमाण'],
    isNew: false
  }
]

const statusColors = {
  eligible: 'from-[#66BB6A] to-[#4CAF50]',
  'not-eligible': 'from-[#E53935] to-[#F44336]',
  applied: 'from-[#FFD54F] to-[#FFC107]',
  approved: 'from-[#4DD0E1] to-[#00BCD4]',
  rejected: 'from-[#E53935] to-[#F44336]'
}

const categoryIcons = {
  subsidy: DollarSign,
  loan: BookOpen,
  insurance: Award,
  training: Target,
  equipment: FileText
}

export function SchemesModule({ isHindi = false }: SchemesModuleProps) {
  const [schemes] = useState<Scheme[]>(mockSchemes)
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null)
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredSchemes = schemes.filter(scheme => {
    if (filterCategory !== 'all' && scheme.category !== filterCategory) return false
    if (filterStatus !== 'all' && scheme.status !== filterStatus) return false
    if (searchTerm && !scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !scheme.nameHindi.includes(searchTerm)) return false
    return true
  })

  const getStatusText = (status: string) => {
    if (!isHindi) {
      return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
    }
    
    switch (status) {
      case 'eligible': return 'पात्र'
      case 'not-eligible': return 'अपात्र'
      case 'applied': return 'आवेदित'
      case 'approved': return 'स्वीकृत'
      case 'rejected': return 'अस्वीकृत'
      default: return status
    }
  }

  const getCategoryText = (category: string) => {
    if (!isHindi) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
    
    switch (category) {
      case 'subsidy': return 'सब्सिडी'
      case 'loan': return 'ऋण'
      case 'insurance': return 'बीमा'
      case 'training': return 'प्रशिक्षण'
      case 'equipment': return 'उपकरण'
      default: return category
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] bg-clip-text text-transparent mb-2">
            {isHindi ? 'योजनाएं और सब्सिडी' : 'Schemes & Subsidies'}
          </h1>
          <p className="text-[#B0BEC5]">
            {isHindi 
              ? 'सरकारी योजनाओं का लाभ उठाएं और अपनी कृषि आय बढ़ाएं'
              : 'Leverage government schemes and increase your agricultural income'
            }
          </p>
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
              <CheckCircle className="w-8 h-8 text-[#66BB6A]" />
              <span className="text-[#66BB6A] font-medium">
                {schemes.filter(s => s.status === 'eligible').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'पात्र योजनाएं' : 'Eligible Schemes'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-8 h-8 text-[#FFD54F]" />
              <span className="text-[#FFD54F] font-medium">
                {schemes.filter(s => s.status === 'applied').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'आवेदित' : 'Applied'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-[#4DD0E1]" />
              <span className="text-[#4DD0E1] font-medium">
                {schemes.filter(s => s.status === 'approved').length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'स्वीकृत' : 'Approved'}
            </h3>
          </div>

          <div className="glassmorphism-dark p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-8 h-8 text-[#E53935]" />
              <span className="text-[#E53935] font-medium">
                {schemes.filter(s => s.isNew).length}
              </span>
            </div>
            <h3 className="text-[#F5F5F5] font-semibold">
              {isHindi ? 'नई योजनाएं' : 'New Schemes'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B0BEC5]" />
              <input
                type="text"
                placeholder={isHindi ? 'योजना खोजें...' : 'Search schemes...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] placeholder-[#B0BEC5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी श्रेणी' : 'All Categories'}</option>
              <option value="subsidy">{isHindi ? 'सब्सिडी' : 'Subsidy'}</option>
              <option value="loan">{isHindi ? 'ऋण' : 'Loan'}</option>
              <option value="insurance">{isHindi ? 'बीमा' : 'Insurance'}</option>
              <option value="training">{isHindi ? 'प्रशिक्षण' : 'Training'}</option>
              <option value="equipment">{isHindi ? 'उपकरण' : 'Equipment'}</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-[#F5F5F5] focus:border-[#66BB6A]/50 focus:outline-none transition-all duration-300"
            >
              <option value="all">{isHindi ? 'सभी स्थिति' : 'All Status'}</option>
              <option value="eligible">{isHindi ? 'पात्र' : 'Eligible'}</option>
              <option value="not-eligible">{isHindi ? 'अपात्र' : 'Not Eligible'}</option>
              <option value="applied">{isHindi ? 'आवेदित' : 'Applied'}</option>
              <option value="approved">{isHindi ? 'स्वीकृत' : 'Approved'}</option>
              <option value="rejected">{isHindi ? 'अस्वीकृत' : 'Rejected'}</option>
            </select>
          </div>
        </motion.div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Schemes List */}
          <div className="space-y-6">
            {filteredSchemes.map((scheme, index) => {
              const CategoryIcon = categoryIcons[scheme.category]
              const statusColor = statusColors[scheme.status]
              
              return (
                <motion.div
                  key={scheme.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`glassmorphism-dark p-6 rounded-2xl border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedScheme?.id === scheme.id
                      ? 'border-[#66BB6A]/30 shadow-[#66BB6A]/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${statusColor} flex items-center justify-center`}>
                      <CategoryIcon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-[#F5F5F5] font-semibold text-lg">
                          {isHindi ? scheme.nameHindi : scheme.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {scheme.isNew && (
                            <span className="bg-[#E53935] text-white text-xs px-2 py-1 rounded-full font-medium">
                              {isHindi ? 'नया' : 'NEW'}
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${statusColor}`}>
                            {getStatusText(scheme.status)}
                          </span>
                        </div>
                      </div>

                      <p className="text-[#B0BEC5] text-sm mb-3">
                        {isHindi ? scheme.descriptionHindi : scheme.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-[#B0BEC5]">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ₹{scheme.amount.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(scheme.deadline).toLocaleDateString()}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#B0BEC5]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Scheme Details */}
          <div className="lg:sticky lg:top-6">
            {selectedScheme ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glassmorphism-dark p-8 rounded-2xl border border-white/10"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
                    {isHindi ? selectedScheme.nameHindi : selectedScheme.name}
                  </h2>
                  <p className="text-[#B0BEC5]">
                    {isHindi ? selectedScheme.descriptionHindi : selectedScheme.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-[#F5F5F5] font-semibold mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#66BB6A]" />
                    {isHindi ? 'लाभ' : 'Benefits'}
                  </h3>
                  <p className="text-[#B0BEC5] bg-white/5 p-4 rounded-lg">
                    {isHindi ? selectedScheme.benefitsHindi : selectedScheme.benefits}
                  </p>
                </div>

                {/* Eligibility */}
                <div className="mb-6">
                  <h3 className="text-[#F5F5F5] font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#66BB6A]" />
                    {isHindi ? 'पात्रता' : 'Eligibility'}
                  </h3>
                  <ul className="space-y-2">
                    {(isHindi ? selectedScheme.eligibilityHindi : selectedScheme.eligibility).map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-[#B0BEC5]">
                        <div className="w-2 h-2 bg-[#66BB6A] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Application Steps */}
                <div className="mb-6">
                  <h3 className="text-[#F5F5F5] font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#66BB6A]" />
                    {isHindi ? 'आवेदन प्रक्रिया' : 'Application Process'}
                  </h3>
                  <ol className="space-y-2">
                    {(isHindi ? selectedScheme.applicationStepsHindi : selectedScheme.applicationSteps).map((step, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#B0BEC5]">
                        <span className="w-6 h-6 bg-[#66BB6A]/20 text-[#66BB6A] rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Required Documents */}
                <div className="mb-6">
                  <h3 className="text-[#F5F5F5] font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#66BB6A]" />
                    {isHindi ? 'आवश्यक दस्तावेज' : 'Required Documents'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(isHindi ? selectedScheme.documentsHindi : selectedScheme.documents).map((doc, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg text-[#B0BEC5] text-sm">
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-[#66BB6A] to-[#FFD54F] text-[#0D0D0D] py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    {isHindi ? 'आवेदन करें' : 'Apply Now'}
                  </motion.button>
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
                    <ExternalLink className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="glassmorphism-dark p-8 rounded-2xl border border-white/10 text-center">
                <Info className="w-12 h-12 text-[#B0BEC5] mx-auto mb-4" />
                <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">
                  {isHindi ? 'योजना चुनें' : 'Select a Scheme'}
                </h3>
                <p className="text-[#B0BEC5]">
                  {isHindi 
                    ? 'विस्तृत जानकारी देखने के लिए कोई योजना चुनें'
                    : 'Choose a scheme to view detailed information'
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