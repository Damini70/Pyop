import { CircularProgress } from "@mui/material";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthContext Provider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulating user authentication state from localStorage or API
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");

    if (storedUserType && token) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
    }
    setLoading(false);
  }, []);

  // Example login function
  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem("userType", type);
  };

  // Example logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.clear();
  };

  if (loading) {
    // You can return a loading spinner or null here
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);
