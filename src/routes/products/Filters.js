import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { IoSearch } from 'react-icons/io5';

const Filters = ({ globalFilter, setGlobalFilter }) => {
  
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 500);
  
  return (
    <form className='relative items-center hidden capitalize lg:flex justify-self-center w-[40%]'>
      <input
        type='text'
        className={`rounded-l px-4 py-1.5 border border-gray-300 focus:outline-none focus:border-primary inline-block placeholder-shown:font-light w-full placeholder-shown:capitalize`}
        placeholder='search'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <button
        type='submit'
        className='px-4 py-2 font-light uppercase border rounded-r bg-primary border-primary focus:shadow-primary'
      >
        <IoSearch size={20} className='text-white' />
      </button>
    </form>
  );
};

export default Filters