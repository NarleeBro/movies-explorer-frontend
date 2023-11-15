import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {

  const isAuth = !!localStorage.getItem('token');

  return (
    isAuth ? <Component {...props} /> : <Navigate to="/" replace/>
  )
}

export default ProtectedRouteElement;
