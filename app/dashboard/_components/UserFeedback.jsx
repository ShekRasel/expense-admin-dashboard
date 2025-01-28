'use client';
import React, { useEffect, useState } from 'react';

function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
   // Retrieve the token from localStorage
   const authAdminToken = localStorage.getItem('authTokenAdmin');
  useEffect(() => {
    
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("http://localhost:3000/feedback/getFeedbacks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authAdminToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          

          setFeedbacks(data || []);
        } else {
          console.error("Failed to fetch feedbacks. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const timer = setTimeout(fetchFeedbacks, 500); 
    return () => clearTimeout(timer);
  }, [authAdminToken]);
  

  return (
    <div className="p-4 border">
      <h2 className="text-xl font-bold text-gray-700 mb-4">User Feedback</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading feedbacks...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks available.</p>
      ) : (
        <ul className="space-y-3">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="p-3 border rounded-md shadow-sm">
              <p className="text-sm font-medium">{`Feedback ID: ${feedback.id}`}</p>
              <p className="text-sm  text-gray-600">"{feedback.feedback}"</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted on: {new Date(feedback.datePosted).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserFeedback;
