import { InferenceClient } from '@huggingface/inference'

// Load environment variables from .env.local in development
// Vercel dev should load .env.local automatically, but we add explicit loading as fallback
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  try {
    const { config } = require('dotenv')
    const path = require('path')
    config({ path: path.resolve(process.cwd(), '.env.local') })
  } catch (e) {
    // dotenv not available or .env.local doesn't exist - that's okay
    // Vercel dev should handle it
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { mood, budget, location, timeOfDay, occasion } = req.body

    // Validate required fields
    if (!mood || !budget) {
      return res.status(400).json({ error: 'Mood and budget are required' })
    }

    // Get API key from environment variables
    const hfApiKey = process.env.HUGGINGFACE_API_KEY
    
    // Debug logging (remove in production)
    if (process.env.NODE_ENV !== 'production') {
      console.log('HUGGINGFACE_API_KEY exists:', !!hfApiKey)
      console.log('HUGGINGFACE_API_KEY length:', hfApiKey?.length || 0)
    }
    
    if (!hfApiKey) {
      return res.status(500).json({ 
        error: 'Hugging Face API key not configured',
        hint: 'Make sure HUGGINGFACE_API_KEY is set in .env.local and vercel dev is running'
      })
    }
    
    const response = await callHuggingFace(hfApiKey, { mood, budget, location, timeOfDay, occasion })

    return res.status(200).json({ 
      idea: response.idea,
      title: response.title,
      description: response.description
    })
  } catch (error) {
    console.error('Error generating date idea:', error)
    return res.status(500).json({ 
      error: 'Failed to generate date idea',
      message: error.message 
    })
  }
}

async function callHuggingFace(apiKey, params) {
  const model = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct'
  
  const prompt = buildPrompt(params)
  
  // Initialize Hugging Face Inference client
  const client = new InferenceClient(apiKey)
  
  try {
    // Use the textGeneration method from the library
    const response = await client.chatCompletion({
      model: model,
      messages: [
        { role: 'user', content: prompt }
      ]
    })
    return parseLLMResponse(response.choices[0].message.content)
  } catch (error) {
    // Provide more detailed error information
    if (error.message) {
      throw new Error(`Hugging Face API error: ${error.message}`)
    }
    throw new Error(`Hugging Face API error: ${JSON.stringify(error)}`)
  }
}

function buildPrompt(params) {
  const { mood, budget, location, timeOfDay, occasion } = params
  
  let prompt = `Generate a creative and romantic date night idea. `
  
  prompt += `Mood: ${mood}. `
  prompt += `Budget: ${budget}. `
  
  if (location) {
    prompt += `Location preference: ${location}. `
  }
  
  if (timeOfDay) {
    prompt += `Time of day: ${timeOfDay}. `
  }
  
  if (occasion) {
    prompt += `Occasion: ${occasion}. `
  }
  
  prompt += `\n\nRespond in this exact format:\nTitle: [Creative title]\nDescription: [2-3 sentence description of the date idea]\n\nMake it specific, romantic, and actionable.`
  
  return prompt
}

function parseLLMResponse(text) {
  // Clean up the response
  let cleaned = text.trim()
  
  // Remove any leading/trailing whitespace and newlines
  cleaned = cleaned.replace(/^\s+|\s+$/g, '')
  
  // Extract title
  const titleMatch = cleaned.match(/Title:\s*(.+?)(?:\n|Description:|$)/i)
  const title = titleMatch ? titleMatch[1].trim() : 'Romantic Date Night'
  
  // Extract description
  const descMatch = cleaned.match(/Description:\s*(.+?)(?:\n\n|$)/is)
  const description = descMatch ? descMatch[1].trim() : cleaned
  
  // If we couldn't parse, use the whole text as description
  if (!titleMatch && !descMatch) {
    const lines = cleaned.split('\n').filter(line => line.trim())
    return {
      title: lines[0] || 'Romantic Date Night',
      description: lines.slice(1).join(' ') || cleaned || 'A special evening together',
      idea: cleaned
    }
  }
  
  return {
    title,
    description,
    idea: cleaned
  }
}

