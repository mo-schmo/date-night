import React, { useState } from 'react'
import { Heart, Menu, X } from 'lucide-react'

const Navbar = ({ onGetStarted }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleGetStarted = () => {
    // Scroll to planner section
    const plannerSection = document.getElementById('planner')
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // Trigger form to open
    if (onGetStarted) {
      onGetStarted()
    }
    // Close mobile menu if open
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
            <span className="text-xl font-romantic font-bold text-gray-800">Date Night</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-pink-500 transition-colors">Home</a>
            <a href="#ideas" className="text-gray-700 hover:text-pink-500 transition-colors">Date Ideas</a>
            <a href="#planner" className="text-gray-700 hover:text-pink-500 transition-colors">Planner</a>
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#home" className="block py-2 text-gray-700 hover:text-pink-500">Home</a>
            <a href="#ideas" className="block py-2 text-gray-700 hover:text-pink-500">Date Ideas</a>
            <a href="#planner" className="block py-2 text-gray-700 hover:text-pink-500">Planner</a>
            <button 
              onClick={handleGetStarted}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full mt-4"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

