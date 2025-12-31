
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
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
import ProtectedRoute from './components/ProtectedRoute'
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from '../src/main.jsx'


const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

useEffect(() => {


    const fetchUser = () =>{
        axios
      .get("http://localhost:8000/api/v1/user/me", { withCredentials: true })
      .then((res) => {
        if (res?.data?.user) {
          // console.log(`res data user`, res.data.user);
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
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/appointment' element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            } />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/patient/dashboard' element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path='/doctor/dashboard' element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      </Router>
    </>
  )
}

export default App