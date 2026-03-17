"use client";

import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const handleClick = () => {
    toast.success("Login successful 🎉", {
      duration: 3000,
      style: {
        minWidth: "250px",
        textAlign: "center",
      },
      position: "top-center", // horizontal center
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Show Toast
      </button>

      {/* Toaster is required */}
      <Toaster 
        position="top-center" 
        containerStyle={{
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </div>
  );
}