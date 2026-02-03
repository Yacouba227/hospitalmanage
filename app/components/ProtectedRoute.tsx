'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth-token');
    const user = localStorage.getItem('user');
    
    console.log('Token:', token ? 'Present' : 'Missing');
    console.log('User:', user ? 'Present' : 'Missing');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('Parsed user:', parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      console.log('No auth data found, redirecting to login');
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated - rendering nothing');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;