// components/Layout.tsx
"use client";

import React, { ReactNode } from "react";
import NavBar from "./NavBar";
import Sidebar from "./SideBar";
import useAuth from "../utils/useAuth";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  useAuth();

  return (
    <div className="flex bg-blue-50 min-h-screen">
      {!isLoginPage && <Sidebar />}
      <div className="flex-grow text-gray-800">
        {!isLoginPage && <NavBar />}
        <main className="container mx-auto flex-grow px-8 py-8">
          <ToastContainer />
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
