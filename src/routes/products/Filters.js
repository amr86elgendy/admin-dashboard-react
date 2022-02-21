import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { IoSearch } from 'react-icons/io5';

const Filters = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 1000);
  
  return (
    <form className='relative items-center hidden capitalize lg:flex justify-self-center w-[40%]'>
      <input
        type='text'
        className={`rounded-l px-4 py-1.5 border border-gray-300 focus:outline-none focus:border-primary inline-block placeholder-shown:font-light placeholder-shown:text-sm focus:shadow-primary w-full`}
        placeholder='search'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
      <button
        type='submit'
        className='px-4 py-1.5 font-light uppercase border bg-primary border-primary focus:shadow-primary rounded-r'
      >
        <IoSearch size={20} className='text-white' />
      </button>
    </form>
  );
};

export default Filters