import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const PlannerModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [tripName, setTripName] = useState('')
  const [destinations, setDestinations] = useState([{ id: 1, value: '' }])
  const [dateType, setDateType] = useState('exact')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [duration, setDuration] = useState(0)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [isSolo, setIsSolo] = useState(false)
  
  // Budget state
  const [budget, setBudget] = useState(1000)
  const [currency, setCurrency] = useState('USD')
  const [budgetCategory, setBudgetCategory] = useState('moderate')
  const [priorities, setPriorities] = useState({
    accommodation: false,
    food: false,
    activities: false,
    shopping: false,
    transportation: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  
  const modalRef = useRef(null)

  // Calculate trip duration when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const differenceInTime = end.getTime() - start.getTime()
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24))
      setDuration(differenceInDays)
    }
  }, [startDate, endDate])

  // Toggle solo traveler
  useEffect(() => {
    if (isSolo) {
      setAdults(1)
      setChildren(0)
    }
  }, [isSolo])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Handle destination changes
  const handleDestinationChange = (id, value) => {
    const updatedDestinations = destinations.map(dest => 
      dest.id === id ? { ...dest, value } : dest
    )
    setDestinations(updatedDestinations)
  }

  // Add new destination
  const addDestination = () => {
    const newId = destinations.length > 0 
      ? Math.max(...destinations.map(d => d.id)) + 1 
      : 1
    setDestinations([...destinations, { id: newId, value: '' }])
  }

  // Remove destination
  const removeDestination = (id) => {
    if (destinations.length > 1) {
      setDestinations(destinations.filter(dest => dest.id !== id))
    }
  }

  // Toggle priority selection
  const togglePriority = (category) => {
    setPriorities({
      ...priorities,
      [category]: !priorities[category]
    })
  }

  // Reset form when closed
  const handleClose = () => {
    setStep(1)
    onClose()
  }

  // Handle "Next" button click
  const handleNext = () => {
    setStep(step + 1)
  }

  // Handle "Back" button click
  const handleBack = () => {
    setStep(step - 1)
  }

  // Process all form data with Gemini AI
  const generateItinerary = async (tripData) => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Make API call to backend that uses Gemini AI
      const response = await fetch('http://localhost:5001/api/generateItinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tripData),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate itinerary')
      }
      
      // Get the generated itinerary data from the response
      const itineraryData = await response.json()
      
      // Store the itinerary in localStorage
      localStorage.setItem('currentItinerary', JSON.stringify(itineraryData))
      
      // Navigate to the itinerary page
      navigate('/itinerary')
      
      // Close modal
      handleClose()
    } catch (err) {
      console.error('Error generating itinerary:', err)
      setError('Failed to generate itinerary. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    const tripData = {
      tripName, 
      destinations,
      dateType,
      startDate,
      endDate,
      duration,
      adults,
      children,
      isSolo,
      budget,
      currency,
      budgetCategory,
      priorities
    }
    
    console.log('Trip data to be sent to Gemini:', tripData)
    
    // Generate itinerary with Gemini AI
    generateItinerary(tripData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all"
      >
        {/* Modal header */}
        <div className="bg-indigo-600 py-6 px-8 relative">
          <h2 className="text-2xl font-bold text-white">Plan Your Adventure</h2>
          <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= i ? 'bg-white text-indigo-600' : 'bg-indigo-400 text-white'} font-semibold text-sm`}>
                  {i}
                </div>
                {i < 5 && (
                  <div className={`h-1 w-9 ${step > i ? 'bg-white' : 'bg-indigo-400'}`}></div>
                )}
              </div>
            ))}
          </div>
          <button 
            onClick={handleClose}
            className="absolute top-5 right-5 text-white hover:text-indigo-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step 1: Trip Name */}
        {step === 1 && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Give your adventure a title</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">What would you like to call this trip?</p>
            
            <div className="mb-6">
              <input
                type="text"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                placeholder="My Summer Trip to Bali"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 italic mb-8">
              Tip: Be descriptive! "European Adventure 2024" is better than just "Trip"
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Destinations */}
        {step === 2 && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Where are you going?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Add one or more destinations for your trip</p>
            
            <div className="space-y-3 mb-6">
              {destinations.map((destination) => (
                <div key={destination.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={destination.value}
                      onChange={(e) => handleDestinationChange(destination.id, e.target.value)}
                      placeholder="Search for a city or country"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  {destinations.length > 1 && (
                    <button 
                      onClick={() => removeDestination(destination.id)}
                      className="p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addDestination}
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add another destination
            </button>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Travel Dates */}
        {step === 3 && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">When will you travel?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Select your travel dates or indicate that you're flexible</p>
            
            <div className="flex items-center gap-3 mb-6">
              <div 
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer border ${dateType === 'exact' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-300 dark:border-gray-600'}`}
                onClick={() => setDateType('exact')}
              >
                <div className={`flex items-center ${dateType === 'exact' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Exact Dates</span>
                </div>
              </div>
              <div 
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer border ${dateType === 'flexible' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-300 dark:border-gray-600'}`}
                onClick={() => setDateType('flexible')}
              >
                <div className={`flex items-center ${dateType === 'flexible' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Flexible Dates</span>
                </div>
              </div>
            </div>

            {dateType === 'exact' ? (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                {duration > 0 && (
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    Trip duration: {duration} {duration === 1 ? 'day' : 'days'}
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Approximate Trip Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  {[...Array(31).keys()].map(i => (
                    <option key={i} value={i}>
                      {i} {i === 1 ? 'day' : 'days'}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  We'll suggest the best time to visit your chosen destinations
                </p>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Travel Party */}
        {step === 4 && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Who's traveling?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Tell us about your travel party</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <input
                  id="solo-toggle"
                  type="checkbox"
                  checked={isSolo}
                  onChange={() => setIsSolo(!isSolo)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="solo-toggle" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  I'm traveling solo
                </label>
              </div>

              {!isSolo && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adults</label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        disabled={adults <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        value={adults}
                        onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1"
                        className="w-16 p-2 text-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Children</label>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        disabled={children <= 0}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        value={children}
                        onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        min="0"
                        className="w-16 p-2 text-center border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Budget and Priorities */}
        {step === 5 && (
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Budget & Priorities</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Tell us about your budget and what matters most</p>
            
            <div className="space-y-6 mb-6">
              {/* Budget Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Budget {budget ? `(${currency} ${budget.toLocaleString()})` : ''}
                </label>
                <div className="flex items-center gap-3">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="AUD">AUD</option>
                    <option value="CAD">CAD</option>
                  </select>
                  <input
                    type="range"
                    min="500"
                    max="10000"
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>Budget</span>
                  <span>Premium</span>
                </div>
              </div>

              {/* Budget Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {['budget', 'moderate', 'luxury'].map(category => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setBudgetCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm border ${
                        budgetCategory === category
                          ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Travel Priorities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What are your priorities for this trip?
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'accommodation', label: 'Quality Accommodation' },
                    { id: 'food', label: 'Food & Dining' },
                    { id: 'activities', label: 'Activities & Experiences' },
                    { id: 'shopping', label: 'Shopping' },
                    { id: 'transportation', label: 'Convenient Transportation' }
                  ].map(item => (
                    <div key={item.id} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={item.id}
                          type="checkbox"
                          checked={priorities[item.id]}
                          onChange={() => togglePriority(item.id)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor={item.id} className="font-medium text-gray-700 dark:text-gray-300">
                          {item.label}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 text-sm text-red-600 dark:text-red-400 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                disabled={isSubmitting}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>Generate Itinerary</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PlannerModal 