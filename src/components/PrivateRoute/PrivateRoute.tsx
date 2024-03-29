import { Navigate, Route, useLocation } from "react-router";
import { useUserData } from "../../hooks";
import { PrivateRouteType } from "./privateRoute.types";

export const PrivateRoute = (props: PrivateRouteType): JSX.Element => {
  const { userLoading, isUserLoggedIn } = useUserData();
  const location = useLocation();

  if (userLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (isUserLoggedIn) {
    return <Route {...props} />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};
