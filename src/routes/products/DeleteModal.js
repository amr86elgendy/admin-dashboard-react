import ReactDOM from 'react-dom';
import { useDeleteProduct } from '../../apis/product';
import { useAuthContext } from '../../context/auth';
import { BsShieldFillExclamation } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';

const DeleteModal = ({ open, onClose, id }) => {
  const { token } = useAuthContext();
  const { mutate: deleteProduct, isLoading } = useDeleteProduct();

  return ReactDOM.createPortal(
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity ease-in-out duration-200 ${
          open ? 'opacity-100 visible' : 'invisible opacity-0'
        }`}
        style={{ backgroundColor: 'rgba(0,0,0,.7)' }}
        onClick={onClose}
      ></div>
      <div
        className={`fixed z-40 inline-block overflow-hidden text-left align-bottom transition-all bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 mx-3 ${
          open
            ? 'opacity-100 md:scale-100 visible'
            : 'invisible opacity-0 md:scale-90'
        }`}
      >
        <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
          <div className='sm:flex sm:items-start'>
            <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
              <BsShieldFillExclamation
                className='w-6 h-6 text-red-600'
                aria-hidden='true'
              />
            </div>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Delete Product
              </h3>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Are you sure you want to delete your account? All of your data
                  will be permanently removed. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
          <button
            type='button'
            className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={() =>
              deleteProduct(
                { productId: id, token },
                {
                  onSuccess: () => {
                    onClose();
                    // display toast
                  },
                  onError: (err) => console.log(err.response.data),
                }
              )
            }
          >
            {isLoading ? (
              <ImSpinner8 className='mx-1 text-xl animate-spin' />
            ) : (
              'Delete'
            )}
          </button>
          <button
            type='button'
            className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById('delete_modal')
  );
};

export default DeleteModal;
