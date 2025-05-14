/** @format */

import React from "react";
import Login from "./Login";
import SingUp from "./SingUp";
import { Route, Routes } from "react-router-dom";
import AlertProvider from "./AlertProvider";
import UserProvider from "./UserProvider";
import QueryFrom from "./QueryFrom";
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import Admin from "./Admin";
import AdminHome from "./AdminHome";
import AdminReply from "./AdminReply";
import Try from "./Try";
function App() {
  return (
    <>
      <UserProvider>
        <AlertProvider>
          <Routes>
            <Route
              index
              element={
                <UserRoute>
                  <QueryFrom />
                </UserRoute>
              }
            />

            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <AuthRoute>
                  <SingUp />
                </AuthRoute>
              }
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/Home" element={<AdminHome />} />
            <Route path="/admin/Reply/:id" element={<AdminReply />} />
            <Route path="/Try" element={<Try />} />
          </Routes>
        </AlertProvider>
      </UserProvider>
    </>
  );
}
export default App;
