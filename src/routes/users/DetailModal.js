import moment from 'moment';
import ReactDOM from 'react-dom';
import { IoClose } from 'react-icons/io5';
import { useGetUser } from '../../apis/user';
import Loader from '../../components/Loader';
import { useAuthContext } from '../../context/auth';

const DetailModal = ({ open, onClose, id }) => {
  const { token } = useAuthContext();
  const { data, isLoading } = useGetUser(id, token, open);

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
        className={`fixed z-40 w-full transition sm:-translate-x-1/2 -translate-y-1/2 sm:inline-block sm:max-w-2xl sm:px-4 sm:my-8 sm:align-middle top-1/2 sm:left-1/2 ${
          open
            ? 'opacity-100 md:scale-100 visible'
            : 'invisible opacity-0 md:scale-90'
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <div className='relative flex items-center w-full p-6 overflow-hidden bg-white shadow-2xl'>
            <button
              type='button'
              className='absolute text-gray-400 top-4 right-4 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6'
              onClick={onClose}
            >

              <IoClose className='w-6 h-6' aria-hidden='true' />
            </button>
            <div className='grid w-full grid-cols-1 gap-y-8 sm:gap-x-6 sm:grid-cols-12'>
              <div className='col-span-4 overflow-hidden rounded-lg bg-gray-10 sm:aspect-w-2'>
                <img
                  src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                  alt=''
                  className='object-cover object-center mx-8 sm:mx-0'
                />
              </div>
              <div className='mx-8 sm:col-span-8 sm:mx-0'>
                <h2 className='text-2xl font-extrabold text-gray-900 capitalize sm:pr-12'>
                  {data?.user?.name}
                </h2>

                <p className='mt-3 text-2xl text-gray-500'>
                  {data?.user?.email}
                </p>

                <p className='mt-3 text-2xl text-green-500'>
                  {data?.user?.role}
                </p>

                <div className='mt-4'>
                  <h4 className='uppercase'>id :</h4>
                  <div className='flex items-center'>
                    <div className='flex items-center'></div>
                    <p className=''>{data?.user?._id}</p>
                  </div>
                </div>
                <p className='mt-4'>
                  joined{' '}
                  <span className='inline-flex px-2 py-1 text-sm font-semibold leading-5 bg-purple-100 rounded-full text-primary'>
                    {moment(data?.user?.createdAt).fromNow()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>,
    document.getElementById('detail_modal')
  );
};

export default DetailModal;
