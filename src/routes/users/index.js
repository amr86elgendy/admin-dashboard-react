import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa';
import { useGetUsers } from '../../apis/user';
import Table from '../../components/tables/UserTable';
import { useAuthContext } from '../../context/auth';

const UsersList = () => {
  const { token } = useAuthContext()
  const { isLoading, isError, data: usersData, error } = useGetUsers(token);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>{error.response.data}</h1>;
  
  return (
    <section className='px-6 mt-2 bg-gray-50'>
      <nav className='flex items-center justify-between px-10 py-4 mb-8'>
        <h2 className='tracking-widest uppercase text-[#364a63]'>users list</h2>
        <Link to='/users/create'>
          <button className='btn'>
            <FaPlus className='mr-2' /> add user
          </button>
        </Link>
      </nav>
      {usersData && <Table users={usersData.users} />}
    </section>
  );
};

export default UsersList;
