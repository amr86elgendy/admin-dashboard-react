import { FaPlus } from 'react-icons/fa';
import Table from '../../components/tables/UserTable';

const users = () => {
  return (
    <section className='px-6 mt-2 bg-gray-50'>
      <nav className='flex items-center justify-between px-10 py-4 mb-8'>
        <h2 className='tracking-widest uppercase text-[#364a63]'>users list</h2>
        <button className='btn'>
          <FaPlus className='mr-2' /> add user
        </button>
      </nav>
      <Table />
    </section>
  );
};

export default users;
