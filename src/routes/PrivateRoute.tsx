import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactElement;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
