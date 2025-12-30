import React, { useState } from 'react'
import { Sparkles, X, Loader2, AlertCircle } from 'lucide-react'
import { generateDateIdea } from '../utils/api'

const DateIdeaGenerator = ({ onIdeaGenerated, onClose }) => {
  const [formData, setFormData] = useState({
    mood: 'romantic',
    budget: 'medium',
    location: '',
    timeOfDay: '',
    occasion: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedIdea, setGeneratedIdea] = useState(null)

  const moods = [
    { value: 'romantic', label: 'Romantic' },
    { value: 'adventurous', label: 'Adventurous' },
    { value: 'casual', label: 'Casual' },
    { value: 'fun', label: 'Fun & Playful' },
    { value: 'intimate', label: 'Intimate' },
    { value: 'exciting', label: 'Exciting' }
  ]

  const budgets = [
    { value: 'low', label: 'Low ($)' },
    { value: 'medium', label: 'Medium ($$)' },
    { value: 'high', label: 'High ($$$)' }
  ]

  const timeOptions = [
    { value: '', label: 'Any Time' },
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' }
  ]

  const occasions = [
    { value: '', label: 'No Special Occasion' },
    { value: 'first date', label: 'First Date' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'valentines', label: "Valentine's Day" },
    { value: 'proposal', label: 'Proposal' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setGeneratedIdea(null)

    try {
      const idea = await generateDateIdea(formData)
      setGeneratedIdea(idea)
      
      // Call the callback if provided
      if (onIdeaGenerated) {
        onIdeaGenerated(idea)
      }
    } catch (err) {
      // Provide user-friendly error messages
      let errorMessage = err.message || 'Failed to generate date idea. Please try again.'
      
      // Check for specific error types
      if (errorMessage.includes('API key')) {
        errorMessage = 'API key not configured. Please set up your API key in the environment variables.'
      } else if (errorMessage.includes('timeout')) {
        errorMessage = 'The request took too long. Please try again with different parameters.'
      } else if (errorMessage.includes('Network error')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.'
      }
      
      setError(errorMessage)
      console.error('Error generating date idea:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleUseIdea = () => {
    if (onIdeaGenerated && generatedIdea) {
      onIdeaGenerated(generatedIdea)
    }
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl font-romantic font-bold text-gray-900">
              Generate Date Idea
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!generatedIdea ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  {budgets.map((budget) => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (optional)
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., New York, Beach, Park"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Day (optional)
                </label>
                <select
                  value={formData.timeOfDay}
                  onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {timeOptions.map((time) => (
                    <option key={time.value} value={time.value}>
                      {time.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occasion (optional)
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {occasions.map((occasion) => (
                    <option key={occasion.value} value={occasion.value}>
                      {occasion.label}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-700 mt-1">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Idea
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border-2 border-pink-200">
                <h3 className="text-2xl font-romantic font-bold text-gray-900 mb-3">
                  {generatedIdea.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {generatedIdea.description}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUseIdea}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Use This Idea
                </button>
                <button
                  onClick={() => {
                    setGeneratedIdea(null)
                    setError(null)
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Generate Another
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DateIdeaGenerator

