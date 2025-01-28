'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMaintenance() {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage
    const token = localStorage.getItem('authTokenAdmin');
    if (!token) {
      toast.error('Authorization token is missing!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/maintenance/create',
        { message: description }, // Request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success('Maintenance message added successfully!');
        setDescription(''); // Clear the input
      }
    } catch (error) {
      console.error('Error adding maintenance:', error);
      toast.error('Failed to add maintenance. Please try again.');
    }
  };

  return (
    <div className="p-4 border">
      <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">Add Maintenance</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows="3"
          placeholder="Describe the maintenance..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="px-4 py-1 bg-blue-500 text-white font-medium rounded-sm hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMaintenance;
