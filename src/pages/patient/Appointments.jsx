import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../../main';

const AppointmentView = () => {
  const { user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    fetchAppointments();
  }, [limit]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/appointment/getmyappointments', {
        params:{
          status,limit
        },
        withCredentials: true
      });
      // console.log(response.data);
      setAppointments(response.data.upcommingAppointments || []);
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">My Appointments</h2>
            <p className="text-gray-600 mt-1">View all your scheduled appointments</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appointment.a_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {appointment.address}
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

export default AppointmentView;