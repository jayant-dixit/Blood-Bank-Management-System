import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ScheduleDonation = () => {
  const [formData, setFormData] = useState({
    bloodBankId: "",
    date: "",
    time: "",
    notes: "",
  });

  const navigate = useNavigate();

  const bloodBanks = [
    { id: "FF5BB5", name: "City Blood Bank", location: "Downtown" },
    { id: 2, name: "Hope Blood Bank", location: "Uptown" },
    { id: 3, name: "Life Line Blood Bank", location: "Midtown" },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/v1/users/donationSchedule`, formData);

      if (response.data.success) {
        toast.success("Donation scheduled successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error("Please login first");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEAFF] flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-[#3D3BF3] mb-6">
          Schedule Your Blood Donation
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Blood Bank Selection */}
          <div className="mb-4">
            <label
              htmlFor="bloodBankId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Blood Bank
            </label>
            <select
              name="bloodBankId"
              id="bloodBankId"
              value={formData.bloodBankId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#3D3BF3] focus:border-[#3D3BF3] text-sm"
              required
            >
              <option value="">-- Choose a Blood Bank --</option>
              {bloodBanks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name} ({bank.location})
                </option>
              ))}
            </select>
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Select Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#3D3BF3] focus:border-[#3D3BF3] text-sm"
              required
            />
          </div>

          {/* Time Input */}
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Select Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#3D3BF3] focus:border-[#3D3BF3] text-sm"
              required
            />
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Additional Notes (Optional)
            </label>
            <textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#3D3BF3] focus:border-[#3D3BF3] text-sm"
              placeholder="Any special instructions or notes..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF2929] text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Schedule Donation
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ScheduleDonation;
