"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import { removeToken } from "@/utils/removeToken";
import { authAPI } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getToken } from "@/utils/getToken";

export default function ProfileDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
const router=useRouter()
  const handleSignOut = async () => {
    console.log("token",getToken())
  await authAPI.logout();

    removeToken();
    
    toast.success("Logout successfully")
 router.replace("/login");
  };

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative text-black text-4xl" ref={dropdownRef}>
      {/* Avatar */}
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border"
      >
        <img
          src={`http://localhost:8000/uploads/${user?.avatar}`}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white border rounded-lg shadow-lg">
          {/* User Info */}
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold">{user?.username || "Admin"}</p>
            <p className="text-xs text-gray-500">
              {user?.email || "admin@email.com"}
            </p>
          </div>

          {/* Profile */}
          <button className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100">
            <User className="w-4 h-4 mr-2" />
            Profile
          </button>

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
