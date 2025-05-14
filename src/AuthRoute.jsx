/** @format */

import React from "react";
import { Navigate } from "react-router-dom";
import { withUser } from "./WithProvider";

function AuthRoute({ children, user }) {
  console.log("user", user);
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default withUser(AuthRoute);
