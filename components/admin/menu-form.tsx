"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { menuItemSchema, MenuItemInput } from "@/lib/validators";
import { createMenuItemAction, updateMenuItemAction } from "@/app/admin/menu/actions";
import { ItemType, Category } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function MenuForm({
  categories,
  initialData,
}: {
  categories: Category[];
  initialData?: MenuItemInput & { id?: string };
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemInput>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      categoryId: categories.length > 0 ? categories[0].id : "",
      itemType: ItemType.VEG,
      imageUrl: "",
      isAvailable: true,
      isFeatured: false,
      sortOrder: 0,
    },
  });

  const onSubmit = async (data: MenuItemInput) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    
    if (initialData?.id) {
      formData.append("id", initialData.id);
      const res = await updateMenuItemAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save. Please check the inputs.");
      }
    } else {
      const res = await createMenuItemAction({ errors: {} }, formData);
      if (res?.errors && Object.keys(res.errors).length > 0) {
        setServerError("Failed to save. Please check the inputs.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border border-cedar-border bg-white p-6 shadow-sm">
      {serverError && <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg">{serverError}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Name</label>
          <input {...register("name")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Price (₹)</label>
          <input type="number" {...register("price", { valueAsNumber: true })} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-cedar-charcoal">Description</label>
        <textarea {...register("description")} rows={3} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Category</label>
          <select {...register("categoryId")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none bg-white">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-sm text-red-500">{errors.categoryId.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Item Type</label>
          <select {...register("itemType")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none bg-white">
            {Object.values(ItemType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.itemType && <p className="text-sm text-red-500">{errors.itemType.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-cedar-charcoal">Image URL (Optional)</label>
        <input {...register("imageUrl")} placeholder="/placeholders/coffee.svg" className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
        {errors.imageUrl && <p className="text-sm text-red-500">{errors.imageUrl.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-cedar-charcoal">Sort Order</label>
          <input type="number" {...register("sortOrder", { valueAsNumber: true })} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
          {errors.sortOrder && <p className="text-sm text-red-500">{errors.sortOrder.message}</p>}
        </div>

        <div className="flex items-center space-x-2 mt-8">
          <input type="checkbox" {...register("isAvailable")} id="isAvailable" className="h-4 w-4 rounded border-cedar-border text-cedar-green focus:ring-cedar-green" />
          <label htmlFor="isAvailable" className="text-sm font-medium text-cedar-charcoal">Available</label>
        </div>

        <div className="flex items-center space-x-2 mt-8">
          <input type="checkbox" {...register("isFeatured")} id="isFeatured" className="h-4 w-4 rounded border-cedar-border text-cedar-caramel focus:ring-cedar-caramel" />
          <label htmlFor="isFeatured" className="text-sm font-medium text-cedar-charcoal">Featured</label>
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-cedar-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cedar-green/90 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Item"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/menu")}
          className="rounded-xl border border-cedar-border bg-white px-6 py-2.5 text-sm font-semibold text-cedar-charcoal transition-colors hover:bg-cedar-beige"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
