'use client';

import { useCallback, useState } from 'react';
import type { Product as ProductType } from '../product-data';
import Product from './Product';

type Props = {
  products: ProductType[];
  initialCartProducts: ProductType[];
};

const ProductList = ({ products, initialCartProducts = [] }: Props) => {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  const addToCart = useCallback(async function (productId: string) {
    const cartResponse = await fetch(`/api/users/1/cart`, {
      method: 'POST',
      body: JSON.stringify({
        productId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const updatedCartProducts = await cartResponse.json();

    setCartProducts(updatedCartProducts);
  }, []);

  const removeFromCart = useCallback(async function (productId: string) {
    const cartResponse = await fetch(`/api/users/1/cart`, {
      method: 'DELETE',
      body: JSON.stringify({
        productId,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const updatedCartProducts = await cartResponse.json();

    setCartProducts(updatedCartProducts);
  }, []);

  return (
    <div className='grid w-full grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] grid-rows-[repeat(auto-fit,_300px)] gap-6'>
      {products.map((product) => {
        const isProductInCart = cartProducts.some(
          (cartProduct) => cartProduct.id === product.id
        );

        return (
          <Product
            key={product.id}
            product={product}
            isAddedToCart={isProductInCart}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
};

export default ProductList;