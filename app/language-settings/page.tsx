'use client'

import React from 'react';
import { Globe, Check, Settings, Volume2 } from 'lucide-react';

export default function LanguageSettingsPage() {
  const [selectedLanguage, setSelectedLanguage] = React.useState('english');

  const languages = [
    { code: 'english', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা', flag: '🇧🇩' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
    { code: 'odia', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'assamese', name: 'Assamese', native: 'অসমীয়া', flag: '🇮🇳' }
  ];

  const features = [
    'Voice commands and responses',
    'Text-to-speech functionality',
    'Crop advisory content',
    'Weather forecasts',
    'Market price updates',
    'Pest identification results',
    'Soil health reports',
    'Government scheme information'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Multilingual Support
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Available in multiple local languages to ensure accessibility for farmers across different regions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Language Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-teal-300 flex items-center">
                <Globe className="w-6 h-6 mr-2" />
                Select Your Language
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setSelectedLanguage(language.code)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedLanguage === language.code
                        ? 'border-teal-400 bg-teal-400/10'
                        : 'border-gray-600 bg-gray-800 hover:border-teal-400/50 hover:bg-teal-400/5'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <div className="font-semibold text-white">{language.name}</div>
                          <div className="text-sm text-gray-400">{language.native}</div>
                        </div>
                      </div>
                      {selectedLanguage === language.code && (
                        <Check className="w-5 h-5 text-teal-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Features */}
            <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-teal-300">
                Features Available in Your Language
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg"
                  >
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-8">
            {/* Current Selection */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-teal-300">Current Selection</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">
                  {languages.find(lang => lang.code === selectedLanguage)?.flag}
                </div>
                <div className="font-semibold text-white">
                  {languages.find(lang => lang.code === selectedLanguage)?.name}
                </div>
                <div className="text-gray-400 text-lg">
                  {languages.find(lang => lang.code === selectedLanguage)?.native}
                </div>
              </div>
            </div>

            {/* Language Settings */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-teal-300 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Language Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Auto-detect language</span>
                  <button className="w-12 h-6 rounded-full bg-teal-500 relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Voice in native language</span>
                  <button className="w-12 h-6 rounded-full bg-teal-500 relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Translate responses</span>
                  <button className="w-12 h-6 rounded-full bg-gray-600 relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Test Voice */}
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h3 className="text-xl font-semibold mb-4 text-teal-300">Test Voice</h3>
              
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Volume2 className="w-5 h-5" />
                <span>Test Voice in {languages.find(lang => lang.code === selectedLanguage)?.name}</span>
              </button>
              
              <p className="text-xs text-gray-400 mt-2 text-center">
                Sample: "Welcome to Crop Advisory System"
              </p>
            </div>

            {/* Apply Button */}
            <button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white py-4 px-6 rounded-lg font-semibold transition-all transform hover:scale-105">
              Apply Language Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}