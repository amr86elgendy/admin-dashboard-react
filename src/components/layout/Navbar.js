import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/global';
import { IoMenu, IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [fixedNav, setFixedNav] = useState(false)
  const { dispatch, openSidebar } = useGlobalContext();
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset === 0) setFixedNav(false);
      else setFixedNav(true);
    });
  }, []);
  
  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 flex px-4 py-3 transition-shadow duration-200 backdrop-filter backdrop-blur ${
        fixedNav ? 'shadow-nav' : 'shadow-card'
      }`}
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
    >
      <div
        className='items-center hidden cursor-pointer text-[#2a3042] md:flex'
        onClick={() => dispatch('TOGGLE_SIDEBAR')}
      >
        {!openSidebar ? <IoMenu size={30} /> : <IoClose size={30} />}
      </div>
      <h3 className='flex-1 tracking-wider text-center text-[#2a3042] capitalize'>
        admin dashboard
      </h3>
    </nav>
  );
};

export default Navbar;
