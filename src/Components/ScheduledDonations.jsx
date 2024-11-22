import React from "react";

const ScheduleDonationCard = ({ schedule }) => {
    // Define colors for different statuses
    const statusColors = {
        Scheduled: "bg-yellow-500 text-white",
        Completed: "bg-green-500 text-white",
        Cancelled: "bg-red-500 text-white",
    };

    return (
        <div className="max-w-[100%] w-full mx-auto p-4 bg-white shadow-lg rounded-lg mb-4">
            <div className="mt-3 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#3D3BF3]">{schedule.bloodBankId.name}</h2>
                <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold mx-4 bg-green-500 text-white"
                        }`}
                >
                    Blood Donation
                </span>
            </div>

            <p className="text-gray-600 mt-2">
                <span className="font-semibold">Date:</span> {schedule.date.split("T")[0]}
            </p>
            <p className="text-gray-600 mt-1">
                <span className="font-semibold">Time:</span> {schedule.time}
            </p>
            <div className="mt-3 flex items-center">
                <span className="font-semibold">Status:</span>
                <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold mx-4 ${statusColors[schedule.status] || "bg-gray-400 text-white"
                        }`}
                >
                    {schedule.status}
                </span>
            </div>
        </div>
    );
};

export default ScheduleDonationCard;
