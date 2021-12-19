import { Field, ErrorMessage } from 'formik';

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div className='col-span-6 lg:col-span-3'>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium capitalize text-[#344357]'
      >
        {name}
      </label>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <select
              {...field}
              {...rest}
              className={`block w-full px-4 py-2 mt-1 border  rounded shadow-sm focus:outline-none text-[#3c4d62] ${
                meta.error && meta.touched
                  ? 'border-red-500 focus:border-red-500 focus:shadow-error'
                  : 'focus:border-blue-500 border-[#dbdfea] focus:shadow-input'
              }`}
            >
              {options.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.key}
                  </option>
                );
              })}
            </select>
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-600'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Select;
