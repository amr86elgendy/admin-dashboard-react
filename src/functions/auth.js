import axios from 'axios';
import { useMutation } from 'react-query';

const login = (user) =>
  axios.post(`/auth/login`, user);

export function useLogin() {
  return useMutation(login);
}

// ##########################################################

export function logout() {
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`);
}
