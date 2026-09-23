import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useApp();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;