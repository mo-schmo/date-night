import React, { useState } from 'react'
import Hero from './components/Hero'
import DateIdeas from './components/DateIdeas'
import DatePlanner from './components/DatePlanner'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [openPlannerForm, setOpenPlannerForm] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar onGetStarted={() => setOpenPlannerForm(true)} />
      <Hero />
      <DateIdeas />
      <DatePlanner 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        openForm={openPlannerForm}
        onFormOpenChange={setOpenPlannerForm}
      />
      <Footer />
    </div>
  )
}

export default App

