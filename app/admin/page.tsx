export const dynamic = "force-dynamic";
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import {
  UtensilsCrossed,
  Tag,
  Gift,
  Star,
  ArrowRight,
} from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ label, value, icon, href }: StatCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl border border-cedar-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cedar-beige text-cedar-brown">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-cedar-charcoal/70">{label}</p>
        <p className="text-2xl font-bold text-cedar-espresso">{value}</p>
      </div>
      <ArrowRight className="h-5 w-5 text-cedar-charcoal/30 transition-transform group-hover:translate-x-1 group-hover:text-cedar-brown" />
    </Link>
  );
}

export default async function AdminDashboardPage() {
  await requireAdmin();

  const [totalItems, availableItems, activeOffers, featuredItems] =
    await Promise.all([
      prisma.menuItem.count(),
      prisma.menuItem.count({ where: { isAvailable: true } }),
      prisma.offer.count({ where: { isActive: true } }),
      prisma.menuItem.count({ where: { isFeatured: true } }),
    ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold text-cedar-espresso lg:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-cedar-charcoal/70">
          Welcome back! Here&apos;s an overview of your cafe.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Menu Items"
          value={totalItems}
          icon={<UtensilsCrossed className="h-6 w-6" />}
          href="/admin/menu"
        />
        <StatCard
          label="Available Items"
          value={availableItems}
          icon={<Tag className="h-6 w-6" />}
          href="/admin/menu"
        />
        <StatCard
          label="Active Offers"
          value={activeOffers}
          icon={<Gift className="h-6 w-6" />}
          href="/admin/offers"
        />
        <StatCard
          label="Featured Items"
          value={featuredItems}
          icon={<Star className="h-6 w-6" />}
          href="/admin/menu"
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/menu/new"
          className="rounded-xl border border-dashed border-cedar-border bg-white p-6 text-center transition-colors hover:border-cedar-caramel hover:bg-cedar-cream/50"
        >
          <UtensilsCrossed className="mx-auto mb-2 h-8 w-8 text-cedar-caramel" />
          <p className="font-medium text-cedar-espresso">Add Menu Item</p>
          <p className="mt-1 text-sm text-cedar-charcoal/60">
            Add a new dish or beverage
          </p>
        </Link>

        <Link
          href="/admin/categories"
          className="rounded-xl border border-dashed border-cedar-border bg-white p-6 text-center transition-colors hover:border-cedar-caramel hover:bg-cedar-cream/50"
        >
          <Tag className="mx-auto mb-2 h-8 w-8 text-cedar-caramel" />
          <p className="font-medium text-cedar-espresso">Manage Categories</p>
          <p className="mt-1 text-sm text-cedar-charcoal/60">
            Organize your menu
          </p>
        </Link>

        <Link
          href="/admin/offers/new"
          className="rounded-xl border border-dashed border-cedar-border bg-white p-6 text-center transition-colors hover:border-cedar-caramel hover:bg-cedar-cream/50"
        >
          <Gift className="mx-auto mb-2 h-8 w-8 text-cedar-caramel" />
          <p className="font-medium text-cedar-espresso">Create Offer</p>
          <p className="mt-1 text-sm text-cedar-charcoal/60">
            Add a new promotion
          </p>
        </Link>
      </div>
    </div>
  );
}
