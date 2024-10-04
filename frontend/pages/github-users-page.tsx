"use client"
import { axiosGet } from '@/lib/axios';
import React, { useState } from 'react';

interface User {
  _id: string;
  username: string;
  profileUrl: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginatedResponse<T> {
  code: number;
  success: boolean;
  data: T[];
  message: string;
  count: number;
  page: number;
  limit: number;
  nextPage: number | null; // Changed from string to number
  previousPage: number | null; // Changed from string to number
}

const SearchPage = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (pageNumber: number) => {
    try {
      const response = await axiosGet(`github-users?username=${username}&page=${pageNumber}&limit=2`);
      const result: PaginatedResponse<User> | any = await response;

      if (result.success) {
        setUserData(result.data);
        setPage(result.page); // Set the current page
        setTotalPages(result.totalPages); // Use totalPages from the response
        setError('');
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      setError(error.message);
      setUserData([]);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      handleSearch(newPage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to the first page
    handleSearch(1); // Search with the first page
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-bold mb-4">Search GitHub Users</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            placeholder="Enter GitHub username"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Search
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {userData.length > 0 && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
          <h3 className="font-bold text-xl mb-4">User Details</h3>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Profile</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-16 h-16 rounded-full"
                    />
                  </td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">
                    <a href={user.profileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                      View Profile
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1} // Disable if on the first page
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages} // Disable if on the last page
              className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;



