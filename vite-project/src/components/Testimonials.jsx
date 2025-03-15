function Testimonials() {
  const testimonials = [
    {
      quote: "NomadGuide transformed how I travel. Their AI-powered recommendations are spot on, and I discovered places I never would have found on my own!",
      author: "Emma Watson",
      role: "Travel Blogger",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    },
    {
      quote: "Planning our family vacation was always a headache until we found NomadGuide. Now everyone contributes to the itinerary, and we all get to do what we love.",
      author: "David Chen",
      role: "Family Traveler",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "As a digital nomad, I need to balance work and exploration. NomadGuide helps me find the best cafes, coworking spaces, and local experiences wherever I go.",
      author: "Sarah Johnson",
      role: "Digital Nomad",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">Testimonials</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Loved by travelers worldwide
          </p>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
            Don't just take our word for it — hear from some of our amazing customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-500">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <svg 
                    className="absolute top-0 left-0 transform -translate-x-4 -translate-y-6 h-8 w-8 text-indigo-300 opacity-50" 
                    fill="currentColor" 
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="relative text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center justify-center"
          >
            Read more testimonials
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 