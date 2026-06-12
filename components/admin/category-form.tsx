"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategoryInput } from "@/lib/validators";
import { createCategoryAction, updateCategoryAction } from "@/app/admin/categories/actions";

export function CategoryForm({
  initialData,
  onSuccess,
  onCancel,
}: {
  initialData?: CategoryInput & { id?: string };
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      sortOrder: 0,
      isActive: true,
    },
  });

  const onSubmit = async (data: CategoryInput) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (initialData?.id) {
      formData.append("id", initialData.id);
      const res = await updateCategoryAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save category.");
      } else {
        onSuccess();
      }
    } else {
      const res = await createCategoryAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save category.");
      } else {
        onSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-cedar-border bg-cedar-cream/30 p-4 mb-6">
      {serverError && <div className="text-red-500 text-sm">{serverError}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-medium text-cedar-charcoal">Name</label>
          <input {...register("name")} className="w-full rounded-lg border border-cedar-border p-2 text-sm focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-cedar-charcoal">Sort Order</label>
          <input type="number" {...register("sortOrder", { valueAsNumber: true })} className="w-full rounded-lg border border-cedar-border p-2 text-sm focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.sortOrder && <p className="text-xs text-red-500">{errors.sortOrder.message}</p>}
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <input type="checkbox" {...register("isActive")} id="isActiveCat" className="h-4 w-4 rounded border-cedar-border text-cedar-green focus:ring-cedar-green" />
          <label htmlFor="isActiveCat" className="text-sm font-medium text-cedar-charcoal">Active</label>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={isSubmitting} className="rounded-lg bg-cedar-brown px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cedar-espresso disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-cedar-border bg-white px-4 py-2 text-sm font-semibold text-cedar-charcoal transition-colors hover:bg-cedar-beige">
          Cancel
        </button>
      </div>
    </form>
  );
}
