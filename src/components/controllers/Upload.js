import { ErrorMessage, FieldArray } from 'formik';
import { useRef } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { useUploadImage } from '../../functions/product';

const Upload = ({ label, name, ...rest }) => {
  const inputFile = useRef(null);
  const { mutate: uploadImage } = useUploadImage();
  return (
    <div className='col-span-6 lg:col-span-6'>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium capitalize text-[#344357]'
      >
        {name}
      </label>
      <FieldArray name={name}>
        {(props) => {
          const images = props.form.values.images;

          const handleChange = async (e) => {
            const imageFile = e.target.files[0];
            const formData = new FormData();
            formData.append('image', imageFile);
            uploadImage(formData, {
              onSuccess: ({ image }) => props.push(image),
            });
          };

          return (
            <div className='flex'>
              {images.map((img, i) => (
                <div className='relative w-24 h-20 mx-2 group' key={i}>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}${img}`}
                    alt=''
                    srcSet=''
                    className='w-full h-full group-hover:opacity-50'
                  />
                  <button
                    type='button'
                    className='absolute z-20 hidden top-1/2 right-1/2 translate-x-1/2 group-hover:block text-[#223260] -translate-y-1/2'
                    onClick={() => props.remove(i)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <input
                type='file'
                onChange={handleChange}
                ref={inputFile}
                hidden
              />
              <button
                type='button'
                className='flex flex-col items-center justify-center w-20 h-20 border-4 border-dashed appearance-none'
                onClick={() => inputFile.current.click()}
              >
                <FaUpload /> Upload
              </button>
            </div>
          );
        }}
      </FieldArray>
      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-600'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Upload;
