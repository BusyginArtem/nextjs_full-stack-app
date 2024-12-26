import Image from 'next/image';
import type { Product as ProductType } from '../product-data';
import Link from 'next/link';

type Props = {
  product: ProductType;
  onAddToCart?: (productId: string) => Promise<void>;
  onRemoveFromCart?: (productId: string) => Promise<void>;
  isAddedToCart: boolean;
};

const Product = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  isAddedToCart = false,
}: Props) => {
  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    onAddToCart?.(product.id);
  };

  const handleRemoveFromCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    onRemoveFromCart?.(product.id);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <article className='flex h-[18.75rem] flex-col justify-between rounded-lg p-6 shadow-lg transition-shadow hover:shadow-xl'>
        <Image
          src={`/${product.imageUrl}`}
          alt={`Product: ${product.name}`}
          width={100}
          height={100}
          className='h-[50%] w-full object-contain'
        />

        <div className='flex flex-col'>
          <h2 className='font-bold'>{product.name}</h2>
          <p className='font-semibold'>${product.price}</p>
        </div>

        {isAddedToCart ? (
          <button
            onClick={handleRemoveFromCart}
            type='button'
            className='me-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
          >
            <svg
              className='me-2 h-3.5 w-3.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 21'
            >
              <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
            </svg>
            Remove from cart
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            type='button'
            className='me-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            <svg
              className='me-2 h-3.5 w-3.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 21'
            >
              <path d='M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z' />
            </svg>
            Add to cart
          </button>
        )}
      </article>
    </Link>
  );
};

export default Product;
