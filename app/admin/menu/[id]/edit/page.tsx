export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { MenuForm } from "@/components/admin/menu-form";
import { notFound } from "next/navigation";

export default async function EditMenuItemPage({
  params,
}: {
  params: { id: string };
}) {
  await requireAdmin();

  const [categories, item] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.menuItem.findUnique({ where: { id: params.id } }),
  ]);

  if (!item) {
    notFound();
  }

  // Need to strip nulls to empty strings for the form, or map appropriately
  const initialData = {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    categoryId: item.categoryId,
    itemType: item.itemType,
    imageUrl: item.imageUrl || "",
    isAvailable: item.isAvailable,
    isFeatured: item.isFeatured,
    sortOrder: item.sortOrder,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Edit Menu Item</h1>
      <MenuForm categories={categories} initialData={initialData} />
    </div>
  );
}
