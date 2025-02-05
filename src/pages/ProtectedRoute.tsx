import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: any) => {
  const { auth } = useAuth();
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return children;
};