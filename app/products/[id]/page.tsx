import NotFoundPage from '@/app/products/[id]/not-found';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${params.id}`
  );
  const product = await response.json();

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <article className='flex flex-col justify-start gap-4 md:flex-row'>
      <div className='mb-4 flex flex-row justify-center md:mb-0 md:w-1/2'>
        <Image
          src={`/${product.imageUrl}`}
          alt={product.description}
          width={200}
          height={200}
          className='w-1/2 md:w-full'
        />
      </div>
      <div className='flex flex-col justify-start gap-8 md:w-1/2'>
        <h1 className='text-4xl font-bold'>{product.name}</h1>
        <p className='text-2xl text-gray-500'>${product.price}</p>
        <h3 className='mb-[-1.5rem] text-2xl font-semibold'>Description: </h3>
        <p className='text-gray-700'>{product.description}</p>
      </div>
    </article>
  );
};

export default ProductDetail;
