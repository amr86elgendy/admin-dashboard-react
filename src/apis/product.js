import { useQuery, useQueryClient, useMutation } from 'react-query';

export function useGetProducts() {
  return useQuery('get-all-products', () =>
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`).then((res) =>
      res.json()
    )
  );
}

// ##########################################################

const createProduct = async (product) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  return await res.json();
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
    'get-product',
    () =>
      fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`
      ).then((res) => res.json()),
    {
      enabled,
    }
  );
}

// ##########################################################

const updateProduct = async (obj) => {
  console.log(obj.product);
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/products/${obj.productId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj.product),
    }
  );
  return await res.json();
};

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => queryClient.invalidateQueries('get-all-products'),
  });
}

// ##########################################################

export const deleteProduct = async (productId) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return await res.json();
};
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSettled: () => queryClient.invalidateQueries('get-all-products'),
  });
}

// ##########################################################

const uploadImage = async (formData) => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/api/products/uploadImage`,
    {
      method: 'POST',
      body: formData,
    }
  );
  return await res.json();
};
export function useUploadImage() {
  return useMutation(uploadImage);
}
