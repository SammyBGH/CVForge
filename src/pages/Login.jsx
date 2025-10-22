import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h3>Sign in with Google</h3>
        <p>Create an account or sign in to save and manage your CVs</p>
        <button onClick={login} className="google-btn">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5781 9.20508C17.5781 8.56641 17.5219 7.95273 17.4176 7.36377H9V10.845H13.8441C13.6353 12.0133 13.001 13.0082 12.048 13.6532V15.8199H14.7158C16.5539 14.1133 17.5781 11.7156 17.5781 9.20508Z" fill="#4285F4"/>
            <path d="M9 18C11.475 18 13.5886 17.1123 15.1184 15.6123L12.6424 13.5C11.828 14.0625 10.7859 14.3955 9.64205 14.3955C7.26094 14.3955 5.26591 12.8403 4.55039 10.7045H1.78594V12.9375C3.29648 15.9432 6.26602 18 9 18Z" fill="#34A853"/>
            <path d="M4.55039 10.7045C4.30078 9.96562 4.16016 9.17045 4.16016 8.35034C4.16016 7.53023 4.30078 6.73506 4.55039 5.99609V3.76318H1.78594C0.944531 5.45341 0.445312 7.35034 0.445312 9.37568C0.445312 11.401 0.944531 13.2979 1.78594 14.9882L4.55039 12.7553L4.55039 10.7045Z" fill="#FBBC05"/>
            <path d="M9 2.42045C10.2457 2.42045 11.3777 2.83693 12.3008 3.63818L15.1406 0.798295C13.5844 -0.681818 11.4703 -0.000568398 9 -0.00056839C6.26602 -0.00056839 3.29648 2.05653 1.78594 5.06227L4.55039 7.29518C5.26016 5.15483 7.26094 3.57955 9 3.57955V2.42045Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        <p className="auth-footer">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
