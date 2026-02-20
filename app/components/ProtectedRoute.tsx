'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = () => {
      console.log('ProtectedRoute: Checking authentication status...');
      
      // Check for authentication tokens in localStorage
      const token = localStorage.getItem('auth-token');
      const user = localStorage.getItem('user');
      
      console.log('ProtectedRoute: Token exists:', !!token);
      console.log('ProtectedRoute: User data exists:', !!user);
      
      if (token && user) {
        try {
          const userData = JSON.parse(user);
          console.log('ProtectedRoute: User data parsed successfully:', userData.email);
          setIsAuthenticated(true);
          setLoading(false);
        } catch (error) {
          console.error('ProtectedRoute: Error parsing user data:', error);
          // Clear invalid data and redirect to login
          localStorage.removeItem('auth-token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } else {
        console.log('ProtectedRoute: No auth data found, redirecting to login');
        router.push('/login');
      }
    };

    // Check immediately
    checkAuthentication();

    // Set up interval to keep checking (in case of race conditions)
    const interval = setInterval(checkAuthentication, 1000);

    // Clean up interval
    return () => {
      clearInterval(interval);
    };
  }, [router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-medium">
            Loading Dashboard...
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Please wait while we verify your authentication
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render the protected content
  console.log('ProtectedRoute: User authenticated, rendering dashboard');
  return <>{children}</>;
};

export default ProtectedRoute;