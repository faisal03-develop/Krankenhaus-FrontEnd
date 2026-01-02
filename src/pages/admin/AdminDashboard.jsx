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
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users, appointments, and other data
      // This is a placeholder - adjust API endpoints as needed
      const usersRes = await axios.get('http://localhost:8000/api/v1/user/getallusers', { withCredentials: true });
      const appointmentsRes = await axios.get('http://localhost:8000/api/v1/appointment/getallappointments', { withCredentials: true });
      
      if (usersRes.data.users) {
        setUsers(usersRes.data.users);
        const doctors = usersRes.data.users.filter(user => user.role === 'doctor');
        const patients = usersRes.data.users.filter(user => user.role === 'patient');
        setPatients(patients);
        setDoctors(doctors);
        setStats({
          totalUsers: usersRes.data.users.length,
          totalDoctors: doctors.length,
          totalPatients: patients.length,
          totalAppointments: appointmentsRes.data.appointments?.length || 0
        });
      }
      
      if (appointmentsRes.data.appointments) {
        setAppointments(appointmentsRes.data.appointments);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };


  const handleUpdateStatus = async (appointmentId) => {
    try{
      // Implement status update logic here // Replace with actual appointment ID
      await axios.put(`http://localhost:8000/api/v1/appointment/updateappointment/${appointmentId}`,
        {status: 'accepted'},
        { withCredentials: true }
      )
      toast.success('Status updated successfully');
    }
    catch(error){
      toast.error(`Error updating status ${error.response.data.message}`);
    }
  }

 const handleLogout = async () => {
  try {
    await axios.get(
      'http://localhost:8000/api/v1/user/admin/logout',
      { withCredentials: true }
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
          doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {doctor.status || 'Active'}
        </span>
      </td>
    </tr>
  );


  
  const PatientRow = ({ patient }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{patient.firstName} {patient.lastName}</td>
      <td className="px-4 py-3">{patient.email}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          patient.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
          patient.role === 'Patient' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {patient.role}
        </span>
      </td>
      <td className="px-4 py-3">{patient.phone}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          patient.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {patient.status || 'Active'}
        </span>
      </td>
    </tr>
  );

  const AppointmentRow = ({ appointment }) => (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">{appointment.firstName} {appointment.lastName}</td>
      <td className="px-4 py-3">{appointment.email}</td>
      <td className="px-4 py-3">{appointment.department}</td>
      <td className="px-4 py-3">{new Date(appointment.a_date).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          appointment.status === 'Accepted' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {appointment.status}
        </span>
      </td>
      <td>
        <button onClick={() => handleUpdateStatus(appointment._id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-2">Update Status</button>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => navigateTo('/admin/addnew')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium"
                >
                  Add New Doctor
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                  View Reports
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md text-sm font-medium">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
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
          </div>
        )}


        
        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="bg-white rounded-lg shadow-md">
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
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-lg shadow-md">
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <AppointmentRow key={appointment._id} appointment={appointment} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;