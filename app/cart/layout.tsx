import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart products',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='mx-auto w-full max-w-[60rem] p-6'>{children}</section>
  );
}
