import React from 'react'
import { sortType } from '../../tools'

export const productsCols = [
  {
    Header: 'name',
    align: 'left',
    disableSortBy: true,
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
    sortType,
  },
  {
    Header: 'sold',
    accessor: ({ sold }) => (
      <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
        {sold}
      </span>
    ),
    className: 'text-center',
    sortType,
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
];