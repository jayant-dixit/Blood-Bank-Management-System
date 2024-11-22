import React, { useState } from "react";
import Sidebar from "../Components/Common_admin/Sidebar_admin";
import Dashboard from "../Components/BloodBank_Panel/Admin_Dashboard";
import Navbar from "../Components/Common_admin/Navbar_admin";
import ManageInventory from "../Components/BloodBank_Panel/Inventory";
import Requests from "../Components/BloodBank_Panel/Blood_requests";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "inventory":
        return <ManageInventory />;
      case "requests":
        return <Requests />;
      case "drives":
        return <DonationDrives />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="flex-1">
        <Navbar />
        <div className="p-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Admin;

