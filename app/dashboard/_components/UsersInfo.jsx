'use client'
import React, { useEffect, useState } from 'react';

function UsersInfo() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoteError, setPromoteError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authTokenAdmin');
        if (!token) {
          setError('Authorization token not found');
          return;
        }

        const response = await fetch('http://localhost:3000/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePromote = async (userEmail) => {
    try {
      const token = localStorage.getItem('authTokenAdmin');
      if (!token) {
        setPromoteError('Authorization token not found');
        return;
      }

      const response = await fetch('http://localhost:3000/user/adminpromote', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to promote user');
      }

      const data = await response.json();
      alert(`User ${data.admin.username} successfully promoted to admin!`);
    } catch (error) {
      setPromoteError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Users Information</h2>
        <div className="flex justify-center items-center space-x-2">
          <span className="text-gray-600">Loading...</span>
          <div className="w-4 h-4 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border bg-white rounded-md">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Users Information</h2>

      {promoteError && (
        <div className="mb-4 p-4 text-red-600 border border-red-600 rounded-md">
          {promoteError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-blue-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border text-left">#</th>
              <th className="px-4 py-2 border text-left">Full Name</th>
              <th className="px-4 py-2 border text-left">Username</th>
              <th className="px-4 py-2 border text-left">Email</th>
              <th className="px-4 py-2 border text-left">Role</th>
              <th className="px-4 py-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user.email} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-left text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 border text-left text-gray-700">{user.fullname}</td>
                <td className="px-4 py-2 border text-left text-gray-700">{user.username}</td>
                <td className="px-4 py-2 border text-left text-gray-700">{user.email}</td>
                <td className="px-4 py-2 border text-left text-gray-700">{user.role}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handlePromote(user.email)}
                    className="py-1 px-3 bg-blue-500 text-white text-sm rounded-sm hover:bg-blue-600"
                  >
                    Promote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersInfo;
