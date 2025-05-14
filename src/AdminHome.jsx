/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function AdminQueryPanel() {
  const nevigate = useNavigate();
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/queries");
      setQueries(res.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  const handleReply = (queryId) => {
    nevigate(`/admin/Reply/${queryId}`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>User Queries</h1>
      <input
        type="text"
        placeholder="Search by subject or user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "300px" }}
      />
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th style={{ textAlign: "left", paddingLeft: "80px" }}>ID</th>
            <th style={{ textAlign: "left", paddingLeft: "40px" }}>User</th>
            <th style={{ textAlign: "left", paddingLeft: "30px" }}>Subject</th>
            <th style={{ textAlign: "left", paddingLeft: "20px" }}>Status</th>
            <th style={{ textAlign: "left", paddingLeft: "20px" }}>Date</th>
            <th style={{ textAlign: "left", paddingLeft: "0px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {queries
            .filter(
              (q) =>
                q.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.query.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((q) => (
              <tr key={q._id}>
                <td>{q._id}</td>
                <td>{q.userName}</td>
                <td>{q.query}</td>
                <td>{q.status}</td>
                <td>{new Date(q.date).toLocaleDateString()}</td>

                <td>
                  <button onClick={() => handleReply(q._id)}>Reply</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
