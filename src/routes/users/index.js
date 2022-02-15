import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useGetUsers } from '../../apis/user';
import Table from '../../components/tables/UserTable';
import { useAuthContext } from '../../context/auth';
import Loader from '../../components/Loader';

const UsersList = () => {
  const { token } = useAuthContext();
  const { isLoading, isError, data: usersData, error } = useGetUsers(token);

  if (isError) return <h1>{error.response.data}</h1>;

  return (
    <section className='h-[calc(100vh-56px)] p-6 bg-gray-50'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className='flex items-center justify-between py-4 mb-8 md:px-8'>
            <h2 className='md:tracking-widest uppercase text-[#364a63]'>
              users list
            </h2>
            <Link to='/users/create'>
              <button className='btn'>
                <FaPlus className='mr-2' /> add user
              </button>
            </Link>
          </nav>
          <Table users={usersData.users} />
        </>
      )}
    </section>
  );
};

export default UsersList;
