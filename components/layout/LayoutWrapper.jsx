"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register";

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
