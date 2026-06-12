"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Check, X, AlertTriangle } from "lucide-react";
import { CategoryForm } from "./category-form";
import { toggleCategoryActiveAction, deleteCategoryAction } from "@/app/admin/categories/actions";

type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  _count: { items: number };
};

export function CategoriesClient({ categories }: { categories: CategoryWithCount[] }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDelete = async (id: string, itemCount: number) => {
    if (itemCount > 0) {
      alert(`Cannot delete: this category has ${itemCount} menu item(s). Remove them first.`);
      return;
    }
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteCategoryAction(formData);
    if (res?.error) {
      setErrorMsg(res.error);
      setTimeout(() => setErrorMsg(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {errorMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-200">
          <AlertTriangle className="h-4 w-4" />
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Categories</h1>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-cedar-brown px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cedar-espresso"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        )}
      </div>

      {isAdding && (
        <CategoryForm
          onSuccess={() => setIsAdding(false)}
          onCancel={() => setIsAdding(false)}
        />
      )}

      {categories.length === 0 && !isAdding ? (
        <div className="rounded-xl border border-cedar-border bg-white p-12 text-center text-cedar-charcoal/60">
          <p>No categories yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-cedar-border bg-white overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-cedar-beige/30 text-cedar-charcoal border-b border-cedar-border">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Slug</th>
                <th className="px-4 py-3 font-semibold text-center">Items</th>
                <th className="px-4 py-3 font-semibold text-center">Order</th>
                <th className="px-4 py-3 font-semibold text-center">Active</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cedar-border/50">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-cedar-cream/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-cedar-espresso">
                    {editingId === category.id ? (
                      <CategoryForm
                        initialData={category}
                        onSuccess={() => setEditingId(null)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  {editingId !== category.id && (
                    <>
                      <td className="px-4 py-3 text-cedar-charcoal/80">{category.slug}</td>
                      <td className="px-4 py-3 text-center text-cedar-charcoal/80">{category._count.items}</td>
                      <td className="px-4 py-3 text-center text-cedar-charcoal/80">{category.sortOrder}</td>
                      <td className="px-4 py-3 text-center">
                        <form action={toggleCategoryActiveAction}>
                          <input type="hidden" name="id" value={category.id} />
                          <input type="hidden" name="isActive" value={String(category.isActive)} />
                          <button type="submit" className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${category.isActive ? 'bg-cedar-green text-white' : 'bg-cedar-charcoal/20 text-cedar-charcoal/50'}`}>
                            {category.isActive ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => setEditingId(category.id)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-cedar-brown hover:bg-cedar-beige transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(category.id, category._count.items)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
