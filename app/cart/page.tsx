import ShoppingCartList from './ShoppingCartList';

export const dynamic = 'force-dynamic';

const Cart = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/1/cart`,
    {
      cache: 'no-store',
    }
  );
  const cartProducts = await response.json();

  return <ShoppingCartList initialCartProducts={cartProducts} />;
};

export default Cart;
