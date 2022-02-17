import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

export default function PrivateRoute({ ...rest }) {
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
  return <Outlet />;
}
