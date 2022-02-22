import moment from 'moment';
import { sortType } from '../../tools';

export const UsersCols = [
  {
    Header: 'name',
    align: 'left',
    disableSortBy: true,
    accessor: ({ email, name }) => (
      <div className='flex items-center'>
        <div className='flex-shrink-0 w-10 h-10'>
          <img
            className='w-10 h-10 rounded-full'
            src='https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            alt={name}
          />
        </div>
        <div className='ml-4'>
          <div className='text-sm font-medium text-gray-900'>{name}</div>
          <div className='text-sm text-gray-500'>{email}</div>
        </div>
      </div>
    ),
    Filter: (props) => {
      console.log(props);
    }
  },
  {
    Header: 'orders',
    accessor: 'orders',
  },
  {
    Header: 'messages',
    accessor: 'messages',
  },
  {
    Header: 'reviews',
    accessor: 'reviews',
    className: 'text-center',
  },
  {
    Header: 'createdAt',
    accessor: ({ createdAt }) => (
      <span className='inline-flex px-2 py-1 text-sm font-semibold leading-5 bg-purple-100 rounded-full text-primary'>
        {moment(createdAt).fromNow()}
      </span>
    ),
    className: 'text-center',
    sortType,
  },
];
