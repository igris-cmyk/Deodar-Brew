export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MenuForm } from "@/components/admin/menu-form";

export default async function NewMenuItemPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Add Menu Item</h1>
      <MenuForm categories={categories} />
    </div>
  );
}
