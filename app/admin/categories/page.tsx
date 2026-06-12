export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { CategoriesClient } from "@/components/admin/categories-client";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { items: true }
      }
    },
    orderBy: { sortOrder: "asc" },
  });

  return <CategoriesClient categories={categories} />;
}
