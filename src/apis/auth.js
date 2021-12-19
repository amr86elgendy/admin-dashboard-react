import { useMutation } from 'react-query';

const login = (user) =>
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })

export function useLogin() {
  return useMutation(login);
}

// ##########################################################

export function logout() {
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`);
}
