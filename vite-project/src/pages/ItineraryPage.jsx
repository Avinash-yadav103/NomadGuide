import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ItineraryPage = () => {
  const [itinerary, setItinerary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [activeDay, setActiveDay] = useState(1)
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    // Fetch itinerary data from localStorage
    try {
      const storedItinerary = localStorage.getItem('currentItinerary')
      if (storedItinerary) {
        setItinerary(JSON.parse(storedItinerary))
      }
    } catch (error) {
      console.error('Error loading itinerary:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleEditItinerary = () => {
    navigate('/')
  }

  const handlePrintItinerary = () => {
    window.print()
  }

  const handleShareItinerary = () => {
    // In a real app, this would open a share dialog
    alert('Sharing functionality would be implemented here')
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} flex items-center justify-center`}>
        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">No Itinerary Found</h1>
          <p className="mb-8">It looks like you haven't created an itinerary yet.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Create Your Adventure
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const { 
    name, 
    destinations, 
    dates, 
    travelers, 
    budget, 
    priorities, 
    generatedItinerary 
  } = itinerary

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Print controls - hidden when printing */}
        <div className="print:hidden mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{name}</h1>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={handleEditItinerary}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
            <button 
              onClick={handlePrintItinerary}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Print
            </button>
            <button 
              onClick={handleShareItinerary}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="bg-indigo-600 dark:bg-indigo-700 rounded-xl overflow-hidden shadow-xl mb-8 print:mb-4 print:shadow-none">
          <div className="p-6">
            <h2 className="text-white text-2xl font-bold mb-4">Trip Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white text-sm font-medium mb-2">Destinations</h3>
                <div className="text-white font-bold">
                  {destinations.map((dest, i) => (
                    <span key={i}>
                      {dest}{i < destinations.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white text-sm font-medium mb-2">Dates</h3>
                <div className="text-white font-bold">
                  {dates.start === 'Flexible' ? 'Flexible Dates' : `${new Date(dates.start).toLocaleDateString()} - ${new Date(dates.end).toLocaleDateString()}`}
                  <div className="font-normal text-white/80 text-sm mt-1">
                    {dates.duration} {dates.duration === 1 ? 'day' : 'days'}
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white text-sm font-medium mb-2">Travelers</h3>
                <div className="text-white font-bold">{travelers}</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white text-sm font-medium mb-2">Budget</h3>
                <div className="text-white font-bold">
                  {budget.currency} {budget.amount.toLocaleString()}
                  <span className="ml-2 text-sm font-normal text-white/80 capitalize">({budget.category})</span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-white text-sm font-medium mb-2">Priorities</h3>
                <div className="flex flex-wrap gap-2">
                  {priorities.length > 0 ? priorities.map((priority, i) => (
                    <span key={i} className="bg-white/20 text-white px-2 py-1 rounded text-xs capitalize">
                      {priority}
                    </span>
                  )) : (
                    <span className="text-white/80 text-sm">No specific priorities</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Daily Itinerary</h2>
          
          {/* Day Selector */}
          <div className="print:hidden mb-6 overflow-x-auto pb-2">
            <div className="flex space-x-2 min-w-max">
              {generatedItinerary.dailyPlans.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors 
                    ${activeDay === day.day 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                >
                  Day {day.day}
                </button>
              ))}
            </div>
          </div>
          
          {/* Selected Day Plan (for screen) */}
          <div className="print:hidden">
            {generatedItinerary.dailyPlans
              .filter(day => day.day === activeDay)
              .map(dayPlan => (
                <div key={dayPlan.day} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-indigo-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white">Day {dayPlan.day}</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {dayPlan.activities.map((activity, index) => (
                        <div key={index} className="flex justify-between pb-3 border-b dark:border-gray-700">
                          <div>
                            <div className="text-indigo-600 dark:text-indigo-400 font-medium">{activity.time}</div>
                            <div className="font-medium mt-1">{activity.activity}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{activity.cost}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Accommodation</h4>
                        <div className="flex justify-between">
                          <div>{dayPlan.accommodation.name}</div>
                          <div className="font-bold">{dayPlan.accommodation.cost}</div>
                        </div>
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Transportation</h4>
                        <div className="flex justify-between">
                          <div>{dayPlan.transportation.type}</div>
                          <div className="font-bold">{dayPlan.transportation.cost}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">Daily Total</div>
                      <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{dayPlan.totalDailyCost}</div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          
          {/* All Day Plans (for printing) */}
          <div className="hidden print:block space-y-6">
            {generatedItinerary.dailyPlans.map(dayPlan => (
              <div key={dayPlan.day} className="border rounded-xl overflow-hidden page-break-inside-avoid">
                <div className="bg-indigo-600 print:bg-indigo-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white print:text-black">Day {dayPlan.day}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {dayPlan.activities.map((activity, index) => (
                      <div key={index} className="flex justify-between pb-3 border-b">
                        <div>
                          <div className="text-indigo-600 print:text-indigo-800 font-medium">{activity.time}</div>
                          <div className="font-medium mt-1">{activity.activity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{activity.cost}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Accommodation</h4>
                      <div className="flex justify-between">
                        <div>{dayPlan.accommodation.name}</div>
                        <div className="font-bold">{dayPlan.accommodation.cost}</div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Transportation</h4>
                      <div className="flex justify-between">
                        <div>{dayPlan.transportation.type}</div>
                        <div className="font-bold">{dayPlan.transportation.cost}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-right">
                    <div className="text-sm text-gray-600">Daily Total</div>
                    <div className="text-xl font-bold text-indigo-600 print:text-indigo-800">{dayPlan.totalDailyCost}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Budget Breakdown</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg print:shadow-none print:border overflow-hidden">
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    {Object.entries(generatedItinerary.budgetBreakdown).map(([category, amount]) => (
                      <div key={category} className="flex justify-between items-center">
                        <div className="capitalize">{category}</div>
                        <div className="font-bold">{budget.currency} {amount.toLocaleString()}</div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center font-bold">
                      <div>Total Budget</div>
                      <div className="text-indigo-600 dark:text-indigo-400">{budget.currency} {budget.amount.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    <div className="relative pt-1">
                      <div className="text-center mb-2 text-sm text-gray-600 dark:text-gray-400">Budget Allocation</div>
                      {Object.entries(generatedItinerary.budgetBreakdown).map(([category, amount]) => {
                        const percentage = (amount / budget.amount) * 100
                        return (
                          <div key={category} className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <div className="text-xs capitalize">{category}</div>
                              <div className="text-xs">{percentage.toFixed(0)}%</div>
                            </div>
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                              <div
                                style={{ width: `${percentage}%` }}
                                className={`
                                  ${category === 'accommodation' ? 'bg-blue-500' : ''}
                                  ${category === 'food' ? 'bg-green-500' : ''}
                                  ${category === 'activities' ? 'bg-yellow-500' : ''}
                                  ${category === 'transportation' ? 'bg-purple-500' : ''}
                                  ${category === 'shopping' ? 'bg-pink-500' : ''}
                                `}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Travel Recommendations</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg print:shadow-none print:border overflow-hidden">
            <div className="p-6">
              <ul className="space-y-2">
                {generatedItinerary.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Summary & Trip Notes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Trip Summary</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg print:shadow-none print:border overflow-hidden">
            <div className="p-6">
              <p className="text-lg">{generatedItinerary.summary}</p>
              
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-2">Trip Notes</h3>
                <textarea 
                  className="w-full p-4 border rounded-lg resize-y min-h-[100px] bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 print:hidden"
                  placeholder="Add your personal notes about this trip here..."
                ></textarea>
                {/* Placeholder for printing */}
                <div className="hidden print:block border border-gray-300 rounded-lg p-4 min-h-[100px] bg-gray-50">
                  Your personal trip notes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ItineraryPage 