import { Link } from 'react-router-dom';
import { useDeleteProduct } from '../../functions/product';

const ProductTable = ({ products }) => {
  const { mutate: deleteProduct } = useDeleteProduct();

  return (
    <div className='flex flex-col mb-8'>
      <div className='-my-2 overflow-x-auto'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-100'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Brand
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Category
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Quantity
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Sold
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase'
                  >
                    Number Of Reviews
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {products.map((product) => (
                  <tr key={product._id}>
                    {/* name & Image & id */}
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex items-center'>
                        <div className='flex-shrink-0 w-10 h-10'>
                          <img
                            className='w-10 h-10 rounded-full'
                            src={`${process.env.REACT_APP_SERVER_URL}${product.images[0]}`}
                            alt={product.name}
                          />
                        </div>
                        <div className='ml-4'>
                          <div className='text-sm font-medium text-gray-900'>
                            {product.name}
                          </div>
                          <div className='text-sm text-gray-500'>
                            {product._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Brand */}
                    <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                      {product.brand}
                    </td>
                    {/* Category */}
                    <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                      {product.category}
                    </td>
                    {/* Quantity */}
                    <td className='px-6 py-4 text-center whitespace-nowrap'>
                      <div className='text-gray-900'>{product.quantity}</div>
                      <span className='inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full'>
                        in Stock
                      </span>
                    </td>
                    {/* Sold */}
                    <td className='px-6 py-4 text-center whitespace-nowrap'>
                      <span className='inline-flex px-2 font-semibold leading-5 text-green-800 bg-purple-100 rounded-full'>
                        {product.sold}
                      </span>
                    </td>
                    {/* Price */}
                    <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                      {product.price}
                    </td>
                    {/* Number Of Reviews */}
                    <td className='px-6 py-4 text-center text-gray-500 whitespace-nowrap'>
                      {product.numReviews}
                    </td>
                    {/* Actions */}
                    <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <Link to={`/products/update/${product._id}`}>
                        <button className='mr-2 text-blue-500 hover:text-blue-700'>
                          Edit
                        </button>
                      </Link>
                      <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => deleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
