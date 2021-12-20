import axios from 'axios';
import { useMutation } from 'react-query';

const login = (user) =>
  axios.post(`/api/auth/login`, user, {
    headers: { 'Content-Type': 'application/json' },
    proxy: {
      protocol: 'https',
      host: 'elgendy-ecommerce.herokuapp.com',
    },
  });

export function useLogin() {
  return useMutation(login);
}

// ##########################################################

export function logout() {
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`);
}
