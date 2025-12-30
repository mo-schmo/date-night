import React, { useState } from 'react'
import { Coffee, Film, UtensilsCrossed, Music, Camera, Heart, Sparkles } from 'lucide-react'
import DateIdeaGenerator from './DateIdeaGenerator'

const DateIdeas = () => {
  const [showGenerator, setShowGenerator] = useState(false)
  const [generatedIdeas, setGeneratedIdeas] = useState([])
  
  const ideas = [
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Coffee & Conversation",
      description: "Start your day with a cozy café visit and meaningful talks",
      color: "from-amber-400 to-orange-500"
    },
    {
      icon: <Film className="h-8 w-8" />,
      title: "Movie Night",
      description: "Cuddle up for a romantic film at home or the cinema",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <UtensilsCrossed className="h-8 w-8" />,
      title: "Romantic Dinner",
      description: "Cook together or explore a new restaurant",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: <Music className="h-8 w-8" />,
      title: "Live Music",
      description: "Enjoy a concert or intimate acoustic session",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Photo Adventure",
      description: "Explore your city and capture beautiful moments",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Stargazing",
      description: "Find a quiet spot and watch the stars together",
      color: "from-indigo-400 to-purple-500"
    }
  ]

  const handleIdeaGenerated = (newIdea) => {
    // Add the generated idea to the list
    setGeneratedIdeas([newIdea, ...generatedIdeas])
    setShowGenerator(false)
  }

  // Combine static and generated ideas
  const allIdeas = [
    ...generatedIdeas.map((idea, index) => ({
      icon: <Sparkles className="h-8 w-8" />,
      title: idea.title,
      description: idea.description,
      color: "from-pink-400 to-purple-500",
      isGenerated: true,
      id: `generated-${index}`
    })),
    ...ideas.map((idea, index) => ({
      ...idea,
      id: `static-${index}`
    }))
  ]

  return (
    <section id="ideas" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-romantic font-bold text-gray-900 mb-4">
            Date Night Ideas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Discover romantic activities perfect for any occasion
          </p>
          <button
            onClick={() => setShowGenerator(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            Generate Custom Idea
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allIdeas.map((idea, index) => (
            <div
              key={idea.id || index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {idea.isGenerated && (
                <div className="absolute top-4 right-4 bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full">
                  AI Generated
                </div>
              )}
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${idea.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {idea.icon}
              </div>
              <h3 className="text-2xl font-romantic font-semibold text-gray-900 mb-3">
                {idea.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {idea.description}
              </p>
              <div className={`absolute inset-0 bg-gradient-to-r ${idea.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`}></div>
            </div>
          ))}
        </div>
      </div>
      
      {showGenerator && (
        <DateIdeaGenerator
          onIdeaGenerated={handleIdeaGenerated}
          onClose={() => setShowGenerator(false)}
        />
      )}
    </section>
  )
}

export default DateIdeas

