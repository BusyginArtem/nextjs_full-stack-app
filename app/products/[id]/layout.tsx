import { products } from '@/app/product-data';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  // fetch data
  const product = products.find((product) => product.id === id);

  if (product) {
    return {
      title: product.name,
      description: product.description,
    };
  }

  return {
    title: 'Not Found',
    description: '',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
