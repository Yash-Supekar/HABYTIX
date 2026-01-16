import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffLayout from "../../layouts/StaffLayout";

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);
  const user = JSON.parse(localStorage.getItem("habytixUser"));

  useEffect(() => {
    if (!user?.id) return;

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/staff/${user.id}/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load staff stats", err);
      }
    };

    fetchStats();
  }, [user?.id]);

  return (
    <StaffLayout>
      {!stats ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-gray-700">Total Tickets</h2>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-gray-700">Active Tickets</h2>
            <p className="text-3xl font-bold mt-2">{stats.active}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-gray-700">Resolved Tickets</h2>
            <p className="text-3xl font-bold mt-2">{stats.closed}</p>
          </div>
        </div>
      )}
    </StaffLayout>
  );
};

export default StaffDashboard;
