// src/components/LoginProfileButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"

const LoginProfileButton: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // or a spinner if you want

  return (
    <button
      className="btn-grad-orange fw-bold pe-4 ps-4"
      style={{ zIndex: 1100, minWidth: '80px', borderRadius: '45px', height: '54px', fontSize: '16px' }}
      onClick={() => navigate(isLoggedIn ? "/profile" : "/firebaseAuth")}
    >
      {isLoggedIn ? "Profile" : "Login"}
    </button>
  );
};

export default LoginProfileButton;
