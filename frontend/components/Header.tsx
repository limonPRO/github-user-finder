"use client"

import { getFromLocalStorage, removeFromLocalStorage } from '@/lib/utils'; // Make sure removeFromLocalStorage is implemented
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const router = useRouter();

  const headers = [
    {
      title: 'SignIn',
      link: '/signin',
    },
    {
      title: 'SignUp',
      link: '/signup',
    },
    {
      title: 'users',
      link: '/github-users',
    },
  ];

  // Check for token on component mount
  useEffect(() => {
    const token = getFromLocalStorage('token');
    if (token) {
      setIsLoggedIn(true); // Set state to true if token exists
    }
  }, []);

  const handleLogout = () => {
    removeFromLocalStorage('token');
    removeFromLocalStorage('user');
    setIsLoggedIn(false); // Reset login state
    router.push('/signin'); // Redirect to sign-in page after logout
  };

  return (
    <div className="bg-gray-800 text-white p-4">
      <ul className="flex justify-end space-x-4">
        {headers.map((item) => (
          !isLoggedIn || item.link !== '/signin' ? (
            <li key={item.link}>
              <Link className="hover:text-gray-400 transition duration-200" href={item.link}>
                {item.title}
              </Link>
            </li>
          ) : null // Do not show "SignIn" link if logged in
        ))}
        {isLoggedIn && (
          <li>
            <button
              onClick={handleLogout}
              className="hover:text-gray-400 transition duration-200"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
