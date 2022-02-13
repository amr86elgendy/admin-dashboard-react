import { Link, useParams, useNavigate } from 'react-router-dom';
import { brands, categories, colors, sizes } from '../../constants/data';
import FormikContainer from '../../components/FormikContainer';
import FormControl from '../../components/FormControl';
import {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct,
} from '../../apis/product';
import { useAuthContext } from '../../context/auth';
import Loader from '../../components/Loader';

const ProductForm = () => {
  const { token } = useAuthContext();
  const params = useParams();
  const navigate = useNavigate();
  const productId = params['*'].split('/')[1];

  const { mutate: createProduct } = useCreateProduct();

  const { data: updatedData, isLoading } = useGetProduct(
    productId,
    params['*'].startsWith('update')
  );
  // console.log(updatedData, productId);
  const { mutate: updateProduct } = useUpdateProduct();

  const initialValues = {
    name: '',
    brand: '',
    category: '',
    description: '',
    colors: [],
    sizes: [],
    images: [],
    price: '',
    quantity: '',
    freeShipping: false,
    featured: false,
  };
  const validate = (values) => {
    const errors = {};
    const keys = Object.keys(values);
    for (let key of keys) {
      if (values[key] === '' || values[key].length === 0) {
        errors[key] = `${key} is required`;
      }
    }
    return errors;
  };

  const customizeValues = (product) => {
    if (product) {
      const initialProduct = {};
      const fields = Object.keys(initialValues);
      Object.entries(product || {}).map(([key, value]) =>
        fields.includes(key) ? (initialProduct[key] = value) : null
      );
      return initialProduct;
    }
    return initialValues;
  };

  const handleSubmit = (values, submitProps) => {
    if (productId) {
      updateProduct(
        { productId, product: values, token },
        {
          onSuccess: () => navigate('/products'),
          onError: (err) => console.log(err.response.data),
        }
      );
    } else {
      createProduct(
        { product: values, token },
        {
          onSuccess: () => navigate('/products'),
          onError: (err) => console.log(err.response.data),
        }
      );
    }
  };

  return (
    <div className='bg-[#f8f8fb]'>
      <div className='pt-6 pl-10'>
        <Link to='/products'>
          <button className='capitalize btn'>back to products</button>
        </Link>
      </div>
      <div className='px-4 overflow-hidden sm:px-0'>
        <div className='bg-white w-full px-4 py-5 m-auto my-8 border sm:p-6 sm:w-8/12 order-[#dbdfea] shadow-card'>
          {isLoading ? (
            <Loader />
          ) : (
            <FormikContainer
              initialValues={customizeValues(updatedData?.product)}
              validate={validate}
              onSubmit={handleSubmit}
              title='product form'
            >
              <FormControl
                control='input'
                type='text'
                label='Name'
                name='name'
                span='3'
              />
              <FormControl
                control='select'
                label='Brands'
                name='brand'
                options={brands}
              />
              <FormControl
                control='textarea'
                label='Description'
                name='description'
              />
              <FormControl
                control='select'
                label='Category'
                name='category'
                options={categories}
              />
              <FormControl
                control='input'
                type='number'
                label='Price'
                name='price'
                span='3'
              />
              <FormControl
                control='input'
                type='number'
                label='Quantity'
                name='quantity'
                span='3'
              />
              <FormControl
                control='checkbox'
                label='Colors'
                name='colors'
                options={colors}
              />
              <FormControl
                control='checkbox'
                label='Sizes'
                name='sizes'
                options={sizes}
              />
              <FormControl
                control='radio'
                label='Free Shipping'
                name='freeShipping'
              />
              <FormControl control='radio' label='Featured' name='featured' />
              <FormControl control='upload' label='Images' name='images' />
            </FormikContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
