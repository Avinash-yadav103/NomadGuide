import { useState } from 'react'
import PlannerModal from './PlannerModal'

function Hero() {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false)

  const openPlanner = () => {
    setIsPlannerOpen(true)
  }

  const closePlanner = () => {
    setIsPlannerOpen(false)
  }

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Blurred shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute right-1/3 top-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute left-1/2 bottom-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
          {/* Text content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Discover the World, <span className="text-yellow-300 relative inline-block z-10">
                Create Memories
                <svg className="absolute -bottom-2 w-full " viewBox="0 0 380 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M380 20C230 20 220 0.000 0 0V20H380Z" fill="rgba(217, 119, 6, 0.3)"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-xl mx-auto lg:mx-0">
              Your journey begins with a personalized travel itinerary crafted just for you. Experience travel like never before.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={openPlanner}
                className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Plan Your Adventure
              </button>
              <a href="#learn-more" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transform transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-white/30">
                Explore Destinations
              </a>
            </div>
          </div>
          
          {/* Hero image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-300 rounded-lg transform rotate-12 opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 right-20 w-20 h-20 bg-indigo-300 rounded-full transform opacity-60 animate-pulse animation-delay-2000"></div>
            
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-2xl relative z-10">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="World travel destinations collage" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-lg">Santorini, Greece</p>
                      <p className="text-white/80 text-sm">Your next dream destination</p>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card overlays */}
              <div className="absolute -right-12 -bottom-10 w-40 h-32 bg-white/20 backdrop-blur-md rounded-lg shadow-xl transform rotate-6 border border-white/30 hidden md:block">
                <div className="p-4 flex flex-col h-full justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-white text-xs font-semibold">Adventure Awaits</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="h-2 bg-white/40 rounded-full w-3/4"></div>
                    <div className="h-2 bg-white/40 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -left-10 -top-8 w-36 h-24 bg-white/20 backdrop-blur-md rounded-lg shadow-xl transform -rotate-12 border border-white/30 hidden md:block">
                <div className="p-3 flex flex-col h-full justify-between">
                  <span className="text-white text-xs font-semibold">Exotic Locations</span>
                  <div className="flex flex-wrap gap-1">
                    <div className="px-2 py-1 bg-white/30 rounded-full text-white text-xs">Asia</div>
                    <div className="px-2 py-1 bg-white/30 rounded-full text-white text-xs">Europe</div>
                    <div className="px-2 py-1 bg-white/30 rounded-full text-white text-xs">Africa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trusted by */}
        <div className="mt-24 pt-6 border-t border-white/20">
          <p className="text-sm font-medium text-white/70 text-center mb-8">TRUSTED BY WORLD'S BEST TRAVELERS</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            <div className="h-8 text-white/90 font-bold text-lg flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              National Geographic
            </div>
            <div className="h-8 text-white/90 font-bold text-lg flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              Condé Nast
            </div>
            <div className="h-8 text-white/90 font-bold text-lg flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              Travel + Leisure
            </div>
            <div className="h-8 text-white/90 font-bold text-lg flex items-center">
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
              </svg>
              Lonely Planet
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#f9fafb" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,176C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div> */}

      {/* Planner Modal */}
      <PlannerModal isOpen={isPlannerOpen} onClose={closePlanner} />
    </section>
  )
}

export default Hero 