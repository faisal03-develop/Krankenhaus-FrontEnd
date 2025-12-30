import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 mt-12 md:mt-16 w-screen min-h-screen flex items-center px-2 sm:px-4 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full py-8 md:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-3 md:space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium">
                🏥 Trusted Healthcare Since 2020
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight">
                Your Health,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                  Our Priority
                </span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. 
                We're committed to providing compassionate care for you and your family.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link 
                to="/appointment" 
                className="group bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <span className='text-white'>Book Appointment</span>
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-6 md:pt-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-gray-600 font-medium text-xs md:text-sm lg:text-base">Happy Patients</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-gray-600 font-medium text-xs md:text-sm lg:text-base">Expert Doctors</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-gray-600 font-medium text-xs md:text-sm lg:text-base">Emergency Care</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 relative flex justify-center mt-8 lg:mt-0">
            <div className="relative z-10">
              <img 
                src="/hero.png" 
                alt="Healthcare Professional" 
                className="w-64 sm:w-80 md:w-96 h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Repositioned Floating Cards */}
            <div className="absolute top-8 md:top-16 -left-4 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl z-20 hidden md:block transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm md:text-lg">98% Success</div>
                  <div className="text-gray-600 text-xs md:text-base">Patient Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 md:bottom-16 -right-4 md:-right-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl z-20 hidden md:block transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 md:w-7 md:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm md:text-lg">Quick Booking</div>
                  <div className="text-gray-600 text-xs md:text-base">Same Day Available</div>
                </div>
              </div>
            </div>

            {/* Enhanced Background Decoration */}
            <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 md:w-64 md:h-64 lg:w-72 lg:h-72 bg-gradient-to-tr from-purple-200 to-pink-300 rounded-full opacity-20 -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;