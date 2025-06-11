import React, { useState, useEffect, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true); // Explicitly set loading true at the start of auth check
      try {
        const response = await fetch('/api/verify-auth', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Cookies are typically sent automatically by the browser,
            // so no explicit 'Cookie' header is needed here for fetch.
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        } else {
          // If response is not OK (e.g., 401, 500), treat as unauthenticated
          console.error('Auth verification failed with status:', response.status);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during auth verification request:', error);
        setIsAuthenticated(false); // Treat errors as unauthenticated
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []); // Empty dependency array ensures this runs once on mount

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Render children if authenticated
};

export default ProtectedRoute;
