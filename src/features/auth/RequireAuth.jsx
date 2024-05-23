import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./authSlice";

const RequireAuth = () => {
  const token = useSelector(selectToken);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
