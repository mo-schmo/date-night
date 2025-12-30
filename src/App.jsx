import React, { useState } from 'react'
import Hero from './components/Hero'
import DateIdeas from './components/DateIdeas'
import DatePlanner from './components/DatePlanner'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />
      <Hero />
      <DateIdeas />
      <DatePlanner selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Footer />
    </div>
  )
}

export default App

