import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../App';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isLoading, setIsLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);

    useEffect(() => {
        if (isAuthenticated) {
            toast.info('You are already logged in.');
            // Navigate to dashboard or home
            navigate('/profile');
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            setIsLoading(true);

            const response = await api.post("/api/v1/users/login",
                { email, password }
            );

            setIsLoading(false);

            if (response.data.success) {
                setIsAuthenticated(true);
                toast.success('Login successful!');
                // Navigate to dashboard or home
                navigate('/profile');
            } else {
                toast.error(response.data.message || 'Login failed. Try again.');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response?.data?.message || 'An error occurred!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-soft-lavender">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-[rgb(194,29,25)] mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-blue-950"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-blue-950"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-light-purple rounded-lg focus:ring-light-purple focus:border-light-purple"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-[rgb(194,29,25)] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary-blue hover:underline">
                        Register
                    </Link>
                </div>
            </div>

            {/* Toast Notifications */}
            <ToastContainer />
        </div>
    );
};

export default Login;
