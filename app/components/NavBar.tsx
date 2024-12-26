'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
//
import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/constants';
import { NavLinkHref, NavLinkName } from '@/lib/types';

type NavLinkProps = {
  isActive: boolean;
  href: NavLinkHref;
  name: NavLinkName;
};

const NavLink = ({ name, href, isActive }: NavLinkProps) => (
  <Link
    className={cn('font-semibold text-gray-700 hover:text-black', {
      'font-bold text-black': isActive,
    })}
    href={href}
  >
    {name}
  </Link>
);

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='mx-auto flex h-16 w-full items-center justify-center bg-white shadow-md'>
      <ul className='flex space-x-8'>
        {navLinks.map((navLink) => (
          <li key={navLink.name}>
            <NavLink
              name={navLink.name}
              isActive={pathname === navLink.href}
              href={navLink.href}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
