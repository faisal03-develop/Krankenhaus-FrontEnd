import React from 'react';

const Biography = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
          {/* Left Content - Image */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative">
              <img 
                src="/about.png" 
                alt="About Our Hospital" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-blue-600 text-white p-4 md:p-6 rounded-2xl shadow-xl hidden sm:block">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold">15+</div>
                  <div className="text-xs md:text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="flex-1 space-y-4 md:space-y-6 order-1 lg:order-2 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium">
                About Us
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Committed to Your 
                <span className="text-blue-600">Health & Wellness</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                We are dedicated to providing exceptional healthcare services with compassion, 
                innovation, and excellence. Our state-of-the-art facility and experienced medical 
                professionals ensure you receive the best possible care.
              </p>
            </div>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 md:gap-4 text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Expert Medical Team</h3>
                  <p className="text-sm md:text-base text-gray-600">Our board-certified physicians and specialists bring years of experience and expertise to your care.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Advanced Technology</h3>
                  <p className="text-sm md:text-base text-gray-600">We utilize cutting-edge medical technology and equipment to ensure accurate diagnosis and effective treatment.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:gap-4 text-left">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">Compassionate Care</h3>
                  <p className="text-sm md:text-base text-gray-600">We treat every patient with dignity, respect, and personalized attention to ensure comfort and healing.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 md:pt-6">
              <button className="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;