
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Appointment from './pages/Appointment'
import Register from './pages/Register'
import About from './pages/About'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
 import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      </Router>
    </>
  )
}

export default App