import { Link, useLocation } from 'react-router-dom';
import { mainLinks } from '../../constants/sidebar';
import { useGlobalContext } from '../../context/global';
import { FaApple } from 'react-icons/fa';

const Sidebar = () => {
  const { openSidebar } = useGlobalContext();
  const { pathname } = useLocation();
  const path = pathname !== '' ? pathname.split('/')[1] : pathname;

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 overflow-hidden transition-all duration-500 bg-[#2a3042] border-l-8 border-[#2a3042] ${
        openSidebar ? 'w-64' : 'w-20'
      }`}
    >
      <ul className='absolute top-0 left-0 w-full'>
        <li className='mb-12 text-white'>
          <Link to='/' className='relative flex w-full cursor-pointer'>
            <span className='relative flex items-center justify-center h-14 min-w-[64px]'>
              <FaApple size={30} />
            </span>
            <span className='relative flex px-2.5 h-14 items-center whitespace-nowrap text-3xl font-bold'>
              ishop
            </span>
          </Link>
        </li>
        {mainLinks.map((li, i) => (
          <li
            key={i}
            className={`group relative w-full hover:bg-gray-50 rounded-tl-3xl rounded-bl-3xl text-white link
              ${li.title === path && 'selected text-[#2a3042] bg-gray-50'}
            `}
          >
            <Link
              to={`/${li.title}`}
              className='relative flex w-full cursor-pointer group-hover:text-[#2a3042]'
            >
              <span className='relative flex items-center justify-center h-14 min-w-[64px]'>
                {li.icon}
              </span>
              <span className='relative flex px-2.5 h-14 items-center whitespace-nowrap text-lg'>
                {li.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
