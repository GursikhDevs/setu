import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

//Private route wrapper to protect the route which requires login, if the user is not logged in then he is directed to the login page
const PrivateRoute = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;