import { useState } from 'react'

function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-opacity-80 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-indigo-600 dark:text-indigo-400" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">NomadGuide</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a href="#features" className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out">Features</a>
            <a href="#destinations" className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out">Destinations</a>
            <a href="#testimonials" className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out">Testimonials</a>
            <a href="#pricing" className="text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition duration-150 ease-in-out">Pricing</a>
          </nav>

          {/* Right buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Login/signup buttons */}
            <div className="hidden md:flex space-x-2">
              <a href="#login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 dark:text-indigo-400 bg-transparent hover:bg-indigo-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Log in
              </a>
              <a href="#signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                Sign up
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        {menuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Features</a>
              <a href="#destinations" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Destinations</a>
              <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Testimonials</a>
              <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">Pricing</a>
              <div className="mt-4 flex space-x-2">
                <a href="#login" className="w-1/2 text-center block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 bg-transparent border border-indigo-600 dark:border-indigo-400">Log in</a>
                <a href="#signup" className="w-1/2 text-center block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign up</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 