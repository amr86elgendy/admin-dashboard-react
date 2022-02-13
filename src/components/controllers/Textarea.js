import { ErrorMessage, Field } from 'formik';
import React from 'react';

const Textarea = ({ label, name, ...rest }) => {
  return (
    <div className='col-span-6 lg:col-span-3'>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium capitalize text-secondary'
      >
        {name}
      </label>
      <Field name={name}>
        {({ field, meta }) => {
          return (
            <textarea
              {...field}
              {...rest}
              className={`block w-full px-4 py-2 mt-1 border rounded shadow-sm focus:outline-none  text-[#3c4d62] ${
                meta.error && meta.touched
                  ? 'border-red-500 focus:border-red-500 focus:shadow-error'
                  : 'focus:border-blue-500 border-[#dbdfea] focus:shadow-input'
              }`}
            />
          );
        }}
      </Field>

      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-600'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Textarea;
