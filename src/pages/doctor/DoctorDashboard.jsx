import React, { useContext, useEffect } from 'react';
import { Context } from '../../main';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const DoctorDashboard = () => {
  const { user } = useContext(Context);
  const navigateTo = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('pending');
  const fetchAppointments = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/v1/appointment/doctor/getAppointments',
        { params:{status:status},
         withCredentials: true }
      );
      setAppointments(response.data.appointments);
    }
    catch(error){
      console.log(error);
      toast.error("Error fetching appointments");
    }

  }
  useEffect(() => {
    fetchAppointments();
  },[status]);
  console.log(`Okay: `,appointments)
  // console.log(`Pending: `, pendingAppointments)
  // console.log(`Today's: `, todayTasks)
  
  const recentPatients = [
    { id: 1, name: 'Alice Brown', lastVisit: '2024-01-12', condition: 'Hypertension', status: 'Stable' },
    { id: 2, name: 'Robert Lee', lastVisit: '2024-01-11', condition: 'Diabetes', status: 'Monitoring' },
    { id: 3, name: 'Lisa Chen', lastVisit: '2024-01-10', condition: 'Migraine', status: 'Improved' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-row justify-between">
          <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, Dr. {user?.firstName || 'Doctor'}!</p>
          </div>
          <div>
            <img src={user?.docAvatar.url} className='h-20 w-20' alt="DocAvatar" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                {/* <p className="text-2xl font-bold text-gray-900">{todayTasks.length}</p> */}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">94%</p>
              </div>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointments */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Appointments</h2>
                <div>
                  <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                  <option>Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                </select>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Schedule
                </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment._id} onClick={()=>{navigateTo(`/doctor/report/${appointment._id}`)}} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{appointment.patientId.firstName + ` ` + appointment.patientId.lastName}</p>
                        {/* <p className="text-sm text-gray-600">{appointment.type}</p> */}
                        <p className="text-xs text-gray-500">{new Date(appointment.a_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        appointment.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Pending Tasks</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.patientId._id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{appointment.patientId.firstName + ' ' + appointment.patientId.lastName}</p>
                      <button className="text-blue-600 hover:text-blue-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Due: {(new Date(appointment.patientId.a_date).toLocaleDateString())}</p>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>

        {/* Recent Patients */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Patients
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-medium text-gray-900 ml-2">{patient.name}</h3>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      patient.status === 'Stable' ? 'bg-green-100 text-green-800' :
                      patient.status === 'Monitoring' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{patient.condition}</p>
                  <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <button className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Add Patient</h3>
            <p className="text-sm opacity-90">Register a new patient</p>
          </button>

          <button className="p-6 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Write Prescription</h3>
            <p className="text-sm opacity-90">Create new prescription</p>
          </button>

          <button className="p-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">View Reports</h3>
            <p className="text-sm opacity-90">Check lab results</p>
          </button>

          <button className="p-6 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Schedule</h3>
            <p className="text-sm opacity-90">Manage appointments</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;