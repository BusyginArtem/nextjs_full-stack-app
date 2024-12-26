import Link from 'next/link';

const NotFound = () => {
  return (
    <div>
      <h2>Product Not Found</h2>
      <p>Could not find requested product</p>
      <Link href='/products'>Return Products</Link>
    </div>
  );
};

export default NotFound;
