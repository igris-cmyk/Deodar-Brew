export const dynamic = "force-dynamic";
import { OfferForm } from "@/components/admin/offer-form";

export default function NewOfferPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Add Offer</h1>
      <OfferForm />
    </div>
  );
}
