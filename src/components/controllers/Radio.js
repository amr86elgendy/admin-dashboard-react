import { Field } from 'formik';
import { FaCheck } from 'react-icons/fa';

const Radio = ({ label, name, ...rest }) => {
  return (
    <div className='flex items-center col-span-6 lg:col-span-6'>
      <label
        htmlFor={name}
        className={`mb-2 font-medium capitalize text-secondary ${
          name === 'featured' ? 'mr-12' : 'mr-4'
        }`}
      >
        {name}
      </label>
      <Field name={name}>
        {({ field }) => {
          return (
            <div className='relative'>
              <input
                type='checkbox'
                {...field}
                {...rest}
                className='w-6 h-6 border-[3px] appearance-none cursor-pointer border-[#dbdfea] rounded checked:ring-2 checked:ring-offset-2 checked:bg-blue-300 peer'
                checked={field.value}
              />
              <FaCheck
                color='white'
                className='absolute top-1.5 right-1.5 hidden peer-checked:block'
                size={10}
              />
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default Radio;
