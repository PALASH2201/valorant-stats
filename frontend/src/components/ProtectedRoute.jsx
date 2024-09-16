import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Helper to check if the token has expired
const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

// Helper to refresh the access token
const refreshToken = async (setAccessToken, setRefreshing) => {
  const refresh_token = localStorage.getItem('refresh_token');

  if (!refresh_token) {
    // If no refresh token, navigate to sign-in
    setAccessToken(null);
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/refresh", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${refresh_token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      setAccessToken(data.access_token); // Update state with new access token
    } else {
      // Refresh token is invalid, clear tokens and navigate to sign-in
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setAccessToken(null);
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
    setAccessToken(null); // In case of error, log the user out
  } finally {
    setRefreshing(false); // Done refreshing
  }
};

const ProtectedRoute = ({ children }) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const [refreshing, setRefreshing] = useState(true); // Indicates if the token is being refreshed

  useEffect(() => {
    if (!accessToken) {
      setRefreshing(false);
      return;
    }

    // Check if the token is expired
    if (isTokenExpired(accessToken)) {
      refreshToken(setAccessToken, setRefreshing);
    } else {
      setRefreshing(false); // No need to refresh token
    }
  }, [accessToken]);

  if (refreshing) {
    // Optionally display a loading spinner while refreshing
    return <div>Loading...</div>;
  }

  if (!accessToken) {
    // Redirect to sign-in if token is invalid or refresh failed
    return <Navigate to="/signin" />;
  }

  // If everything is fine, render the children
  return children;
};

export default ProtectedRoute;
