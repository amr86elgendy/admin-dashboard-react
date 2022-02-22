import { Link } from 'react-router-dom';
import Table from '../../components/tables/ProductTable';
import { FaPlus } from 'react-icons/fa';
import { useGetProducts } from '../../apis/product';
import Loader from '../../components/Loader';
import Filters from './Filters';
import { useGlobalContext } from '../../context/global';
import DeleteModal from '../../routes/products/DeleteModal';
import { productsCols } from '../../routes/products/Columns';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import { useMemo } from 'react';
import { globalFilter } from '../../tools'

const Index = () => {
  const { isLoading, isError, data: productsData, error } = useGetProducts();

  const { deleteModal, dispatch } = useGlobalContext();

  const data = useMemo(() => productsData?.products, [productsData]);
  const columns = useMemo(() => productsCols, []);

  const tableActions = (tableProps) => {
    tableProps.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'actions',
        disableSortBy: true,
        className: 'text-sm font-medium text-right',
        Cell: ({ row }) => (
          <>
            <Link to={`/products/update/${row.original._id}`}>
              <button className='mr-2 text-blue-500 hover:text-blue-700'>
                Edit
              </button>
            </Link>
            <button
              className='text-red-500 hover:text-red-700'
              onClick={() =>
                dispatch('OPEN_DELETE_MODAL', { id: row.original._id })
              }
            >
              Delete
            </button>
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
      initialState: {
        openModal: (id) => dispatch('OPEN_DELETE_MODAL', { id }),
      },
      globalFilter,
    },
    useGlobalFilter,
    tableActions,
    useSortBy
  );

  if (isError) return <h1>{error.response.data}</h1>;
  return (
    <section className='min-h-[calc(100vh-56px)] p-6 bg-gray-50'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className='flex items-center justify-between py-4 mb-8 md:px-8'>
            <h2 className='uppercase text-[#364a63]'>Product list</h2>
            <Filters
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <Link to='/products/create'>
              <button className='btn'>
                <FaPlus className='mr-2' /> Create Product
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
          <DeleteModal
            open={deleteModal.open}
            onClose={() => dispatch('CLOSE_DELETE_MODAL')}
            id={deleteModal.id}
          />
        </>
      )}
    </section>
  );
};

export default Index;
