import {
  LayoutDashboard,
  UtensilsCrossed,
  Tag,
  Gift,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const adminNavItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Menu', href: '/admin/menu', icon: UtensilsCrossed },
  { label: 'Categories', href: '/admin/categories', icon: Tag },
  { label: 'Offers', href: '/admin/offers', icon: Gift },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];
