"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsInput } from "@/lib/validators";
import { updateSettingsAction } from "@/app/admin/settings/actions";
import { useState } from "react";
import { Check } from "lucide-react";

export function SettingsForm({ initialData }: { initialData?: SettingsInput }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData || {
      cafeName: "Deodar-Brew",
      tagline: "",
      aboutText: "",
      phone: "",
      whatsappNumber: "",
      address: "",
      openingHours: "",
      instagramUrl: "",
      mapsUrl: "",
      currencySymbol: "₹",
    },
  });

  const onSubmit = async (data: SettingsInput) => {
    setServerError(null);
    setIsSuccess(false);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const res = await updateSettingsAction({ errors: {} }, formData);
    if (res?.errors && Object.keys(res.errors).length > 0) {
      setServerError("Failed to save settings. Please check your inputs.");
    } else {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-xl border border-cedar-border bg-white p-6 md:p-8 shadow-sm">
      {serverError && <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{serverError}</div>}
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-heading font-semibold text-cedar-espresso mb-4 border-b border-cedar-border pb-2">General Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Cafe Name</label>
              <input {...register("cafeName")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.cafeName && <p className="text-sm text-red-500">{errors.cafeName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Tagline</label>
              <input {...register("tagline")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.tagline && <p className="text-sm text-red-500">{errors.tagline.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-cedar-espresso mb-4 border-b border-cedar-border pb-2">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Phone Number</label>
              <input {...register("phone")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">WhatsApp Number</label>
              <input {...register("whatsappNumber")} placeholder="e.g. +919876543210" className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.whatsappNumber && <p className="text-sm text-red-500">{errors.whatsappNumber.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-cedar-charcoal">Address</label>
              <textarea {...register("address")} rows={2} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-cedar-charcoal">Opening Hours</label>
              <textarea {...register("openingHours")} rows={2} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.openingHours && <p className="text-sm text-red-500">{errors.openingHours.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-cedar-espresso mb-4 border-b border-cedar-border pb-2">Links & Formatting</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Instagram URL</label>
              <input {...register("instagramUrl")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.instagramUrl && <p className="text-sm text-red-500">{errors.instagramUrl.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Google Maps URL</label>
              <input {...register("mapsUrl")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.mapsUrl && <p className="text-sm text-red-500">{errors.mapsUrl.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-cedar-charcoal">Currency Symbol</label>
              <input {...register("currencySymbol")} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
              {errors.currencySymbol && <p className="text-sm text-red-500">{errors.currencySymbol.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-heading font-semibold text-cedar-espresso mb-4 border-b border-cedar-border pb-2">About Page</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-cedar-charcoal">About Text</label>
            <textarea {...register("aboutText")} rows={4} className="w-full rounded-lg border border-cedar-border p-2 focus:ring-2 focus:ring-cedar-caramel outline-none" />
            {errors.aboutText && <p className="text-sm text-red-500">{errors.aboutText.message}</p>}
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-cedar-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-cedar-green/90 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
        {isSuccess && (
          <span className="flex items-center text-sm font-medium text-cedar-green">
            <Check className="h-4 w-4 mr-1" />
            Saved successfully!
          </span>
        )}
      </div>
    </form>
  );
}
