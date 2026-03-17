"use client";

import { useState, useEffect } from "react";
import { Briefcase, Users, NewspaperIcon, X } from "lucide-react";
import { dashboardAPI } from "@/services/dashboard.service";

export default function DashboardPage() {
  const [stats, setStats] = useState({ projects: 0, achievements: 0, blogs: 0 });
  const [recentActivities, setRecentActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await dashboardAPI.getDashboard();
        setStats(res.data.stats);
        setRecentActivities(res.data.recentActivities);
        setAllActivities(res.data.allActivities); // fetch all for View All
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back, Admin!</h1>
        <p className="text-gray-600">Here's an overview of your activities and statistics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
          <div className="p-4 bg-blue-100 rounded-full mr-4">
            <Briefcase className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Projects</p>
            <h2 className="text-xl font-bold text-gray-900">{stats.projects}</h2>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
          <div className="p-4 bg-green-100 rounded-full mr-4">
            <Users className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Achievements</p>
            <h2 className="text-xl font-bold text-gray-900">{stats.achievements}</h2>
          </div>
        </div>

        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
          <div className="p-4 bg-yellow-100 rounded-full mr-4">
            <NewspaperIcon className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Blogs</p>
            <h2 className="text-xl font-bold text-gray-900">{stats.blogs}</h2>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow p-6 relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
          Recent Activities
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 text-sm hover:underline"
          >
            View All
          </button>
        </h2>

        <ul className="space-y-3">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <li
                key={activity._id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
              >
                <span>{activity.message}</span>
                <span className="text-gray-400 text-sm">{activity.timeAgo}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center py-4">No recent activities</li>
          )}
        </ul>
      </div>

      {/* Modal for All Activities */}
      {showAll && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 max-w-3xl rounded-xl shadow-lg p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setShowAll(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4">All Activities</h2>
            <ul className="space-y-3">
              {allActivities.length > 0 ? (
                allActivities.map((activity, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                  >
                    <span>{activity.message}</span>
                    <span className="text-gray-400 text-sm">{activity.timeAgo}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center py-4">No activities found</li>
              )}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}