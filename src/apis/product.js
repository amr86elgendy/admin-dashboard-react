import axios from 'axios';
import { useQuery, useQueryClient, useMutation } from 'react-query';

export function useGetProducts() {
  return useQuery(
    'get-all-products',
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/products`
      );
      return data;
    },
    { staleTime: 30000 } // make new request after 30 second
  );
}

// ##########################################################

const createProduct = async ({ product, token }) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/products`,
    product,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation(createProduct, {
    onSuccess: () => queryClient.invalidateQueries('get-all-products'),
  });
}

// ##########################################################

export function useGetProduct(productId, enabled) {
  return useQuery(
    ['get-product', productId],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`
      );
      return data;
    },
    {
      enabled,
    }
  );
}

// ##########################################################

const updateProduct = async ({ productId, product, token }) => {
  const { data } = await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`,
    product,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => queryClient.invalidateQueries('get-all-products'),
  });
}

// ##########################################################

export const deleteProduct = async ({ productId, token }) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSettled: () => queryClient.invalidateQueries('get-all-products'),
  });
}

// ##########################################################

const uploadImage = async ({ formData, token }) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/products/uploadImage`,
    formData,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
export function useUploadImage() {
  return useMutation(uploadImage, { retry: false });
}
