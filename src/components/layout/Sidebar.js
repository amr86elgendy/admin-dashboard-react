import { Link, useLocation} from 'react-router-dom';
import { mainLinks } from '../../constants/sidebar';
import { useAuthContext } from '../../context/auth';
import { useGlobalContext } from '../../context/global';
import { FaApple } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { logout } from '../../apis/auth';

const Sidebar = () => {
  const { isAuthenticated, dispatch: dispatchAuth } = useAuthContext();
  const { dispatch, openSidebar, openSidebarFull } = useGlobalContext();
  const { pathname } = useLocation();
  const path = pathname !== '' ? pathname.split('/')[1] : pathname;

  const getLinks = (links) => {
    if (!isAuthenticated) {
      const newLinks = links.slice(0, links.length - 1);
      return newLinks;
    }
    return links;
  };
  
  const handleNavigation = async (title) => {
    if (title === 'sign out') {
      await logout();
      localStorage.removeItem('ishop-dashboard-token');
      dispatchAuth('LOGOUT_ADMIN');
    }
    dispatch('TOGGLE_SIDEBAR_FULL');
  };

  return (
    <aside
      className={`fixed z-30 top-0 bottom-0 left-0 overflow-hidden transition-all duration-500 bg-primary border-l-8 border-primary flex sm:-translate-x-0
      ${openSidebar ? 'sm:w-64' : 'sm:w-20'} 
      ${openSidebarFull ? '-translate-x-0 w-full' : '-translate-x-full w-0'}`}
    >
      <ul className='absolute top-0 left-0 w-full'>
        <li className='flex items-center justify-between mb-12 text-white'>
          <Link to='/' className='relative flex cursor-pointer'>
            <span className='relative flex items-center justify-center h-14 min-w-[64px]'>
              <FaApple size={30} />
            </span>
            <span className='relative flex px-2.5 h-14 items-center whitespace-nowrap text-3xl font-bold'>
              ishop
            </span>
          </Link>
          <div
            className='mr-4 text-white cursor-pointer sm:hidden'
            onClick={() => dispatch('TOGGLE_SIDEBAR_FULL')}
          >
            <IoClose size={30} />
          </div>
        </li>
        {getLinks(mainLinks).map((li, i) => (
          <li
            key={i}
            className={`group relative w-full hover:bg-gray-50 rounded-tl-3xl rounded-bl-3xl text-white link
              ${li.title === path && 'selected text-primary bg-gray-50'}
            `}
            onClick={() => handleNavigation(li.title)}
          >
            <Link
              to={li.title === 'sign out' ? pathname : `/${li.title}`}
              className='relative flex w-full cursor-pointer group-hover:text-primary'
            >
              <span className='relative flex items-center justify-center h-14 min-w-[64px]'>
                {li.icon}
              </span>
              <span className='relative flex px-2.5 h-14 items-center whitespace-nowrap text-lg capitalize'>
                {li.title === '' ? 'home' : li.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
