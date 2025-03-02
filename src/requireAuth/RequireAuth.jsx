import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return token ? <Outlet /> : <Navigate to="/login-admin" replace />;
};

export default RequireAuth;
