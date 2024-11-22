const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">Total Donations</h2>
          <p>123</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">Requests</h2>
          <p>45</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">Donation Drives</h2>
          <p>7 Upcoming</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
