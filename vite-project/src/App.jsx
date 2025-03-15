import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import ItineraryPage from './pages/ItineraryPage'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
            <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main>
              <Hero />
              <Features />
              <Testimonials />
            </main>
            <Footer />
          </div>
        } />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>
    </Router>
  )
}

export default App
