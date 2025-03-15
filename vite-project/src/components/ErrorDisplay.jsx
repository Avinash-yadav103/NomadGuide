import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorDisplay = ({ message, darkMode }) => {
  const navigate = useNavigate()

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-16 w-16 text-red-500 mb-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
        />
      </svg>
      
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      
      <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {message || 'We encountered an error while generating your itinerary.'}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try Again
        </button>
        
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Refresh Page
        </button>
      </div>
    </div>
  )
}

export default ErrorDisplay 