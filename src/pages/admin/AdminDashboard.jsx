import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';

const AdminDashboard = () => {

  const navigateTo = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(Context);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0
  });
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [limit, setLimit] = useState(10);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    fetchDashboardData();
  }, [limit]);

  const fetchDashboardData = async () => {
    try {
      // Fetch users, appointments, and other data
      // This is a placeholder - adjust API endpoints as needed
      const usersRes = await axios.get('http://localhost:8000/api/v1/user/getallusers', { params: { limit:limit }, withCredentials: true });
      const appointmentsRes = await axios.get('http://localhost:8000/api/v1/appointment/getallappointments', { 
        params: {limit},withCredentials: true });
      
      if (usersRes.data.users) {
        setUsers(usersRes.data.users);
        const doctors = usersRes.data.users.filter(user => user.role === 'doctor');
        const patients = usersRes.data.users.filter(user => user.role === 'patient');
        setHasMore(usersRes.data.hasMore);
        setPatients(patients);
        setDoctors(doctors);
        setStats({
          totalUsers: usersRes.data.totalUsers,
          totalDoctors: doctors.length,
          totalPatients: patients.length,
          totalAppointments: appointmentsRes.data.totalAppointments || 0
        });
      }
      
      if (appointmentsRes.data.appointments) {
        setAppointments(appointmentsRes.data.appointments);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };


  const handleUpdateStatus = async (appointmentId, status) => {
    try{
      // Implement status update logic here // Replace with actual appointment ID
      await axios.put(`http://localhost:8000/api/v1/appointment/updateappointment/${appointmentId}`,
        {status},
        { withCredentials: true }
      )
      setAppointments(prevAppointments => {
        return prevAppointments.map(appointment => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status };
          }
          return appointment;
        });
      })
      toast.success('Status updated successfully');
    }
    catch(error){
      toast.error(`Error updating status ${error.response.data.message}`);
    }
  }

 const handleLogout = async () => {
  try {
    await axios.get(
      'http://localhost:8000/api/v1/user/logout',
      { params: { role: 'admin' }, withCredentials: true }
    );

    toast.success('Logged out successfully');
    // update client auth state so protected routes and login redirect behave correctly
    setIsAuthenticated(false);
    setUser({});
    navigateTo('/login', { replace: true });

  } catch (error) {
    toast.error('Logout failed');
    console.error(error);
  }
};


  const StatCard = ({ title, value, icon, color }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`text-3xl ${color.replace('border-l-', 'text-')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const DoctorRow = ({ doctor }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{doctor.firstName} {doctor.lastName}</td>
      <td className="px-4 py-3">{doctor.email}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          doctor.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
          doctor.role === 'Patient' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {doctor.role}
        </span>
      </td>
      <td className="px-4 py-3">{doctor.phone}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
           'bg-green-100 text-green-800'
        }`}>
          {doctor.status || 'Active' }
        </span>
      </td>
    </tr>
  );


  
  const PatientRow = ({ patient }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{patient.firstName} {patient.lastName}</td>
      <td className="px-4 py-3">{patient.email}</td>
      <td className="px-4 py-3">{patient.phone}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
        'bg-green-100 text-green-800'
        }`}>
          {patient.status || 'Active'}
        </span>
      </td>
    </tr>
  );

  const AppointmentRow = ({ appointment }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{appointment.patientId.firstName} {appointment.patientId.lastName}</td>
      <td className="px-4 py-3">{appointment.patientId.email}</td>
      <td className="px-4 py-3">{appointment.department}</td>
      <td className="px-4 py-3">{new Date(appointment.a_date).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          appointment.status === 'pending' ? 'bg-gray-100 text-gray-800' :
          appointment.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
          appointment.status === 'completed' ? 'bg-green-100 text-green-600':
          'bg-red-100 text-red-800'
        }`}>
          {appointment.status}
        </span>
      </td>
      <td>
         <select
            name="status"
            value={appointment.status}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border-none py-1 text-sm"
          >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => handleUpdateStatus(appointment._id,selectedStatus)} className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2">Update Status</button>
        {appointment.status === 'completed' && (
            <button onClick={()=>{
            {navigateTo(`/report/${appointment._id}`)}
            }}  className="text-green-600 hover:text-green-700">
              View Report
            </button>
            )}
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'doctors', name: 'Doctors' },
              { id: 'patients', name: 'Patients' },
              { id: 'appointments', name: 'Appointments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon="👥"
                color="border-l-blue-500"
              />
              <StatCard
                title="Total Doctors"
                value={stats.totalDoctors}
                icon="👨‍⚕️"
                color="border-l-green-500"
              />
              <StatCard
                title="Total Patients"
                value={stats.totalPatients}
                icon="🏥"
                color="border-l-yellow-500"
              />
              <StatCard
                title="Total Appointments"
                value={stats.totalAppointments}
                icon="📅"
                color="border-l-purple-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => navigateTo('/admin/addnew')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium"
                >
                  Add New Doctor
                </button>
                <button onClick={() => navigateTo('/admin/addnewadmin')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                  Add New Admin
                </button>
                <button 
                  onClick={() => navigateTo('/admin/reports')} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md text-sm font-medium"
                >
                  View All Reports
                </button>
                <button 
                  onClick={() => navigateTo('/admin/messages')} 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-md text-sm font-medium"
                >
                  View Messages
                </button>
                {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                  System Settings
                </button> */}
              </div>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-lg shadow-md pb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Doctors</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {doctors.map((doctor) => (
                    <DoctorRow key={doctor._id} doctor={doctor} />
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className='flex justify-center mt-6'>
            <button onClick={()=>{setLimit(limit+10)}} className='bg-blue-300 text-blue-800' disabled={!hasMore}>
              {hasMore ? "Load More" : "No More Doctors"}
            </button>
            </div>
          </div>
        )}


        
        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-md pb-5">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Patient Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <PatientRow key={patient._id} patient={patient} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-center mt-6'>
            <button onClick={()=>{setLimit(limit+10)}} className='bg-blue-300 text-blue-800' disabled={!hasMore}>
              {hasMore ? "Load More" : "No More Patients"}
            </button>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md pb-3">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Appointment Management</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <AppointmentRow key={appointment._id} appointment={appointment} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className='flex justify-center mt-6'>
            <button onClick={()=>{setLimit(limit+10)}} className='bg-blue-300 text-blue-800' disabled={!hasMore}>
              {hasMore ? "Load More" : "No More Appointments"}
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;