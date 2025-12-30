import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Plus, X } from 'lucide-react'

const STORAGE_KEY = 'dateNightPlans'

// Helper function to convert 24-hour format to 12-hour format
const formatTime12Hour = (time24) => {
  if (!time24) return ''
  
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  
  return `${hour12}:${minutes} ${ampm}`
}

const DatePlanner = ({ selectedDate, setSelectedDate }) => {
  // Load plans from localStorage on mount
  const [plans, setPlans] = useState(() => {
    try {
      const savedPlans = localStorage.getItem(STORAGE_KEY)
      return savedPlans ? JSON.parse(savedPlans) : []
    } catch (error) {
      console.error('Error loading plans from localStorage:', error)
      return []
    }
  })
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  })

  // Save plans to localStorage whenever plans change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
    } catch (error) {
      console.error('Error saving plans to localStorage:', error)
    }
  }, [plans])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.date) {
      setPlans([...plans, { ...formData, id: Date.now() }])
      setFormData({ title: '', date: '', time: '', location: '', notes: '' })
      setShowForm(false)
    }
  }

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id))
  }

  // Sort plans by date (desc) and time (desc)
  const sortedPlans = [...plans].sort((a, b) => {
    // First compare by date (descending)
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date)
    }
    // If dates are equal, compare by time (descending)
    if (a.time && b.time) {
      return b.time.localeCompare(a.time)
    }
    // If one has time and the other doesn't, prioritize the one with time
    if (a.time && !b.time) return -1
    if (!a.time && b.time) return 1
    return 0
  })

  return (
    <section id="planner" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-4">
            Plan Your Date
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Organize your perfect evening with our easy-to-use planner
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 mb-8"
            >
              <Plus className="h-5 w-5" />
              Add New Date Plan
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-xl mb-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-romantic font-semibold text-gray-900">New Date Plan</h3>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Romantic Dinner Date"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="e.g., Central Park, New York"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    rows="3"
                    placeholder="Any special notes or reminders..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Save Plan
                </button>
              </div>
            </form>
          )}

          {plans.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No plans yet. Create your first date plan!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-romantic font-semibold text-gray-900 mb-2">
                        {plan.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-gray-600">
                        {plan.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(plan.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                        )}
                        {plan.time && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{formatTime12Hour(plan.time)}</span>
                          </div>
                        )}
                        {plan.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{plan.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  {plan.notes && (
                    <p className="text-gray-600 mt-4 pl-4 border-l-4 border-pink-200">
                      {plan.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default DatePlanner

