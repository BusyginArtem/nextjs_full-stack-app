'use client';

import React, { useCallback, useState, useTransition } from 'react';
import type { Product as ProductType } from '../product-data';
import Product from '../components/Product';
import { useRouter } from 'next/navigation';

const ShoppingCartList = ({
  initialCartProducts,
}: {
  initialCartProducts: ProductType[];
}) => {
  const router = useRouter();

  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [isPending, startTransition] = useTransition();

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

    startTransition(() => {
      router.refresh();
    });
  }, []);

  return (
    <div className='flex flex-col items-start justify-center gap-4'>
      <h1>Shopping Cart</h1>

      <div className='grid w-full grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] grid-rows-[repeat(auto-fit,_300px)] gap-6'>
        {cartProducts.map((cartProduct) => (
          <Product
            key={cartProduct.id}
            product={cartProduct}
            isAddedToCart={true}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCartList;
