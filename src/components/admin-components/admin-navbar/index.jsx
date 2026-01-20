import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiClient from '../../../helper/api/api-client';

const AdminNavbar = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleLogout = async () => {
    try{

      const response = await apiClient.post('/user/logout')
      if(!response.data.success) return toast.error(response.data.message)
      setIsAuthenticated(false)
      setUser({});
      navigate('/login',{replace:true})
      }
    catch(error){
      toast.error(error?.response?.data?.message);
    }
  }


  // const handleLogout = async () => {
  //   try {
  //     await axios.post('http://localhost:8000/api/v1/user/logout', {
  //       withCredentials: true
  //     });
  //     toast.success('Logged out successfully');
  //     setIsAuthenticated(false);
  //     setUser({});
  //     navigate('/login', { replace: true });
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //     toast.error('Logout failed');
  //   }
  // };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">MediCare Admin</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/admin/dashboard" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/reports" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Reports
            </Link>
            <Link 
              to="/admin/messages" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Messages
            </Link>
            <Link 
              to="/admin/addnew" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Add Doctor
            </Link>
            <Link 
              to="/admin/addnewadmin" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Add Admin
            </Link>
          </div>

          {/* User Info and Logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{user?.firstName} {user?.lastName}</span>
              <span className="text-gray-400 ml-2">(Admin)</span>
            </div>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/admin/dashboard" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/reports" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reports
              </Link>
              <Link 
                to="/admin/messages" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link 
                to="/admin/addnew" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Doctor
              </Link>
              <Link 
                to="/admin/addnewadmin" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Admin
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2 text-sm text-gray-600">
                  {user?.firstName} {user?.lastName} (Admin)
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md font-medium mx-3 mt-2 text-center w-full"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
