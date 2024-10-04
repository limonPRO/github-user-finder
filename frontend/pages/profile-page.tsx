"use client"
import { axiosGet } from '@/lib/axios';
import { getFromLocalStorage } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = getFromLocalStorage('user');
        const token = getFromLocalStorage('token');
        if (!userData && !token) {
          router.push('/signin'); // Redirect if not authenticated
          return;
        }
        const response = await axiosGet(`users/profile/${userData?._id}`); 

        if (response?.data) {
          const data = await response?.data
          setUser(data);
        } else {
          router.push('/signin'); // Redirect if token is invalid
        }
      } catch (error) {
        router.push('/signin'); // Redirect if there’s an error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Profile</h2>
          <p><strong>Name:</strong> {user.givenName} {user.familyName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Profile Picture:</strong></p>
          {user.profilePicture && <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full" />}
          <p><strong>Email Verified:</strong> {user.email_verified ? 'Yes' : 'No'}</p>
          <p><strong>Language:</strong> {user.language}</p>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
