import React from 'react'
import { Sparkles, ArrowDown } from 'lucide-react'

const Hero = () => {
  return (
    <section id="home" className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Animated Sparkles */}
          <div className="flex justify-center mb-6">
            <Sparkles className="h-12 w-12 text-pink-400 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-romantic font-bold text-gray-900 mb-6 leading-tight">
            Plan Your Perfect
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent pb-2">
              Date Night
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto text-balance">
            Discover romantic ideas, plan unforgettable evenings, and create memories that last forever
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
            <button role='anchor' onClick={() => window.location.href = '#ideas'} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 relative z-10">
              Explore Ideas
            </button>
            <button role='anchor' onClick={() => window.location.href = '#planner'} className="bg-white text-gray-700 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-pink-500 hover:text-pink-500 transition-all relative z-10">
              Start Planning
            </button>
          </div>
          
          <div className="mt-16 flex justify-center animate-bounce">
            <ArrowDown className="h-6 w-6 text-pink-400" />
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 pointer-events-none"></div>
    </section>
  )
}

export default Hero

