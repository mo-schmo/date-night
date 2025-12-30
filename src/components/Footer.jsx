import React from 'react'
import { Heart, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 fill-white" />
              <span className="text-xl font-romantic font-bold">Date Night</span>
            </div>
            <p className="text-pink-100">
              Making every moment special, one date at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-pink-100">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#ideas" className="hover:text-white transition-colors">Date Ideas</a></li>
              <li><a href="#planner" className="hover:text-white transition-colors">Planner</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pink-400 pt-8 text-center text-pink-100">
          <p>&copy; {new Date().getFullYear()} Date Night. Made with <Heart className="inline h-4 w-4 fill-current" /> for couples everywhere.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

