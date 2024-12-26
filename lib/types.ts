import { navLinks } from './constants';

export type NavLinkName = (typeof navLinks)[number]['name'];
export type NavLinkHref = (typeof navLinks)[number]['href'];
