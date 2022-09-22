import { Navigate, Outlet } from "react-router-dom";
import WebStore from "../data/WebStore";

const ProtectRouteLogin = () => {
  const auth = WebStore.checkCookies();
  const userId = auth;

  if (userId) {
    return <Navigate to="/"></Navigate>;
  }

  return <Outlet />;
};

export default ProtectRouteLogin;
