import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import DetailModal from '../../routes/users/DetailModal';
import { GoArrowBoth, GoArrowUp, GoArrowDown } from 'react-icons/go';
import { useGlobalContext } from '../../context/global';
import { UsersCols } from '../../routes/users/Columns';

const UserTable = ({ users }) => {
  const { detailModal, dispatch } = useGlobalContext();

  const data = useMemo(() => users, [users]);
  const columns = useMemo(() => UsersCols, []);

  const tableActions = (tableProps) => {
    tableProps.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'actions',
        disableSortBy: true,
        className: 'text-sm font-medium text-right',
        Cell: ({ row }) => (
          <>
            <button
              className='mr-2 text-blue-500 hover:text-blue-700'
              onClick={() =>
                dispatch('OPEN_DETAIL_MODAL', { id: row.original._id })
              }
            >
              Details
            </button>

            <button className='text-red-500 hover:text-red-700'>Delete</button>
          </>
        ),
      },
    ]);
  };
  
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      tableActions,
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
