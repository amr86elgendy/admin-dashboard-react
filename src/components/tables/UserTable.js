import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import DetailModal from '../../routes/users/DetailModal';
import moment from 'moment';
import { GoArrowBoth, GoArrowUp, GoArrowDown } from 'react-icons/go';
import { useGlobalContext } from '../../context/global';

const UserTable = ({ users }) => {
  const { detailModal, dispatch } = useGlobalContext();

  const sortType = useMemo(
    () => (rowA, rowB, columnId) => {
      if (rowA?.original[columnId] > rowB?.original[columnId]) return 1;
      if (rowB?.original[columnId] > rowA?.original[columnId]) return -1;
      return 0;
    },
    []
  );

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        Header: 'name',
        align: 'left',
        disableSortBy: true,
        accessor: ({ _id, name }) => (
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
              <div className='text-sm text-gray-500'>{_id}</div>
            </div>
          </div>
        ),
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
      {
        id: 'expander',
        disableSortBy: true,
        className: 'text-sm font-medium text-right',
        accessor: ({ _id }) => {
          return (
            <>
              <button
                className='mr-2 text-blue-500 hover:text-blue-700'
                onClick={() => dispatch('OPEN_DETAIL_MODAL', { id: _id })}
              >
                Details
              </button>

              <button className='text-red-500 hover:text-red-700'>
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
                    {headers.map((column) => (
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
                    ))}
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
      <DetailModal
        open={detailModal.open}
        onClose={() => dispatch('CLOSE_DETAIL_MODAL')}
        id={detailModal.id}
      />
    </>
  );
};

export default UserTable;
