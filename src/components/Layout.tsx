// components/Layout.tsx
'use client';

import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';
import useAuth from '../utils/useAuth';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';
  
  useAuth(); // Call useAuth unconditionally

  return (
    <div className="flex bg-blue-50 min-h-screen">
      {!isLoginPage && <Sidebar />}
      <div className="flex-grow text-gray-800">
        {!isLoginPage && <NavBar />}
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
