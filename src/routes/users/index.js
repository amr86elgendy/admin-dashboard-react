import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useGetUsers } from '../../apis/user';
import Table from '../../components/tables/UserTable';
import { useAuthContext } from '../../context/auth';
import Loader from '../../components/Loader';
import { useGlobalContext } from '../../context/global';
import { UsersCols } from '../../routes/users/Columns';
import { useMemo } from 'react';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import DetailModal from '../../routes/users/DetailModal';
import Filters from '../products/Filters';
import { globalFilter } from '../../tools';

const UsersList = () => {
  const { token } = useAuthContext();
  const { isLoading, isError, data: usersData, error } = useGetUsers(token);

  const { detailModal, dispatch } = useGlobalContext();

  const data = useMemo(() => usersData?.users, [usersData]);
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

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: data || [],
      globalFilter,
    },
    useGlobalFilter,
    tableActions,
    useSortBy
  );
// console.log(globalFilter);
  if (isError) return <h1>{error.response.data}</h1>;
  return (
    <section className='h-[calc(100vh-56px)] p-6 bg-gray-50'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className='flex items-center justify-between py-4 mb-8 md:px-8'>
            <h2 className='uppercase text-[#364a63]'>users list</h2>
            <Filters
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <Link to='/users/create'>
              <button className='btn'>
                <FaPlus className='mr-2' /> add user
              </button>
            </Link>
          </nav>
          <Table
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headers={headers}
            prepareRow={prepareRow}
            rows={rows}
          />
          <DetailModal
            open={detailModal.open}
            onClose={() => dispatch('CLOSE_DETAIL_MODAL')}
            id={detailModal.id}
          />
        </>
      )}
    </section>
  );
};

export default UsersList;
