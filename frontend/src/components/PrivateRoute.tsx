// src/components/PrivateRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return isLoggedIn ? children : <Navigate to="/firebaseAuth" replace />;
};

export default PrivateRoute;
