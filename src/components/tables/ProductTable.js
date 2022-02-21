import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import { useGlobalContext } from '../../context/global';
import DeleteModal from '../../routes/products/DeleteModal';
import { GoArrowBoth, GoArrowUp, GoArrowDown } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ProductTable = ({ products }) => {
  const { deleteModal, dispatch } = useGlobalContext();

  const sortType = useMemo(() => (rowA, rowB, columnId) => {
    if (rowA?.original[columnId] > rowB?.original[columnId]) return 1;
    if (rowB?.original[columnId] > rowA?.original[columnId]) return -1;
    return 0;
  }, []);

  const data = useMemo(() => products, [products]);
  const columns = useMemo(
    () => [
      {
        Header: 'name',
        align: 'left',
        disableSortBy: true,
        accessor: ({ _id, images, name }) => (
          <div className='flex items-center'>
            <div className='flex-shrink-0 w-10 h-10'>
              <img
                className='w-10 h-10 rounded-full'
                src={images[0]}
                alt={name}
              />
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
      {
        id: 'expander',
        disableSortBy: true,
        className: 'text-sm font-medium text-right',
        accessor: ({ _id }) => {
          return (
            <>
              <Link to={`/products/update/${_id}`}>
                <button className='mr-2 text-blue-500 hover:text-blue-700'>
                  Edit
                </button>
              </Link>
              <button
                className='text-red-500 hover:text-red-700'
                onClick={() => dispatch('OPEN_DELETE_MODAL', { id: _id })}
              >
                Delete
              </button>
            </>
          );
        },
      },
    ],
    [dispatch, sortType]
  );

  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          openModal: (id) => dispatch('OPEN_DELETE_MODAL', { id }),
        },
      },
      useSortBy
    );

  return (
    <>
      <div className='flex flex-col mb-8'>
        <div className='-my-2 overflow-x-auto'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
              <table
                className='min-w-full divide-y divide-gray-200'
                {...getTableProps()}
              >
                {/* Table Header */}
                <thead className='bg-gray-100'>
                  <tr>
                    {headers.map((column) => {
                      // console.log(column);
                      return (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className={`px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase whitespace-nowrap text-${
                            column.align || 'center'
                          }`}
                        >
                          {column.render('Header')}
                          {
                            <span>
                              {column.canSort ? (
                                column.isSorted ? (
                                  column.isSortedDesc ? (
                                    <GoArrowDown
                                      className='inline mx-2'
                                      size={18}
                                    />
                                  ) : (
                                    <GoArrowUp
                                      className='inline mx-2'
                                      size={18}
                                    />
                                  )
                                ) : (
                                  <GoArrowBoth
                                    className='inline mx-2'
                                    size={18}
                                  />
                                )
                              ) : (
                                ''
                              )}
                            </span>
                          }
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody
                  {...getTableBodyProps()}
                  className='bg-white divide-y divide-gray-200'
                >
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          const { className } = cell.column;
                          // console.log(cell);
                          return (
                            <td
                              {...cell.getCellProps()}
                              className={`px-6 py-4 whitespace-nowrap ${className}`}
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        open={deleteModal.open}
        onClose={() => dispatch('CLOSE_DELETE_MODAL')}
        id={deleteModal.id}
      />
    </>
  );
};

export default ProductTable;
