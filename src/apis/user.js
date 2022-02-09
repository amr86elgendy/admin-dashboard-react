import axios from 'axios';
import { useQuery } from 'react-query';

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
