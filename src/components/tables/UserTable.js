import { useState } from 'react';
import DetailModal from '../../routes/users/Details';
import moment from 'moment';

const UserTable = ({ users }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [id, setId] = useState(null);

  return (
    <>
      <div className='flex flex-col mb-8'>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                    >
                      Orders
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                    >
                      Messages
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                    >
                      Reviews
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                    >
                      Created At
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users.map((user) => (
                    <tr key={user._id}>
                      {/* name & Image & id */}
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='flex-shrink-0 w-10 h-10'>
                            <img
                              className='w-10 h-10 rounded-full'
                              src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
                              alt={user.name}
                            />
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {user.name}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {user._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* Number Of Orders */}
                      <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                        {user.numberOfOrders}
                      </td>
                      {/* Number Of Messages */}
                      <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                        {user.numberOfMessages}
                      </td>
                      {/* Number Of Reviews */}
                      <td className='px-6 py-4 text-center whitespace-nowrap'>
                        <div className='text-gray-900'>
                          {user.numberOfReviews}
                        </div>
                      </td>
                      {/* Created At */}
                      <td className='px-6 py-4 text-center whitespace-nowrap'>
                        <span className='inline-flex px-2 py-1 text-sm font-semibold leading-5 bg-purple-100 rounded-full text-primary'>
                          {moment(user.createdAt).fromNow()}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                        <button
                          className='mr-2 text-blue-500 hover:text-blue-700'
                          onClick={() => {
                            setOpenDetailModal(true);
                            setId(user._id)
                          }}
                        >
                          Details
                        </button>

                        <button className='text-red-500 hover:text-red-700'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        id={id}
      />
    </>
  );
};

export default UserTable;
