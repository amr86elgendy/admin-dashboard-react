import { Link } from 'react-router-dom';

export const productsCols = [
  {
    Header: 'name',
    accessor: ({ _id, images, name }) => (
      <div className='flex items-center'>
        <div className='flex-shrink-0 w-10 h-10'>
          <img className='w-10 h-10 rounded-full' src={images[0]} alt={name} />
        </div>
        <div className='ml-4'>
          <div className='text-sm font-medium text-gray-900'>{name}</div>
          <div className='text-sm text-gray-500'>{_id}</div>
        </div>
      </div>
    ),
  },
  {
    Header: 'brand',
    accessor: 'brand',
    className: 'text-center text-gray-500',
  },
  {
    Header: 'category',
    accessor: 'category',
    className: 'text-center text-gray-500',
  },
  {
    Header: 'quantity',
    accessor: ({ quantity }) => (
      <>
        <div className='text-gray-900'>{quantity}</div>
        <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
          in Stock
        </span>
      </>
    ),
    className: 'text-center',
  },
  {
    Header: 'sold',
    accessor: ({ sold }) => (
      <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
        {sold}
      </span>
    ),
    className: 'text-center',
  },
  {
    Header: 'price',
    accessor: 'price',
    className: 'text-center text-gray-500',
  },
  {
    Header: 'reviews',
    accessor: 'numReviews',
    className: 'text-center text-gray-500',
  },
  {
    id: 'expander',
    className: 'text-sm font-medium text-right',
    accessor: ({ _id }, ) => (
      <>
        <Link to={`/products/update/${_id}`}>
          <button className='mr-2 text-blue-500 hover:text-blue-700'>
            Edit
          </button>
        </Link>
        <button
          className='text-red-500 hover:text-red-700'
          // onClick={() => {
          //   setOpenDeleteModal(true);
          //   setId(_id);
          // }}
        >
          Delete
        </button>
      </>
    ),
  },
];
