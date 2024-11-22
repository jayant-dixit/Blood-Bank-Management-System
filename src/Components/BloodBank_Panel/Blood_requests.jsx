import React from "react";

const Requests = () => {
  const requests = [
    { id: 1, user: "John Doe", bloodGroup: "A+", quantity: 2, status: "Pending" },
    { id: 2, user: "Jane Smith", bloodGroup: "O-", quantity: 1, status: "Accepted" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blood Requests</h1>
      <div>
        {requests.map((req) => (
          <div
            key={req.id}
            className="border border-gray-300 p-4 mb-4 rounded shadow-md"
          >
            <p><strong>User:</strong> {req.user}</p>
            <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
            <p><strong>Quantity:</strong> {req.quantity} units</p>
            <p><strong>Status:</strong> {req.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
