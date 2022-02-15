import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUser } from '../../apis/user';
import FormControl from '../../components/FormControl';
import FormikContainer from '../../components/FormikContainer';

const Form = () => {
  const navigate = useNavigate();

  const { mutate: createUser } = useCreateUser();

  const initialValues = {
    name: '',
    email: '',
    password: '',
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
  const handleSubmit = (values, submitProps) => {
    createUser(values, {
      onSuccess: () => navigate('/users'),
      onError: (err) => console.log(err.response.data),
    });
  };

  return (
    <div className='bg-[#f8f8fb] min-h-[calc(100vh-56px)]'>
      <div className='pt-6 pl-4 sm:pl-10'>
        <Link to='/users'>
          <button className='capitalize btn'>back to users</button>
        </Link>
      </div>
      <div className='px-4 overflow-hidden sm:px-0'>
        <div className='bg-white w-full px-4 py-5 m-auto my-8 border sm:p-6 sm:w-8/12 lg:w-1/2 order-[#dbdfea] shadow-card'>
          <FormikContainer
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
            title='user form'
          >
            <FormControl
              control='input'
              type='text'
              label='Name'
              name='name'
              span='6'
            />
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
      </div>
    </div>
  );
};

export default Form;
