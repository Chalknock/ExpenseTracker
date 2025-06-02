import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();  // <-- Use accessToken here

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
