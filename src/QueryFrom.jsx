/** @format */

import React, { useEffect, useState } from "react";
import { FaFileAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import NewComplaintModel from "./NewComplaintModel";
import axios from "axios";
import { withUser } from "./WithProvider";

const QueryFrom = ({ setUser }) => {
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [replyQuery, setReplyQuery] = useState([]);
  const [totalReplyLength, setTotalReplyLength] = useState(0);
  const [filterStatus, setFilterStatus] = useState("All"); // NEW: filter state

  useEffect(() => {
    userReply();
  }, []);

  const userReply = () => {
    axios
      .get(`http://localhost:5000/query/${userId}`)
      .then((response) => {
        setReplyQuery(response.data);
        setComplaints(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const total = replyQuery.reduce(
      (sum, item) => sum + (item.replyedQuery?.length || 0),
      0
    );
    setTotalReplyLength(total);
  }, [replyQuery]);

  const resolvedCount = complaints.filter(
    (complaint) => complaint.status === "resolved"
  ).length;

  // Filter logic
  const filteredComplaints =
    filterStatus === "All"
      ? complaints
      : complaints.filter(
          (complaint) =>
            complaint.status &&
            complaint.status.toLowerCase() === filterStatus.toLowerCase()
        );
  console.log(filteredComplaints);
  console.log(filterStatus);
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <span>📄</span> ComplaintHub
          </div>
          <div className="flex gap-6 items-center text-gray-700 font-medium">
            <a href="#">Home</a>
            <a href="#">Dashboard</a>
            <span>{userName.toUpperCase()}</span>
            <button
              className="text-blue-600 hover:text-blue-800"
              onClick={() => {
                localStorage.removeItem("userId");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("user");
                setUser(undefined);
              }}
            >
              Logout ⎋
            </button>
          </div>
        </nav>

        <main className="p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your complaints and track their status
          </p>

          <div className="mb-6">
            <Link
              to="/Admin"
              className="inline-block bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800"
            >
              Go to Admin Dashboard
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Complaints</p>
              <h2 className="text-2xl font-bold text-blue-700">
                {complaints.length}
              </h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Reply Characters</p>
              <h2 className="text-2xl font-bold text-blue-700">
                {totalReplyLength}
              </h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Resolved</p>
              <h2 className="text-2xl font-bold text-blue-700">
                {resolvedCount}
              </h2>
            </div>
          </div>

          <section className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  My Complaints
                </h2>
                <p className="text-sm text-gray-500">
                  View and track all your submitted complaints
                </p>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2"
              >
                <FaPlus /> New Complaint
              </button>
            </div>

            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="flex gap-2 text-sm">
                {["All", "Pending", "Resolved"].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setFilterStatus(tab)}
                    className={`px-4 py-1 rounded-full ${
                      filterStatus === tab
                        ? "bg-blue-900 text-white font-semibold"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search complaints..."
                className="border px-4 py-1 rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {filteredComplaints.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => (
                  <li key={complaint._id} className="py-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {complaint.query}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Status: {complaint.status}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-10 text-gray-500">
                <FaFileAlt className="text-4xl mx-auto mb-4" />
                <p className="mb-2 font-medium">No complaints found</p>
                <p className="text-sm mb-4">
                  Start by creating a new complaint
                </p>
                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 flex items-center gap-2 mx-auto"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <FaPlus /> New Complaint
                </button>
              </div>
            )}
          </section>

          {/* Display replies */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Replied Queries:</h2>
            {replyQuery.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow mb-2">
                <div className="text-gray-700">
                  <strong>{item.query}:</strong>{" "}
                  {item.replyedQuery && item.replyedQuery.trim().length > 0
                    ? item.replyedQuery
                    : "No reply yet."}
                </div>
                <div className="text-sm text-gray-500">
                  Length: {item.replyedQuery?.length || 0} characters
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <NewComplaintModel open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default withUser(QueryFrom);
