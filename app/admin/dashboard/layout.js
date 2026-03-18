"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  NewspaperIcon,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { removeToken } from "@/utils/removeToken";
import ProfileDropdown from "@/components/ProfileDropdown";
import { authAPI } from "@/services/auth.service";


export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("services");
  const [user, setUser] = useState({});

  const router = useRouter();

  const navigation = [
    {
      name: "Project",
      href: "/admin/dashboard/projects",
      icon: Briefcase,
      id: "portfolio",
    },
    {
      name: "Achievement",
      href: "/admin/dashboard/achievments",
      icon: Users,
      id: "partners",
    },
    {
      name: "Blog",
      href: "/admin/dashboard/blogs",
      icon: NewspaperIcon,
      id: "contacts",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authAPI.getCurrentUser();

        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">Agency Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.href);
                }}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          
          <ProfileDropdown user={user} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab} Management
          </h2>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
