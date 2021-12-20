import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Login from './routes/Login';
import Home from './routes/home';
import UsersList from './routes/users';
import ProductsList from './routes/products';
import ProductForm from './routes/products/Form';
import { useAuthContext } from './context/auth';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  async function showMe() {
    try {
      const res = await fetch(`/api/users/showMe`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok && res.status === 200) {
        const data = await res.json();
        dispatch('LOGIN_ADMIN', data)
        navigate(-1, { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    showMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/users'
          element={
            <PrivateRoute>
              <UsersList />
            </PrivateRoute>
          }
        />
        <Route
          path='/products'
          element={
            <PrivateRoute>
              <ProductsList />
            </PrivateRoute>
          }
        />
        <Route
          path='/products/*'
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
