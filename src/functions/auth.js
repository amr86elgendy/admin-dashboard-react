import axios from 'axios';
import { useMutation } from 'react-query';

const login = (user) =>
  axios.post(
    `https://elgendy-ecommerce.herokuapp.com/api/auth/login`,
    user,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );

export function useLogin() {
  return useMutation(login);
}

// ##########################################################

export function logout() {
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`);
}
