import React from 'react';
import { useGlobalContext } from '../../context/global';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Index = ({ children }) => {
  const { openSidebar } = useGlobalContext();
  return (
    <main className=''>
      <Sidebar />
      <div
        className={`absolute right-0 left-20 transition-all duration-500 ${
          openSidebar && 'left-64'
        }
        `}
      >
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default Index;
