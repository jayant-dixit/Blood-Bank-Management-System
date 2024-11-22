import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../App';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
    const { isLoading, setIsLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    bloodGroup: '',
    gender: '',
    latitude: '',
    longitude: '',
  });

  useEffect(() => {
    // Get the user's location (coordinates)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData((prevData) => ({
          ...prevData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
      });
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, contact, bloodGroup, gender, latitude, longitude } = formData;

    if(!latitude || !longitude) {
      toast.error('Please allow location access to register.');
      return;
    }

    // Validation
    if (!name || !email || !password || !contact || !bloodGroup || !gender) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post(
        `/api/v1/users/register`,
        {
          name,
          email,
          password,
          contact,
          bloodGroup,
          gender,
          location: { latitude, longitude },
        }
      );

      setIsLoading(false);

      if (response.data.success) {
        toast.success('Registration successful! Please log in.');
        // Redirect to dashboard or clear form
        navigate('/profile');
      } else {
        toast.error(response.data.message || 'Registration failed. Try again.');
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || 'An error occurred!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-lavender">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-[rgb(194,29,25)] mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-blue-950">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-blue-950">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-blue-950">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {/* Contact Field */}
          <div className="mb-4">
            <label htmlFor="contact" className="block text-sm font-medium blue-950">
              Contact Number
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
          </div>

          {/* Blood Group Field */}
          <div className="mb-4">
            <label htmlFor="bloodGroup" className="block text-sm font-medium text-blue-950">
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          {/* Gender Field */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-blue-950">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[rgb(194,29,25)] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-950 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Register;
