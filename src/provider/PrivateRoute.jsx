import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
// import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { Navigate, useLocation } from "react-router";
// import Loading from "daisyui/components/loading";

const PrivateRoute = ({ children }) => {
  //user thakle return korbo children or navigate to login
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

//   console.log(location);

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>;
  }
};

export default PrivateRoute;
