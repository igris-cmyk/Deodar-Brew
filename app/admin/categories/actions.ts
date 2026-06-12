'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';

export interface CategoryFormState {
  errors: Record<string, string>;
  success?: boolean;
}

export async function createCategoryAction(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();

  const raw = {
    name: formData.get('name') as string,
    sortOrder: Number(formData.get('sortOrder') || 0),
    isActive: formData.get('isActive') !== 'false',
  };

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string') {
        errors[key] = issue.message;
      }
    }
    return { errors };
  }

  const data = parsed.data;
  const slug = slugify(data.name);

  await prisma.category.create({
    data: {
      name: data.name,
      slug,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { errors: {}, success: true };
}

export async function updateCategoryAction(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  await requireAdmin();

  const id = formData.get('id') as string;

  const raw = {
    name: formData.get('name') as string,
    sortOrder: Number(formData.get('sortOrder') || 0),
    isActive: formData.get('isActive') !== 'false',
  };

  const parsed = categorySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string') {
        errors[key] = issue.message;
      }
    }
    return { errors };
  }

  const data = parsed.data;
  const slug = slugify(data.name);

  await prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      sortOrder: data.sortOrder,
      isActive: data.isActive,
    },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/');
  return { errors: {}, success: true };
}

export async function toggleCategoryActiveAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';

  await prisma.category.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/');
}

export async function deleteCategoryAction(formData: FormData): Promise<{ error?: string }> {
  await requireAdmin();

  const id = formData.get('id') as string;

  const itemCount = await prisma.menuItem.count({
    where: { categoryId: id },
  });

  if (itemCount > 0) {
    return {
      error: `Cannot delete: this category has ${itemCount} menu item${itemCount === 1 ? '' : 's'}. Remove them first.`,
    };
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath('/admin/categories');
  revalidatePath('/');
  return {};
}
