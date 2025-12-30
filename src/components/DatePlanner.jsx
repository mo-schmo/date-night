import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Plus, X, Edit } from 'lucide-react'
import MarkdownEditor from './MarkdownEditor'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

const DatePlanner = ({ selectedDate, setSelectedDate, openForm, onFormOpenChange }) => {
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
  const [editingId, setEditingId] = useState(null)

  // Handle external form open trigger
  useEffect(() => {
    if (openForm) {
      setShowForm(true)
      // Reset the trigger after opening
      if (onFormOpenChange) {
        onFormOpenChange(false)
      }
    }
  }, [openForm, onFormOpenChange])
  
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

  const handleEdit = (plan) => {
    setFormData({
      title: plan.title || '',
      date: plan.date || '',
      time: plan.time || '',
      location: plan.location || '',
      notes: plan.notes || ''
    })
    setEditingId(plan.id)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      const formElement = document.querySelector('form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const handleCancel = () => {
    setFormData({ title: '', date: '', time: '', location: '', notes: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.title && formData.date) {
      if (editingId) {
        // Update existing plan
        setPlans(plans.map(plan => 
          plan.id === editingId 
            ? { ...formData, id: editingId }
            : plan
        ))
      } else {
        // Create new plan
        setPlans([...plans, { ...formData, id: Date.now() }])
      }
      setFormData({ title: '', date: '', time: '', location: '', notes: '' })
      setEditingId(null)
      setShowForm(false)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this date plan?')) {
      setPlans(plans.filter(plan => plan.id !== id))
    }
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
                <h3 className="text-2xl font-romantic font-semibold text-gray-900">
                  {editingId ? 'Edit Date Plan' : 'New Date Plan'}
                </h3>
                <button
                  type="button"
                  onClick={handleCancel}
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
                  <MarkdownEditor
                    value={formData.notes}
                    onChange={(value) => setFormData({ ...formData, notes: value })}
                    placeholder="Any special notes or reminders... (Markdown supported)"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {editingId ? 'Update Plan' : 'Save Plan'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
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
                    <div className="flex-1">
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
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="text-gray-400 hover:text-pink-500 transition-colors"
                        title="Edit plan"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete plan"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  {plan.notes && (
                    <div className="mt-4 pl-4 border-l-4 border-pink-200 prose prose-sm max-w-none 
                      prose-headings:text-gray-900 prose-headings:font-romantic prose-headings:font-semibold prose-headings:mt-4 prose-headings:mb-2
                      prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
                      prose-p:text-gray-600 prose-p:my-2
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-a:text-pink-600 prose-a:no-underline hover:prose-a:underline
                      prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6 prose-ul:text-gray-600
                      prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-gray-600
                      prose-li:my-1 prose-li:text-gray-600">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-3 mt-4 text-gray-900 font-romantic" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-2 mt-3 text-gray-900 font-romantic" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-2 mt-3 text-gray-900 font-romantic" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-6 my-2 space-y-1 text-gray-600" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-6 my-2 space-y-1 text-gray-600" {...props} />,
                          li: ({node, ...props}) => <li className="my-1 text-gray-600" {...props} />,
                          a: ({node, ...props}) => <a className="text-pink-600 no-underline hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                        }}
                      >
                        {plan.notes}
                      </ReactMarkdown>
                    </div>
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