import type { Metadata } from 'next';
import AdminShell from '@/components/admin/admin-shell';

export const metadata: Metadata = {
  title: 'Admin | Deodar-Brew',
  description: 'Deodar-Brew admin dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
