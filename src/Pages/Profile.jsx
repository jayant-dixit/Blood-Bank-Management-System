import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../App';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import ScheduleDonationCard from '../Components/ScheduledDonations';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { isLoading, setIsLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/api/v1/users/profile');
        setUserData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching user data:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    } else {
      toast.error('Please login to access this page.');
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [setIsAuthenticated]) 

  const handleChat = () => {
    toast.info('Chat is coming soon!');
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col lg:flex-row">
      <ToastContainer />

      {/* Side Panel */}
      <div className="side-panel shadow-lg lg:w-1/5 w-full lg:h-screen p-4 flex flex-col items-start space-y-4">
        <div className='flex items-center space-x-1'>
          <img className='w-16 h-16' src="../../public/assets/user.svg" alt="user" />
          <div className='flex flex-col'>
            <h2 className="text-xl font-bold text-[#4A4A4A]">{userData?.name}</h2>
            <h2 className="text-sm font-semibold text-[#8b8b8b]">{userData?.email}</h2>
          </div>

        </div>

        {/* Health Points */}
        <div className="bg-[#4a90e2] rounded-lg shadow p-4 flex justify-between items-center w-64">
          <h3 className="text-lg font-bold text-[#ffffff]">Health Points</h3>
          <div className='flex items-center space-x-2'>
            <span className="text-2xl font-bold text-[#ffffff]">
              {userData?.rewards?.healthPoints}
            </span>
            <img className='w-7 h-7' src="../../public/assets/heart.png" alt="" />
          </div>

        </div>
        <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Certificates
        </button>
        <button onClick={()=>{navigate("/scheduleDonation")}} className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Schedule Donation
        </button>
        <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Donation History
        </button>
        <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Blood Requests
        </button>
        <button className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Chat Support
        </button>
        <button onClick={()=>{navigate("/location/nearby")}} className="w-full text-left py-2 px-4 rounded-lg hover:bg-[#3d3bf3] hover:text-white text-[#3d3bf3] text-lg font-medium">
          Nearby Donors
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Carousel for Campaigns */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-bold text-red-600 mb-2">Campaigns</h3>
          {/* <div className="flex overflow-x-auto space-x-4">
            {campaigns.map((campaign, index) => (
              <div
                key={index}
                className="min-w-[200px] bg-red-100 rounded-lg shadow p-4 text-center"
              >
                <h4 className="font-semibold">{campaign.title}</h4>
                <p className="text-sm">{campaign.date}</p>
                <p className="text-sm text-gray-600">{campaign.location}</p>
              </div>
            ))}
          </div> */}
        </div>


        {/* Schedule & History */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Schedules */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-[#3d3bf3] mb-2">Upcoming Schedules</h3>
            {userData?.donationSchedules.length > 0 ? (
              <ul className="space-y-2">
                {userData?.donationSchedules?.map((schedule, index) => (
                  <li
                    key={index}
                    className="p-2 bg-red-50 rounded-lg flex justify-between"
                  >
                    <ScheduleDonationCard schedule={schedule}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming schedules.</p>
            )}
          </div>

          {/* Donation History */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-bold text-[#3d3bf3] mb-2">Requests</h3>
            {userData?.donationHistory.length > 0 ? (
              <ul className="space-y-2">
                {userData?.donationHistory.map((history, index) => (
                  <li
                    key={index}
                    className="p-2 bg-red-50 rounded-lg flex justify-between"
                  >
                    <span>{history.date}</span>
                    <span className="text-sm text-gray-600">
                      {history.bloodGroup}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No donation history.</p>
            )}
          </div>
        </div>

        {/* Chat Button */}
        <div className="text-right">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={handleChat}
          >
            Chat with Support
          </button>
        </div>
      </div>
    </div>
  );


};
export default Profile;
