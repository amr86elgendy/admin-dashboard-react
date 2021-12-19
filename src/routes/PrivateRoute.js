import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

export default function PrivateRoute({ children, ...rest }) {
  let { isAuthenticated } = useAuthContext();
  const location = useLocation();
  if (!isAuthenticated) {
    return (
      <Navigate
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }
  return children;
}
