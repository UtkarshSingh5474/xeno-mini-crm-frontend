'use client';
import React, { useEffect, useState } from 'react';
import { auth, User } from '../utils/firebase';
import { useRouter } from 'next/navigation';

const NavBar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
      <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
        <span className="sr-only">Menu</span>
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <div className="relative w-full max-w-md sm:-ml-2 flex items-center">
        <h1 className="text-4xl font-semibold mb-2">Xeno Mini CRM</h1>
      </div>
      <div className="flex flex-shrink-0 items-center ml-auto">
        <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
          <span className="sr-only">User Menu</span>
          <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
            <span className="font-semibold">{user?.displayName || 'User'}</span>
            <span className="text-sm text-gray-600">Admin</span>
          </div>
          <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
            <img
              src={user?.photoURL || 'https://www.floresdevida.org/wp-content/uploads/2018/06/default-user-thumbnail-1.png'}
              alt="user profile photo"
              className="h-full w-full object-cover"
            />
          </span>
        </button>
        <div className="border-l pl-3 ml-3 space-x-1">
          
          <button
            onClick={signOut}
            className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
          >
            <span className="sr-only">Log out</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
