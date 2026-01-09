
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import PatientDashboard from './pages/patient/PatientDashboard.jsx'
import UpdatePatient from './pages/patient/UpdatePatient.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import ReportGeneration from './pages/doctor/ReportGeneration.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AddNewDoctor from './pages/admin/addNewDoctor.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../src/main.jsx'
import AppointmentSchedule from './pages/doctor/AppointmentSchedule.jsx';
import ReportView from './pages/patient/ReportView.jsx'

const AppContent = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) && user?.role !== 'admin' ;

  useEffect(() => {
    const fetchUser = () =>{
        axios
      .get("http://localhost:8000/api/v1/user/me", { withCredentials: true })
      .then((res) => {
        if (res?.data?.user) {
          setIsAuthenticated(true);
          setUser(res.data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      });
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
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
          <Route path='*' element={<h1>Page Not Found</h1>} />
          <Route path='/patient/report/:reportId' element={
            <ProtectedRoute requiredRole="patient">
              <ReportView />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {(user?.role !== 'admin' && user?.role !== 'doctor') && <Footer />}

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