import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";
export default function PrivateRoute({ role }) {
  const { loggedInrole, loggedIn, checkingStatus } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }

  console.log(" required role is : ", role);
  if (!loggedIn || loggedInrole !== role) {
    return <Navigate to="/login" />;
  } else return <Outlet />;
}
