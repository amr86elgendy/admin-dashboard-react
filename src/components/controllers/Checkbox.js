import { ErrorMessage, Field } from 'formik';
import { FaCheck } from 'react-icons/fa';
const Checkbox = ({ label, name, options, ...rest }) => {
  return (
    <div className='col-span-6 my-8 xl:col-span-3 '>
      <label className='block mb-2 text-sm font-medium capitalize'>
        {label}
      </label>
      <div className='flex lg:w-11/12 justify-evenly'>
        {options.map((option, i) => (
          <div className='relative flex flex-col items-center' key={i}>
            <Field name={name}>
              {({ field }) => {
                return (
                  <input
                    type='checkbox'
                    id={option}
                    {...field}
                    {...rest}
                    value={option}
                    checked={field.value.includes(option)}
                    className={`rounded-full appearance-none cursor-pointer peer ${
                      name === 'colors' &&
                      'w-8 h-8 opacity-50 checked:opacity-100'
                    } ${
                      name === 'sizes' &&
                      'w-10 h-10 checked:bg-gray-300 border border-[#bcbfc7]'
                    }`}
                    style={{ backgroundColor: option }}
                  />
                );
              }}
            </Field>
            {name === 'colors' && (
              <FaCheck
                size={16}
                className='absolute hidden text-white top-2 peer-checked:block'
                color='white'
              />
            )}
            <label
              key={i}
              className={`${name === 'colors' && 'mt-2'} ${
                name === 'sizes' &&
                'absolute top-2 peer-checked:text-white text-sm'
              }`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-600'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Checkbox;
