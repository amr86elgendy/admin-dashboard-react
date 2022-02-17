import { useEffect, useState } from 'react';
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
import Loader from './components/Loader';

function App() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  
  async function showMe() {
    try {
      setIsLoading(true)
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
        setIsLoading(false)
        const { data } = res;
        dispatch('LOGIN_ADMIN', {
          user: data,
          token: localStorage.getItem('ishop-dashboard-token'),
        });
        navigate(-1, { replace: true });
      } else {
        setIsLoading(false)
        navigate('/login', { replace: true });
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  useEffect(() => {
    showMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (isLoading) return <Loader />
  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<UsersList />} />
          <Route path='/users/create' element={<UserForm />} />
          <Route path='/products' element={<ProductsList />} />
          <Route path='/products/*' element={<ProductForm />} />
          <Route path='/orders' element={<OrdersList />} />
          <Route path='/messages' element={<MessagesList />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
