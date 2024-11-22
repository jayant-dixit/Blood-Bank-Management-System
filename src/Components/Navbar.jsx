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

    <header className="bg-[rgb(194,29,25)] sticky top-0 left-0 w-full py-4 z-10">
        <div className="container mx-auto flex justify-between items-center px-6">
          <a href="/"><h1 className="text-2xl font-bold text-white">RaktMitra</h1></a>
          <nav className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <><button onClick={handleLogin} className="text-white hover:bg-white hover:text-red-600 font-medium w-[6.75rem] text-center m-[5px] p-[7px] rounded-[4px]">
              Login
            </button>
            <button onClick={()=>(navigate("/register"))} className="text-white hover:bg-white hover:text-red-600 font-medium w-[6.75rem] text-center m-[5px] p-[7px] rounded-[4px]">
              Register
            </button>
            </>) : (<><button onClick={handleLogout} className="text-white hover:bg-white hover:text-red-600 font-medium w-[6.75rem] text-center m-[5px] p-[7px] rounded-[4px]">
              Logout
            </button>
            <button onClick={()=>(navigate("/profile"))} className="h-[47px] w-[74px] m-0 text-white hover:text-red-600 font-medium text-center p-[7px] rounded-[4px]">
              <img className='w-[45px] h-[43px]' src="../../public/assets/user.svg" alt="user" />
            </button>
            </>)}
            
            <a
              href="#need-blood"
              className="bg-yellow-400 text-black hover:bg-white hover:text-red-700 font-semibold py-3 px-6 rounded shadow"
            >
              Need Blood
            </a>
          </nav>
        </div>
      </header>
  );
};  
export default Navbar;
