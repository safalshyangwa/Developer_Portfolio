"use client";

import React, { useState, useEffect } from "react";
import { Briefcase, Users, NewspaperIcon, Menu, X } from "lucide-react";

import { useRouter } from "next/navigation";
import ProfileDropdown from "@/components/ProfileDropdown";
import { authAPI } from "@/services/auth.service";

export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("Project");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Mobile sidebar state

  const router = useRouter();

  const navigation = [
    {
      name: "Project",
      href: "/admin/dashboard/projects",
      icon: Briefcase,
      id: "project",
    },
    {
      name: "Achievement",
      href: "/admin/dashboard/achievments",
      icon: Users,
      id: "Achievment",
    },
    {
      name: "Blog",
      href: "/admin/dashboard/blogs",
      icon: NewspaperIcon,
      id: "Blog",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await authAPI.getCurrentUser();
        setUser(res.data);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-white border-r transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col justify-between`}
      >
        <div>
          {/* Logo + Close button on mobile */}
          <div className="p-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">safal Admin</h1>
            <button className="md:hidden" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 px-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.href);
                  setIsOpen(false); // Close sidebar on mobile
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

        {/* Profile */}
        <div className="p-4 border-t">
          <ProfileDropdown user={user} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full">
        {/* Header */}
        <header className="bg-white border-b py-4 px-4 md:px-8 flex justify-between items-center">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 transition"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-700" />
          </button>

          <h2 className="text-lg md:text-xl font-semibold text-gray-800 capitalize">
            {activeTab} Management
          </h2>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
