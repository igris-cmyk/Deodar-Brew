export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { toggleAvailabilityAction, toggleFeaturedAction, deleteMenuItemAction } from "./actions";

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Menu Items</h1>
        <Link
          href="/admin/menu/new"
          className="inline-flex items-center gap-2 rounded-xl bg-cedar-brown px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cedar-espresso"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-cedar-border bg-white p-12 text-center text-cedar-charcoal/60">
          <p>Nothing here yet. Use the button above to add your first item.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-cedar-border bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cedar-beige/30 text-cedar-charcoal border-b border-cedar-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold text-center">Available</th>
                  <th className="px-4 py-3 font-semibold text-center">Featured</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cedar-border/50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-cedar-cream/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-cedar-espresso">{item.name}</td>
                    <td className="px-4 py-3 text-cedar-charcoal/80">{item.category.name}</td>
                    <td className="px-4 py-3 text-cedar-charcoal/80">₹{item.price}</td>
                    <td className="px-4 py-3 text-cedar-charcoal/80">{item.itemType}</td>
                    <td className="px-4 py-3 text-center">
                      <form action={toggleAvailabilityAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="isAvailable" value={String(item.isAvailable)} />
                        <button type="submit" className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${item.isAvailable ? 'bg-cedar-green text-white' : 'bg-cedar-charcoal/20 text-cedar-charcoal/50'}`}>
                          {item.isAvailable ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <form action={toggleFeaturedAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <input type="hidden" name="isFeatured" value={String(item.isFeatured)} />
                        <button type="submit" className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${item.isFeatured ? 'bg-cedar-caramel text-white' : 'bg-cedar-charcoal/20 text-cedar-charcoal/50'}`}>
                          {item.isFeatured ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link href={`/admin/menu/${item.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-cedar-brown hover:bg-cedar-beige transition-colors">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={deleteMenuItemAction} className="inline-block" onSubmit={(e) => { if(!confirm('Are you sure you want to delete this item?')) e.preventDefault(); }}>
                        <input type="hidden" name="id" value={item.id} />
                        <button type="submit" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
