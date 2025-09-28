'use client'

import React from 'react';
import { Mic, MicOff, Volume2, VolumeX, Settings, Play, Pause } from 'lucide-react';

export default function VoiceSupportPage() {
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [voiceEnabled, setVoiceEnabled] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-violet-400 text-transparent bg-clip-text">
              Voice Support
            </span>
          </h1>
          <p className="text-gray-300 text-lg">
            Complete voice interaction support designed specifically for farmers with limited literacy.
          </p>
        </div>

        {/* Voice Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Voice Input */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Voice Input</h2>
            
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-4 ${isListening ? 'border-purple-400 animate-pulse' : 'border-gray-600'} flex items-center justify-center transition-all`}>
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`w-20 h-20 rounded-full ${isListening ? 'bg-purple-500' : 'bg-gray-700'} flex items-center justify-center transition-all hover:scale-110`}
                >
                  {isListening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
                </button>
              </div>
              
              <p className="text-lg mb-4">
                {isListening ? 'Listening... Speak now' : 'Tap to start voice input'}
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300">
                  {isListening ? 'Processing your voice...' : 'Your voice input will appear here'}
                </p>
              </div>
            </div>
          </div>

          {/* Voice Output */}
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h2 className="text-2xl font-semibold mb-6 text-purple-300">Voice Output</h2>
            
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-4 ${isSpeaking ? 'border-purple-400 animate-pulse' : 'border-gray-600'} flex items-center justify-center transition-all`}>
                <button
                  onClick={() => setIsSpeaking(!isSpeaking)}
                  className={`w-20 h-20 rounded-full ${isSpeaking ? 'bg-purple-500' : 'bg-gray-700'} flex items-center justify-center transition-all hover:scale-110`}
                >
                  {isSpeaking ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10" />}
                </button>
              </div>
              
              <p className="text-lg mb-4">
                {isSpeaking ? 'Speaking... Listen carefully' : 'Tap to hear AI response'}
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-300">
                  "Based on your soil test results, we recommend applying organic fertilizer in the next week."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Settings */}
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-purple-300 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Voice Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Voice Speed</label>
              <input 
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                defaultValue="1"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Slow</span>
                <span>Normal</span>
                <span>Fast</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Voice Volume</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="80"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Quiet</span>
                <span>Normal</span>
                <span>Loud</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="text-gray-300">Enable Voice Feedback</span>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-12 h-6 rounded-full ${voiceEnabled ? 'bg-purple-500' : 'bg-gray-600'} relative transition-all`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${voiceEnabled ? 'left-6' : 'left-0.5'}`}></div>
            </button>
          </div>
        </div>

        {/* Quick Voice Commands */}
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
          <h2 className="text-2xl font-semibold mb-6 text-purple-300">Quick Voice Commands</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Check weather forecast",
              "Analyze soil health",
              "Find market prices",
              "Detect pest problems",
              "Get farming advice",
              "Schedule irrigation"
            ].map((command, index) => (
              <button
                key={index}
                className="bg-gray-800 hover:bg-purple-600/20 p-4 rounded-lg text-left transition-all border border-gray-700 hover:border-purple-400"
              >
                <p className="text-gray-300">Say: "{command}"</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}