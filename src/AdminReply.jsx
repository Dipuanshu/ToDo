/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
const AdminReply = () => {
  const nevigate = useNavigate();
  const { id } = useParams();
  const [query, setquery] = useState([]);
  const [message, setmessage] = useState("");
  useEffect(() => {
    userQuery();
  }, []);
  const userQuery = () => {
    axios
      .get(`http://localhost:5000/queries/${id}`)
      .then((response) => {
        setquery(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  };
  const replyedQuery = () => {
    const result = fetch(`http://localhost:5000/updateReply/${id}`, {
      method: "PUT",
      body: JSON.stringify({ replyedQuery: message }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      nevigate("/admin/Home");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow-lg">
        <>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Welcome Admin Page!
          </h2>
          <form className="space-y-4">
            {query.map((e) => {
              return (
                <>
                  <div>user Id:{id}</div>
                  <div>Subject:{e.query}</div>
                </>
              );
            })}
            <textarea
              name="message"
              rows="4"
              value={message}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
              placeholder="Your Message"
              className="w-full border border-gray-300 p-3 rounded-md resize-none"
            ></textarea>
          </form>
          <button
            onClick={replyedQuery}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Reply Query
          </button>
        </>
      </div>
    </div>
  );
};

export default AdminReply;
