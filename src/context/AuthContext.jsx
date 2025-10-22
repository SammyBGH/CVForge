import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/user`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log('User data:', userData); // Debug log
          if (userData) {
            // Ensure the user data is in the expected format
            const formattedUser = {
              ...userData,
              displayName: userData.displayName || userData.name || 'User',
              email: userData.email || '',
              photoURL: userData.photos?.[0]?.value || userData.photoURL || null,
            };
            setUser(formattedUser);
          }
        } else {
          console.log('No active session');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check auth on initial load
    checkAuth();

    // Also check for auth redirect from Google OAuth
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === 'success') {
      // Remove the query parameter to clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      checkAuth();
    }
  }, []);

  const login = () => {
    // Redirect to Google OAuth
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/google`;
  };

  const logout = async () => {
    try {
      // First, try to call the logout endpoint
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Even if the logout request fails, we'll still clear the local state
      setUser(null);
      
      // Clear any local storage or session storage if needed
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
      
      // Force a full page reload to ensure all state is cleared
      window.location.href = '/';
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if there's an error, we'll still try to clear the local state
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
