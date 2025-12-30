import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 mt-16 w-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🏥 Trusted Healthcare Since 2020
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                Your Health,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
                  Our Priority
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. 
                We're committed to providing compassionate care for you and your family.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/appointment" 
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span className='text-white'>Book Appointment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                to="/about" 
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-gray-600 font-medium">Happy Patients</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">50+</div>
                <div className="text-gray-600 font-medium">Expert Doctors</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-gray-600 font-medium">Emergency Care</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 relative flex justify-center">
            <div className="relative z-10">
              <img 
                src="/hero.png" 
                alt="Healthcare Professional" 
                className="w-96 h-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Repositioned Floating Cards */}
            <div className="absolute top-16 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden lg:block transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">98% Success</div>
                  <div className="text-gray-600">Patient Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-16 -right-8 bg-white p-6 rounded-2xl shadow-xl z-20 hidden lg:block transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-lg">Quick Booking</div>
                  <div className="text-gray-600">Same Day Available</div>
                </div>
              </div>
            </div>

            {/* Enhanced Background Decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-20 -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-purple-200 to-pink-300 rounded-full opacity-20 -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;