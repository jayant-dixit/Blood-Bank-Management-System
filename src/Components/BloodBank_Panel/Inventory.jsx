import React, { useState } from "react";

const ManageInventory = () => {
  const [inventory, setInventory] = useState([
    { bloodType: "A+", quantity: 20 },
    { bloodType: "O+", quantity: 15 },
    { bloodType: "B-", quantity: 5 },
  ]);

  const handleUpdate = (index, value) => {
    const updated = [...inventory];
    updated[index].quantity = value;
    setInventory(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Inventory</h1>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Blood Type</th>
            <th className="border border-gray-400 p-2">Quantity</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2 text-center">{item.bloodType}</td>
              <td className="border border-gray-400 p-2 text-center">{item.quantity}</td>
              <td className="border border-gray-400 p-2 text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => handleUpdate(index, item.quantity + 1)}
                >
                  + Add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInventory;
