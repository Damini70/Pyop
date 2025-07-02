import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, userType, login,logout} = useAuth();

 console.log({requiredRole})

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return requiredRole === "business" ? (
      <Navigate to="/business/signup" replace/>
    ) : (
      <Navigate to="/customer/login" replace/>
    );
  }

  // Redirect users with incorrect roles
  if (requiredRole && userType !== requiredRole) {
    return userType === "customer" ? (
      <>
        <Navigate to="/business/signup" replace />
      </>
    ) : (
      <Navigate to="/customer/login" replace />
    );
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;
