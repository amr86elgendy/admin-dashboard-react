import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormControl from '../components/FormControl';
import FormikContainer from '../components/FormikContainer';
import { useAuthContext } from '../context/auth';
import { useLogin } from '../apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, isAuthenticated } = useAuthContext();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { mutate: loginAdmin, isLoading, isError, error } = useLogin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const initialValues = {
    email: 'amr@tawfik.com',
    password: '123456',
  };

  const validate = (values) => {
    const errors = {};
    const keys = Object.keys(values);
    for (let key of keys) {
      if (values[key] === '' || values[key].length === 0) {
        errors[key] = `${key} is required`;
      }
    }
    return errors;
  };

  const handleSubmit = (values, onSubmitProps) => {
    // console.log({ values, onSubmitProps });
    loginAdmin(values, {
      onSuccess: async (res) => {
        const { data } = res;
        dispatch('LOGIN_ADMIN', data);
        localStorage.setItem('ishop-dashboard-token', data.token);
        navigate(from, { replace: true });
        onSubmitProps.resetForm();
      },
      onError: (error) => console.log(error.response.data)
    });
    
  };
  return (
    <div className='bg-[#f8f8fb] h-[calc(100vh-56px)]'>
      <div className='h-full px-4 overflow-hidden sm:px-0'>
        <div className='bg-white w-full px-4 py-5 m-auto mt-20 border sm:p-6 lg:w-5/12 order-[#dbdfea] shadow-card md:w-7/12 sm:w-10/12'>
          <FormikContainer
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            title='login'
          >
            <FormControl
              control='input'
              type='email'
              label='Email'
              name='email'
              span='6'
            />
            <FormControl
              control='input'
              type='password'
              label='Password'
              name='password'
              span='6'
            />
          </FormikContainer>
        </div>
        {isError && (
          <div className='text-red-600'>{error.response.data.msg}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
