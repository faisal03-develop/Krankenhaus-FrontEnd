import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../main';

const AppointmentForm = () => {
  const { isAuthenticated, user } = useContext(Context);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nic: '',
    dob: '',
    gender: '',
    appointmentDate: '',
    department: '',
    doctorFirstName: '',
    doctorLastName: '',
    address: '',
    hasVisited: false
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        nic: user.nic || '',
        dob: user.dob ? user.dob.split('T')[0] : '',
        gender: user.gender || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment booked:', formData);
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-2 sm:px-4 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium mb-4">
            Book Appointment
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Schedule Your <span className="text-blue-600">Visit</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Book an appointment with our expert doctors. Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    placeholder="Enter your NIC number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    readOnly={isAuthenticated}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 text-sm md:text-base ${
                      isAuthenticated 
                        ? 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed' 
                        : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    }`}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {['Male', 'Female', 'Other'].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          checked={formData.gender === gender}
                          onChange={handleChange}
                          disabled={isAuthenticated}
                          className={`w-4 h-4 text-blue-600 border-gray-300 ${
                            isAuthenticated 
                              ? 'cursor-not-allowed opacity-60' 
                              : 'focus:ring-blue-500'
                          }`}
                          required
                        />
                        <span className={`ml-2 text-sm md:text-base ${
                          isAuthenticated ? 'text-gray-500' : 'text-gray-700'
                        }`}>{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="ENT">ENT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor First Name *
                  </label>
                  <input
                    type="text"
                    name="doctorFirstName"
                    value={formData.doctorFirstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Doctor's first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doctor Last Name *
                  </label>
                  <input
                    type="text"
                    name="doctorLastName"
                    value={formData.doctorLastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Doctor's last name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Additional Information</h3>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasVisited"
                    checked={formData.hasVisited}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm md:text-base text-gray-700">
                    I have visited this hospital before
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 md:pt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <span className='text-white'>Book Appointment </span>
                <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;