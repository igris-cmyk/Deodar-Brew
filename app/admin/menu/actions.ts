'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { menuItemSchema } from '@/lib/validators';
import { slugify } from '@/lib/slug';
import { ItemType } from '@prisma/client';

export interface MenuFormState {
  errors: Record<string, string>;
  success?: boolean;
}

export async function createMenuItemAction(
  prevState: MenuFormState,
  formData: FormData
): Promise<MenuFormState> {
  await requireAdmin();

  const raw = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    categoryId: formData.get('categoryId') as string,
    itemType: formData.get('itemType') as ItemType,
    imageUrl: (formData.get('imageUrl') as string) || '',
    isAvailable: formData.get('isAvailable') === 'true',
    isFeatured: formData.get('isFeatured') === 'true',
    sortOrder: Number(formData.get('sortOrder') || 0),
  };

  const parsed = menuItemSchema.safeParse(raw);
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

  await prisma.menuItem.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      itemType: data.itemType,
      imageUrl: data.imageUrl || null,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      sortOrder: data.sortOrder,
    },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/');
  redirect('/admin/menu');
}

export async function updateMenuItemAction(
  prevState: MenuFormState,
  formData: FormData
): Promise<MenuFormState> {
  await requireAdmin();

  const id = formData.get('id') as string;

  const raw = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    categoryId: formData.get('categoryId') as string,
    itemType: formData.get('itemType') as ItemType,
    imageUrl: (formData.get('imageUrl') as string) || '',
    isAvailable: formData.get('isAvailable') === 'true',
    isFeatured: formData.get('isFeatured') === 'true',
    sortOrder: Number(formData.get('sortOrder') || 0),
  };

  const parsed = menuItemSchema.safeParse(raw);
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

  await prisma.menuItem.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      categoryId: data.categoryId,
      itemType: data.itemType,
      imageUrl: data.imageUrl || null,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      sortOrder: data.sortOrder,
    },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/');
  redirect('/admin/menu');
}

export async function toggleAvailabilityAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;
  const isAvailable = formData.get('isAvailable') === 'true';

  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable: !isAvailable },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/');
}

export async function toggleFeaturedAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;
  const isFeatured = formData.get('isFeatured') === 'true';

  await prisma.menuItem.update({
    where: { id },
    data: { isFeatured: !isFeatured },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/');
}

export async function deleteMenuItemAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;

  await prisma.menuItem.delete({
    where: { id },
  });

  revalidatePath('/admin/menu');
  revalidatePath('/');
}
