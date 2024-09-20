import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../providers/auth/login";

const ProtectedRoute = ({ element: Component }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const session = getSession();

      if (session) {
        const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

        if (currentTimestamp > session.expires_at) {
          console.warn("Session expired, logging out.");
          localStorage.removeItem("userSessionData");
          localStorage.removeItem("authToken");
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      } else {
        setLoggedIn(false);
      }

      setIsLoading(false); // Set loading to false after session check
    };

    checkSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  return loggedIn ? Component : <Navigate to="/protected" />;
};

export default ProtectedRoute;
