'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { offerSchema } from '@/lib/validators';

export interface OfferFormState {
  errors: Record<string, string>;
  success?: boolean;
}

export async function createOfferAction(
  prevState: OfferFormState,
  formData: FormData
): Promise<OfferFormState> {
  await requireAdmin();

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    badge: (formData.get('badge') as string) || '',
    imageUrl: (formData.get('imageUrl') as string) || '',
    isActive: formData.get('isActive') !== 'false',
    validUntil: (formData.get('validUntil') as string) || '',
    sortOrder: Number(formData.get('sortOrder') || 0),
  };

  const parsed = offerSchema.safeParse(raw);
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

  await prisma.offer.create({
    data: {
      title: data.title,
      description: data.description,
      badge: data.badge || null,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive,
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
      sortOrder: data.sortOrder,
    },
  });

  revalidatePath('/admin/offers');
  revalidatePath('/');
  redirect('/admin/offers');
}

export async function updateOfferAction(
  prevState: OfferFormState,
  formData: FormData
): Promise<OfferFormState> {
  await requireAdmin();

  const id = formData.get('id') as string;

  const raw = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    badge: (formData.get('badge') as string) || '',
    imageUrl: (formData.get('imageUrl') as string) || '',
    isActive: formData.get('isActive') !== 'false',
    validUntil: (formData.get('validUntil') as string) || '',
    sortOrder: Number(formData.get('sortOrder') || 0),
  };

  const parsed = offerSchema.safeParse(raw);
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

  await prisma.offer.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      badge: data.badge || null,
      imageUrl: data.imageUrl || null,
      isActive: data.isActive,
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
      sortOrder: data.sortOrder,
    },
  });

  revalidatePath('/admin/offers');
  revalidatePath('/');
  redirect('/admin/offers');
}

export async function toggleOfferActiveAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;
  const isActive = formData.get('isActive') === 'true';

  await prisma.offer.update({
    where: { id },
    data: { isActive: !isActive },
  });

  revalidatePath('/admin/offers');
  revalidatePath('/');
}

export async function deleteOfferAction(formData: FormData) {
  await requireAdmin();

  const id = formData.get('id') as string;

  await prisma.offer.delete({
    where: { id },
  });

  revalidatePath('/admin/offers');
  revalidatePath('/');
}
