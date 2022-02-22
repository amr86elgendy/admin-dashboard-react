import { GoArrowBoth, GoArrowUp, GoArrowDown } from 'react-icons/go';

const UserTable = ({
  getTableProps,
  getTableBodyProps,
  headers,
  prepareRow,
  rows,
}) => {
  return (
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
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
                                <GoArrowUp className='inline mx-2' size={18} />
                              )
                            ) : (
                              <GoArrowBoth className='inline mx-2' size={18} />
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
  );
};

export default UserTable;
