import { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Login from './routes/Login';
import Home from './routes/home';
import UsersList from './routes/users';
import ProductsList from './routes/products';
import OrdersList from './routes/orders';
import MessagesList from './routes/messages';
import ProductForm from './routes/products/Form';
import UserForm from './routes/users/Form';
import { useAuthContext } from './context/auth';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  
  async function showMe() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/showMe`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('ishop-dashboard-token')}`,
          },
        }
      );
      if (res.status === 200) {
        const { data } = res;
        dispatch('LOGIN_ADMIN', {
          user: data,
          token: localStorage.getItem('ishop-dashboard-token'),
        });
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
          path='/users/create'
          element={
            <PrivateRoute>
              <UserForm />
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
        <Route
          path='/orders'
          element={
            <PrivateRoute>
              <OrdersList />
            </PrivateRoute>
          }
        />
        <Route
          path='/messages'
          element={
            <PrivateRoute>
              <MessagesList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
