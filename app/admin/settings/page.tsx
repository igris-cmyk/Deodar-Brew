export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const settings = await prisma.cafeSettings.findFirst();

  let initialData;
  if (settings) {
    initialData = {
      cafeName: settings.cafeName,
      tagline: settings.tagline,
      aboutText: settings.aboutText,
      phone: settings.phone,
      whatsappNumber: settings.whatsappNumber,
      address: settings.address,
      openingHours: settings.openingHours,
      instagramUrl: settings.instagramUrl || undefined,
      mapsUrl: settings.mapsUrl || undefined,
      currencySymbol: settings.currencySymbol,
    };
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading font-bold text-cedar-espresso">Cafe Settings</h1>
      </div>
      <p className="text-cedar-charcoal/70">
        Update your cafe&apos;s details, contact information, and public display preferences.
      </p>

      <SettingsForm initialData={initialData} />
    </div>
  );
}
