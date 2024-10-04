"use client";

import { getFromLocalStorage, removeFromLocalStorage } from '@/lib/utils'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter();

  const headers = [
    {
      title: 'SignIn',
      link: '/signin',
    },
    {
      title: 'users',
      link: '/github-users',
    },
    {
      title: 'profile',
      link: '/profile',
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
        {/* Render "SignIn" only if the user is not logged in */}
        {!isLoggedIn ? (
          <>
            <li>
              <Link className="hover:text-gray-400 transition duration-200" href="/signin">
                SignIn
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400 transition duration-200" href="/signup">
                SignUp
              </Link>
            </li>
          </>
        ):  (
          <>
            <li>
              <Link className="hover:text-gray-400 transition duration-200" href="/github-users">
              users
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-400 transition duration-200" href="/profile">
              profile
              </Link>
            </li>
          </>
        ) }

        {/* Always render "Users" link */}
        {/* {headers
          .filter(item => item.link === '/github-users') // Only show specific links
          .map(item => (
            <li key={item.link}>
              <Link className="hover:text-gray-400 transition duration-200" href={item.link}>
                {item.title}
              </Link>
            </li>
          ))} */}

        {/* Render "Logout" only if the user is logged in */}
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
