export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import { Plus, Pencil, Check, X } from "lucide-react";
import { ConfirmDeleteForm } from "@/components/admin/confirm-delete-form";
import { toggleOfferActiveAction, deleteOfferAction } from "./actions";

export default async function AdminOffersPage() {
  await requireAdmin();

  const offers = await prisma.offer.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Special Offers</h1>
        <Link
          href="/admin/offers/new"
          className="inline-flex items-center gap-2 rounded-xl bg-cedar-brown px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cedar-espresso"
        >
          <Plus className="h-4 w-4" />
          Add Offer
        </Link>
      </div>

      {offers.length === 0 ? (
        <div className="rounded-xl border border-cedar-border bg-white p-12 text-center text-cedar-charcoal/60">
          <p>No special offers yet. Use the button above to add one.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-cedar-border bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-cedar-beige/30 text-cedar-charcoal border-b border-cedar-border">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Badge</th>
                  <th className="px-4 py-3 font-semibold">Valid Until</th>
                  <th className="px-4 py-3 font-semibold text-center">Active</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cedar-border/50">
                {offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-cedar-cream/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-cedar-espresso">{offer.title}</td>
                    <td className="px-4 py-3 text-cedar-charcoal/80">
                      {offer.badge && (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-cedar-caramel/15 text-cedar-brown text-xs font-semibold">
                          {offer.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-cedar-charcoal/80">
                      {offer.validUntil ? offer.validUntil.toLocaleDateString() : "Never"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <form action={toggleOfferActiveAction}>
                        <input type="hidden" name="id" value={offer.id} />
                        <input type="hidden" name="isActive" value={String(offer.isActive)} />
                        <button type="submit" className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${offer.isActive ? 'bg-cedar-green text-white' : 'bg-cedar-charcoal/20 text-cedar-charcoal/50'}`}>
                          {offer.isActive ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link href={`/admin/offers/${offer.id}/edit`} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-cedar-brown hover:bg-cedar-beige transition-colors">
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <ConfirmDeleteForm
                        id={offer.id}
                        action={deleteOfferAction}
                        message="Are you sure you want to delete this offer?"
                        label={`Delete ${offer.title}`}
                      />
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
