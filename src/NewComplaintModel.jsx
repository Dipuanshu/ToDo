/** @format */

import React, { useState } from "react";

function NewComplaintModel({ open, onClose }) {
  const [complaints, setComplaints] = useState([]);

  const userName = localStorage.getItem("user");
  const email = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  if (!open) return null;

  const querySaved = () => {
    fetch("http://localhost:5000/saved", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        query: complaints,
        userId,
      }),
    });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl relative shadow-lg">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold mb-1">Submit New Complaint</h2>
        <p className="text-sm text-gray-500 mb-4">
          Fill out the form below to submit a new complaint
        </p>

        <form>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="text-sm font-medium">Category</label>
              <select className="w-full border rounded-md p-2 mt-1">
                <option>Technical</option>
                <option>Billing</option>
                <option>Support</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="text-sm font-medium">Priority</label>
              <select
                defaultValue="Medium"
                className="w-full border rounded-md p-2 mt-1"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Subject</label>
            <input
              type="text"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Brief summary of your complaint"
              onChange={(e) => {
                setComplaints(e.target.value);
              }}
            />
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows="4"
              className="w-full border rounded-md p-2 mt-1"
              placeholder="Provide detailed information about your complaint"
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={querySaved}
              className="bg-blue-900 text-white px-4 py-2 rounded-md"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewComplaintModel;
