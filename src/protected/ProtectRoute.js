import { Navigate, Outlet } from "react-router-dom";
import WebStore from "../data/WebStore";

const ProtectRoute = (props) => {
  const auth = WebStore.checkCookies();
  const userId = auth;

  if (!userId) {
    return <Navigate to="/authentication"></Navigate>;
  }

  return <Outlet />;
};

export default ProtectRoute;
