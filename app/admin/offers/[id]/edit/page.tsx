export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { OfferForm } from "@/components/admin/offer-form";
import { notFound } from "next/navigation";

export default async function EditOfferPage({
  params,
}: {
  params: { id: string };
}) {
  const offer = await prisma.offer.findUnique({
    where: { id: params.id },
  });

  if (!offer) {
    notFound();
  }

  const initialData = {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    badge: offer.badge || "",
    imageUrl: offer.imageUrl || "",
    isActive: offer.isActive,
    validUntil: offer.validUntil ? offer.validUntil.toISOString().split("T")[0] : "",
    sortOrder: offer.sortOrder,
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Edit Offer</h1>
      <OfferForm initialData={initialData} />
    </div>
  );
}
