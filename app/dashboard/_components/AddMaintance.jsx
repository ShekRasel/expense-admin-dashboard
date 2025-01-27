'use client'
import React, { useState } from "react";

function AddMaintance() {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Maintenance Added:", description);
    setDescription("");
  };

  return (
    <div className="p-4 border ">
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

export default AddMaintance;
