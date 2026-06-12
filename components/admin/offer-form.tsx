"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema, OfferInput } from "@/lib/validators";
import { createOfferAction, updateOfferAction } from "@/app/admin/offers/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function OfferForm({
  initialData,
}: {
  initialData?: OfferInput & { id?: string; validUntil?: string };
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OfferInput>({
    resolver: zodResolver(offerSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      badge: "",
      imageUrl: "",
      isActive: true,
      validUntil: "",
      sortOrder: 0,
    },
  });

  const onSubmit = async (data: OfferInput) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    if (initialData?.id) {
      formData.append("id", initialData.id);
      const res = await updateOfferAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save. Please check the inputs.");
      }
    } else {
      const res = await createOfferAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save. Please check the inputs.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border border-cedar-border bg-white p-6 shadow-sm">
      {serverError && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{serverError}</div>}
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-cedar-charcoal">Title</label>
        <input {...register("title")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-cedar-charcoal">Description</label>
        <textarea {...register("description")} rows={3} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Badge (Optional)</label>
          <input {...register("badge")} placeholder="e.g. 20% OFF" className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.badge && <p className="text-sm text-red-500">{errors.badge.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Valid Until (Optional)</label>
          <input type="date" {...register("validUntil")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.validUntil && <p className="text-sm text-red-500">{errors.validUntil.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Image URL (Optional)</label>
          <input {...register("imageUrl")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Sort Order</label>
          <input type="number" {...register("sortOrder", { valueAsNumber: true })} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.sortOrder && <p className="text-sm text-red-500">{errors.sortOrder.message}</p>}
        </div>
        <div className="flex items-center space-x-2 mt-8">
          <input type="checkbox" {...register("isActive")} id="isActive" className="h-4 w-4 rounded border-cedar-border text-cedar-green focus:ring-cedar-green" />
          <label htmlFor="isActive" className="text-sm font-medium text-cedar-charcoal">Active</label>
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-cedar-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cedar-green/90 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Offer"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/offers")}
          className="rounded-xl border border-cedar-border bg-white px-6 py-2.5 text-sm font-semibold text-cedar-charcoal transition-colors hover:bg-cedar-beige"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
