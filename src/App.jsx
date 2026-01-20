
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/landing-pages/home/index.jsx'
import Appointment from './pages/patient/appointment/index.jsx'
import Register from './pages/auth/register/index.jsx'
import About from './pages/landing-pages/about/index.jsx'
import Contact from './pages/landing-pages/contact/index.jsx'
import Login from './pages/auth/login/index.jsx'
import Navbar from './components/common/navbar/index.jsx'
import AdminNavbar from './components/admin-components/admin-navbar/index.jsx'
import Footer from './components/common/footer/index.jsx'
import { ToastContainer } from 'react-toastify';
import PatientDashboard from './pages/patient/PatientDashboard.jsx'
import UpdatePatient from './pages/patient/UpdatePatient.jsx'
import ProtectedRoute from './components/common/protected-routes/index.jsx'
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import ReportGeneration from './pages/doctor/ReportGeneration.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AddNewDoctor from './pages/admin/addNewDoctor.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../src/main.jsx'
import AppointmentSchedule from './pages/doctor/AppointmentSchedule.jsx';
import ReportView from './pages/common/report-view/index';
import NotFound from './pages/common/page-not-found/index.jsx';
import PatientAppointments from './pages/patient/Appointments.jsx';
import AddNewAdmin from './pages/admin/addNewAdmin.jsx';
import Reports from './pages/common/reports/index.jsx';
import Messages from './pages/admin/messages.jsx';
// import apiClient from './helper/api/api-client.js'

const AppContent = () => {
  const {  setIsAuthenticated, isAuthenticated, user, setUser, setLoading } = useContext(Context);
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) && user?.role !== 'admin';
  const showAdminNavbar = isAdminRoute && user?.role === 'admin';
  const showFooter = !hideNavbarRoutes.includes(location.pathname) && !isAuthenticated;
  useEffect(() => {
    
    const fetchUser = () =>{
      axios
      .get(`http://localhost:8000/api/v1/user/me`, { withCredentials: true })
      // .get(`${import.meta.env.REACT_APP_BASE_URL}/user/me`, { withCredentials: true })
      .then((res) => {
        if (res?.data?.user) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        setLoading(false);
        // console.log()
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      });
    };
    fetchUser();
  }, []);

  return (
    <>
      {showAdminNavbar && <AdminNavbar />}
      {showNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/appointment' element={
            <ProtectedRoute requiredRole="patient">
              <Appointment />
            </ProtectedRoute>
          } />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/patient/dashboard' element={
            <ProtectedRoute requiredRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } />
          <Route path='/patient/update' element={
            <ProtectedRoute requiredRole="patient">
              <UpdatePatient />
            </ProtectedRoute>
          } />
          <Route path='/doctor/dashboard' element={
            <ProtectedRoute requiredRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } />
          <Route path='/doctor/report/:appointmentId' element={
            <ProtectedRoute requiredRole="doctor">
              <ReportGeneration />
            </ProtectedRoute>
          } />
          <Route path='/admin/dashboard' element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path='/admin/addnew' element={
            <ProtectedRoute requiredRole="admin">
              <AddNewDoctor />
            </ProtectedRoute>
          } />
          <Route path='/updatepatient/:id' element={
            <ProtectedRoute requiredRole="patient">
              <UpdatePatient />
            </ProtectedRoute>
          } />
          <Route path='/doctor/schedule' element={
            <ProtectedRoute requiredRole="doctor">
              <AppointmentSchedule />
            </ProtectedRoute>
          }
          />
          <Route path='*' element={<NotFound />} />
          <Route path='/report/:reportId' element={
            // <ProtectedRoute requiredRole="patient" >
              <ReportView />
            // </ProtectedRoute>
          } />
          <Route path='/doctor/reports' element={
            <ProtectedRoute requiredRole="doctor">
              <Reports />
            </ProtectedRoute>
          } />
          <Route path='/patient/appointments' element={
            <ProtectedRoute requiredRole="patient">
              <PatientAppointments />
            </ProtectedRoute>
          } />
          <Route path='/admin/addnewadmin' element={
            <ProtectedRoute requiredRole="admin">
              <AddNewAdmin />
            </ProtectedRoute>
          } />
          <Route path='/admin/reports' element={
            <ProtectedRoute requiredRole="admin">
              <Reports />
            </ProtectedRoute>
          } />
          <Route path='/patient/reports' element={
            <ProtectedRoute requiredRole="patient">
              <Reports />
            </ProtectedRoute>
          } />
          <Route path='/admin/messages' element={
            <ProtectedRoute requiredRole="admin">
              <Messages />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
            {showFooter && <Footer />}

      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App