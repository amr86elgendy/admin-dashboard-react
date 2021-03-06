import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/global';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [fixedNav, setFixedNav] = useState(false);
  const { dispatch, openSidebar } = useGlobalContext();

  const handlefixedNav = () =>
    window.pageYOffset === 0 ? setFixedNav(false) : setFixedNav(true);

  useEffect(() => {
    window.addEventListener('scroll', () => handlefixedNav);
    return () => window.removeEventListener('scroll', handlefixedNav);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-20 flex px-4 py-3 transition-shadow duration-200 backdrop-filter backdrop-blur ${
        fixedNav ? 'shadow-nav' : 'shadow-card'
      }`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <div
        className='flex items-center cursor-pointer text-primary sm:hidden'
        onClick={() => dispatch('TOGGLE_SIDEBAR_FULL')}
      >
        <IoMenu size={30} />
      </div>
      <div
        className='items-center hidden cursor-pointer text-primary md:flex'
        onClick={() => dispatch('TOGGLE_SIDEBAR')}
      >
        {!openSidebar ? <IoMenu size={30} /> : <IoClose size={30} />}
      </div>
      <h2 className='flex-1 font-extrabold text-center text-primary'>
        ishop
      </h2>
    </nav>
  );
};

export default Navbar;
