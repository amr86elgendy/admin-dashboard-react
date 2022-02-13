import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export function useGetUsers(token) {
  return useQuery(
    'get-all-users',
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    { staleTime: 30000 } // make new request after 30 second
  );
}
// ############################################################

const createUser = async (user) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/auth/register`, user
  );
  return data;
};
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(createUser, {
    onSuccess: () => queryClient.invalidateQueries('get-all-users'),
  });
}

// ##########################################################

export function useGetUser(userId, token, enabled) {
  return useQuery(
    ['get-user', userId],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    {
      enabled,
    }
  );
}