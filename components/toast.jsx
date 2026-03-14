"use client";

import toast from "react-hot-toast";

export default function Page() {
  const handleClick = () => {
    toast.success("Login successful 🎉");
  };

  return (
    <button onClick={handleClick}>
      Show Toast
    </button>
  );
}