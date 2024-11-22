import React from "react";

const Sidebar = ({ setActiveTab }) => {
  const links = [
    { name: "Dashboard", key: "dashboard" },
    { name: "Manage Inventory", key: "inventory" },
    { name: "Requests", key: "requests" },
    { name: "Donation Drives", key: "drives" },
    { name: "Analytics", key: "analytics" },
  ];

  return (
    <div className="w-1/4 bg-blue-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Blood Bank Panel</h1>
      <ul>
        {links.map((link) => (
          <li
            key={link.key}
            className="p-2 hover:bg-blue-600 rounded cursor-pointer"
            onClick={() => setActiveTab(link.key)}
          >
            {link.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
