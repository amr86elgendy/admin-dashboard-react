import { ErrorMessage, FieldArray } from 'formik';
import { useRef } from 'react';
import { FaTrash, FaUpload } from 'react-icons/fa';
import { useUploadImage } from '../../apis/product';
import { useAuthContext } from '../../context/auth';
import { ImSpinner8 } from 'react-icons/im';

const Upload = ({ label, name, ...rest }) => {
  const { token } = useAuthContext();
  const inputFile = useRef(null);
  const { mutate: uploadImage, isError, error, isLoading } = useUploadImage();

  return (
    <div className='col-span-6 lg:col-span-6'>
      <label
        htmlFor={name}
        className='block mb-2 text-sm font-medium capitalize text-secondary'
      >
        {name}
      </label>
      <FieldArray name={name}>
        {(props) => {
          const images = props.form.values.images;

          const handleChange = async (e) => {
            const imageFile = e.target.files[0];
            console.log(imageFile);
            const formData = new FormData();
            formData.append('image', imageFile);
            uploadImage(
              { formData, token },
              {
                onSettled: () => props.form.setFieldTouched(name),
                onSuccess: ({ image }) => props.push(image),
              }
            );
          };

          return (
            <div className='flex'>
              {images.map((img, i) => (
                <div className='relative w-24 h-20 mx-2 group' key={i}>
                  <img
                    src={img}
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
                {isLoading ? (
                  <ImSpinner8 className='mx-auto animate-spin' size={25} />
                ) : (
                  <FaUpload />  
                )}
                upload
              </button>
            </div>
          );
        }}
      </FieldArray>
      {isError && <div className='text-red-600'>{error.response.data.msg}</div>}
      <ErrorMessage name={name}>
        {(msg) => <div className='text-red-600'>{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default Upload;
