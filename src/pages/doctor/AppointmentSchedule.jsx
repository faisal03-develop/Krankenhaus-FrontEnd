import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAppointments();
  }, [limit,status]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/appointment/doctor/getAppointments',
        { params:{status, limit},
         withCredentials: true }    
      );
      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading appointments...</div>
      </div>
    );
  }

  // console.log(': ',limit)
  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-row justify-between">
            <div>

            <h2 className="text-2xl font-bold text-gray-900">Appointment Schedule</h2>
            <p className="text-gray-600 mt-1">Manage all patient appointments</p>
            </div>
            <div>

            <select name="status" id="status" value={status} onChange={(e)=>setStatus(e.target.value)}>
                <option value="" disabled selected>Status</option>
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="completed">Completed</option>
            </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patientId.firstName + ` ` + appointment.patientId.lastName} {appointment.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.patientId.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.patientId.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Dr. {appointment.doctorId.firstName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(appointment.a_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                            appointment.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                            appointment.status === 'completed' ? 'bg-green-100 text-green-600':
                            'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {appointment.status === 'completed' && (
                          <button onClick={()=>{
                            navigate(`/report/${appointment._id}`)
                          }} className="text-green-600 hover:text-green-900 mr-3">
                            View Report
                          </button>
                        )}
                        {appointment.status === 'accepted' && (
                          <button onClick={()=>{
                            navigate(`/doctor/report/${appointment._id}`)
                          }} className="text-blue-600 hover:text-blue-900 mr-3">
                            Generate Report
                          </button>
                        )}
                        {appointment.status === 'pending' && (
                          <button className="text-gray-600 hover:text-gray-900 mr-3">
                            Wait for Approval
                          </button>
                        )}
                        {/* <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Generate Report
                        </button> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
            <div className='flex justify-center mt-6'>
            <button onClick={()=>{setLimit(limit+10)}} className='bg-blue-300 text-blue-800'>
              Load More
            </button>
            </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;