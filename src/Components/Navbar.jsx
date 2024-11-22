import React, { useContext, useState } from "react";
import { Context } from "../App";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context) // Add this line

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.get('/api/v1/users/logout');
      if (response.data.success) {
        setIsAuthenticated(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }

  }

  const handleLogin = () => {
    navigate('/login');
  }

  return (

    <div>

      <nav className="bg-[#3D3BF3] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">
                <span className="text-[#EBEAFF]">Rakt</span>
                <span className="text-[#3D3BF3]">Mitra</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-[#EBEAFF] font-medium">
                Home
              </a>
              <a href="#donors" className="hover:text-[#EBEAFF] font-medium">
                Donors
              </a>
              <a href="#bloodbanks" className="hover:text-[#EBEAFF] font-medium">
                Blood Banks
              </a>
              <a href="#about" className="hover:text-[#EBEAFF] font-medium">
                About Us
              </a>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <button onClick={handleLogout} className="bg-[#4a4a4a] text-white px-4 py-2 rounded-lg hover:bg-[#06060e] ">
                  Logout
                </button>
              ) : (
                <button onClick={handleLogin} className="bg-[#4a4a4a] text-white px-4 py-2 rounded-lg hover:bg-[#06060e] ">
                  Login
                </button>
              )}
              <button className="bg-[#FF2929] text-white px-4 py-2 rounded-lg font-bold cursor-pointer hover:bg-[#cc3939]">
                Need Blood?
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#EBEAFF] focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FF2929]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#home"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#3D3BF3]"
              >
                Home
              </a>
              <a
                href="#donors"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#3D3BF3]"
              >
                Donors
              </a>
              <a
                href="#bloodbanks"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#3D3BF3]"
              >
                Blood Banks
              </a>
              <a
                href="#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-[#3D3BF3]"
              >
                About Us
              </a>
              <button
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-[#3D3BF3] hover:bg-[#9694FF]"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </nav>
      <ToastContainer />
    </div>
  );
};
export default Navbar;
