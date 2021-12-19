import { useMutation } from 'react-query';

const login = (user) =>
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })

export function useLogin() {
  return useMutation(login);
}

// ##########################################################

export function logout() {
  fetch('/api/auth/logout')
}
