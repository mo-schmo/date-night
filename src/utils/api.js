/**
 * API client utilities for calling the backend
 */

// Determine API base URL based on environment
// In production/Vercel, /api routes are handled automatically
// In local dev with Vite proxy, /api is proxied to Vercel dev server
// If VITE_API_URL is explicitly set, use that
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // In development, Vite proxy handles /api -> localhost:3000
  // In production, Vercel handles /api routes automatically
  return '/api'
}

const API_BASE_URL = getApiBaseUrl()
const REQUEST_TIMEOUT = 30000 // 30 seconds

/**
 * Generate a date idea using the LLM backend
 * @param {Object} params - Parameters for generating the idea
 * @param {string} params.mood - Mood/atmosphere (e.g., "romantic", "adventurous", "casual")
 * @param {string} params.budget - Budget level (e.g., "low", "medium", "high")
 * @param {string} [params.location] - Location preference (optional)
 * @param {string} [params.timeOfDay] - Time of day (optional, e.g., "morning", "afternoon", "evening")
 * @param {string} [params.occasion] - Special occasion (optional, e.g., "anniversary", "first date")
 * @returns {Promise<Object>} Generated date idea with title and description
 */
export async function generateDateIdea(params) {
  // Validate required parameters
  if (!params.mood || !params.budget) {
    throw new Error('Mood and budget are required parameters')
  }

  // Create abort controller for timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(`${API_BASE_URL}/generate-idea`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
        
        // Provide user-friendly error messages
        if (response.status === 400) {
          errorMessage = errorData.error || 'Invalid request. Please check your inputs.'
        } else if (response.status === 401) {
          errorMessage = 'API key is invalid or missing. Please configure your API key.'
        } else if (response.status === 429) {
          errorMessage = 'Too many requests. Please try again in a moment.'
        } else if (response.status === 500) {
          errorMessage = errorData.error || 'Server error. Please try again later.'
        }
      } catch (parseError) {
        // If we can't parse the error, use the status text
        errorMessage = response.statusText || errorMessage
      }
      
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    // Validate response structure
    if (!data.title || !data.description) {
      throw new Error('Invalid response from server. Please try again.')
    }
    
    return data
  } catch (error) {
    clearTimeout(timeoutId)
    
    // Handle specific error types
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. The AI is taking too long to respond. Please try again.')
    }
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Could not connect to the server. Please check your internet connection.')
    }
    
    // Re-throw if it's already a formatted error
    if (error.message) {
      throw error
    }
    
    throw new Error('An unexpected error occurred. Please try again.')
  }
}

/**
 * Check if the API is available
 * @returns {Promise<boolean>} True if API is available
 */
export async function checkAPIHealth() {
  try {
    // We can add a health check endpoint later if needed
    // For now, just return true
    return true
  } catch (error) {
    return false
  }
}

