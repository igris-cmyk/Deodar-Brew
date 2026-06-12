'use server';

import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { settingsSchema } from '@/lib/validators';

export interface SettingsFormState {
  errors: Record<string, string>;
  success?: boolean;
}

export async function updateSettingsAction(
  prevState: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();

  const raw = {
    cafeName: formData.get('cafeName') as string,
    tagline: formData.get('tagline') as string,
    aboutText: formData.get('aboutText') as string,
    phone: formData.get('phone') as string,
    whatsappNumber: formData.get('whatsappNumber') as string,
    address: formData.get('address') as string,
    openingHours: formData.get('openingHours') as string,
    instagramUrl: (formData.get('instagramUrl') as string) || '',
    mapsUrl: (formData.get('mapsUrl') as string) || '',
    currencySymbol: formData.get('currencySymbol') as string,
  };

  const parsed = settingsSchema.safeParse(raw);
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

  await prisma.cafeSettings.upsert({
    where: { id: 'singleton' },
    update: {
      cafeName: data.cafeName,
      tagline: data.tagline,
      aboutText: data.aboutText,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      address: data.address,
      openingHours: data.openingHours,
      instagramUrl: data.instagramUrl || null,
      mapsUrl: data.mapsUrl || null,
      currencySymbol: data.currencySymbol,
    },
    create: {
      id: 'singleton',
      cafeName: data.cafeName,
      tagline: data.tagline,
      aboutText: data.aboutText,
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      address: data.address,
      openingHours: data.openingHours,
      instagramUrl: data.instagramUrl || null,
      mapsUrl: data.mapsUrl || null,
      currencySymbol: data.currencySymbol,
    },
  });

  revalidatePath('/admin/settings');
  revalidatePath('/');
  return { errors: {}, success: true };
}
