import { z } from "zod";
import { ItemType } from "@prisma/client";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().min(1, "Description is required."),
  price: z.number().int("Price must be a whole number.").positive("Price must be positive."),
  categoryId: z.string().min(1, "Category is required."),
  itemType: z.nativeEnum(ItemType),
  imageUrl: z
    .string()
    .refine(
      (val) => !val || val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://"),
      "Image URL must be a valid URL or local path starting with /"
    )
    .optional()
    .or(z.literal("")),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
  sortOrder: z.number().int(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required."),
  sortOrder: z.number().int(),
  isActive: z.boolean(),
});

export const offerSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
  badge: z.string().optional().or(z.literal("")),
  imageUrl: z
    .string()
    .refine(
      (val) => !val || val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://"),
      "Image URL must be a valid URL or local path starting with /"
    )
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  validUntil: z.string().optional().or(z.literal("")),
  sortOrder: z.number().int(),
});

export const settingsSchema = z.object({
  cafeName: z.string().min(1, "Cafe name is required."),
  tagline: z.string().min(1, "Tagline is required."),
  aboutText: z.string().min(1, "About text is required."),
  phone: z.string().min(1, "Phone number is required."),
  whatsappNumber: z.string().min(1, "WhatsApp number is required."),
  address: z.string().min(1, "Address is required."),
  openingHours: z.string().min(1, "Opening hours are required."),
  instagramUrl: z.string().optional().or(z.literal("")),
  mapsUrl: z.string().optional().or(z.literal("")),
  currencySymbol: z.string().min(1, "Currency symbol is required."),
});

export const galleryImageSchema = z.object({
  imageUrl: z
    .string()
    .min(1, "Image URL is required.")
    .refine(
      (val) => val.startsWith("/") || val.startsWith("http://") || val.startsWith("https://"),
      "Image URL must be a valid URL or local path starting with /"
    ),
  alt: z.string().min(1, "Alt text is required."),
  caption: z.string().optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type MenuItemInput = z.infer<typeof menuItemSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type OfferInput = z.infer<typeof offerSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
