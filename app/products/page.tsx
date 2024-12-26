import React from 'react';
import ProductList from '../components/ProductList';

export const dynamic = 'force-dynamic';

const Products = async () => {
  const productResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products`
  );
  const products = await productResponse.json();

  const cartResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`
  );
  const cartProducts = await cartResponse.json();

  return (
    <div className='flex flex-col items-start justify-center gap-4'>
      <h2 className=''>Products</h2>

      <ProductList products={products} initialCartProducts={cartProducts} />
    </div>
  );
};

export default Products;
