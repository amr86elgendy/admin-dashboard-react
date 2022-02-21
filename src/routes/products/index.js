import { Link } from 'react-router-dom';
import Table from '../../components/tables/ProductTable';
import { FaPlus } from 'react-icons/fa';
import { useGetProducts } from '../../apis/product';
import Loader from '../../components/Loader';
import Filters from './Filters';

const Index = () => {
  const { isLoading, isError, data: productsData, error } = useGetProducts();
  // return <Loader />
  if (isError) return <h1>{error.response.data}</h1>;

  return (
    <section className='min-h-[calc(100vh-56px)] p-6 bg-gray-50'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <nav className='flex items-center justify-between py-4 mb-8 md:px-8'>
            <h2 className='uppercase text-[#364a63]'>
              Product list
            </h2>
            <Filters />
            <Link to='/products/create'>
              <button className='btn'>
                <FaPlus className='mr-2' /> Create Product
              </button>
            </Link>
          </nav>
          <Table products={productsData?.products} />
        </>
      )}
    </section>
  );
};

export default Index;
