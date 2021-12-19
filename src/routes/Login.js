import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FormControl from '../components/FormControl';
import FormikContainer from '../components/FormikContainer';
import { useAuthContext } from '../context/auth';
import { useLogin } from '../apis/auth';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch, isAuthenticated } = useAuthContext();
  const location = useLocation()
  const from = location.state?.from?.pathname || '/';
  const { mutate: loginAdmin } = useLogin();

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

  const handleSubmit = (values, onSubitProps) => {
    console.log({ values, onSubitProps });
    loginAdmin(values, {
      onSuccess: async (res) => {
        if (res.ok) {
          const data = await res.json()
          dispatch('LOGIN_ADMIN', data);
          // localStorage.setItem('token', data.token)
          navigate(from, { replace: true });
        } else {
          const data = await res.json();
          console.log(data);
          // handle error message
        }
      },
    });
    onSubitProps.resetForm();
  };
  return (
    <div className='bg-[#f8f8fb]'>
      <div className='px-4 overflow-hidden sm:px-0'>
        <div className='bg-white w-full px-4 py-5 m-auto my-8 border sm:p-6 lg:w-5/12 order-[#dbdfea] shadow-card md:w-7/12 sm:w-10/12'>
          <FormikContainer
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
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
            <button className='btn'>
              Save
            </button>
          </FormikContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;
