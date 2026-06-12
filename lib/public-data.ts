import type {
  CafeSettings,
  Category,
  GalleryImage,
  MenuItem,
  Offer,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  demoCategories,
  demoFeaturedItems,
  demoGallery,
  demoOffers,
  demoSettings,
} from "@/lib/demo-data";

export type PublicCategoryWithItems = Category & { items: MenuItem[] };
export type PublicFeaturedItem = MenuItem & {
  category: Pick<Category, "id" | "name"> | null;
};
export type PublicSettings = CafeSettings;
export type PublicOffer = Offer;
export type PublicGalleryImage = GalleryImage;

export type HomePageData = [
  PublicFeaturedItem[],
  PublicOffer[],
  PublicSettings | null,
  PublicGalleryImage[]
];

export type MenuPageData = [PublicCategoryWithItems[], PublicSettings | null];

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL?.trim());

const demoFeaturedItemsWithCategories: PublicFeaturedItem[] =
  demoFeaturedItems.map((item) => {
    const category = demoCategories.find(
      (demoCategory) => demoCategory.id === item.categoryId
    );

    return {
      ...item,
      category: category
        ? {
            id: category.id,
            name: category.name,
          }
        : null,
    };
  });

function logPublicDataFallback(route: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown data error";
  console.warn(
    `[public-data] ${route} is using demo fallback data because Prisma data could not be loaded: ${message}`
  );
}

export async function getHomePageData(): Promise<HomePageData> {
  if (!hasDatabaseUrl) {
    return [
      demoFeaturedItemsWithCategories,
      demoOffers,
      demoSettings,
      demoGallery,
    ];
  }

  try {
    return await Promise.all([
      prisma.menuItem.findMany({
        where: { isFeatured: true, isAvailable: true },
        include: { category: { select: { id: true, name: true } } },
        orderBy: { sortOrder: "asc" },
        take: 6,
      }),
      prisma.offer.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.cafeSettings.findFirst(),
      prisma.galleryImage.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
    ]);
  } catch (error) {
    logPublicDataFallback("home", error);
    return [
      demoFeaturedItemsWithCategories,
      demoOffers,
      demoSettings,
      demoGallery,
    ];
  }
}

export async function getMenuPageData(): Promise<MenuPageData> {
  if (!hasDatabaseUrl) {
    return [demoCategories, demoSettings];
  }

  try {
    return await Promise.all([
      prisma.category.findMany({
        where: { isActive: true },
        include: {
          items: {
            orderBy: { sortOrder: "asc" },
          },
        },
        orderBy: { sortOrder: "asc" },
      }),
      prisma.cafeSettings.findFirst(),
    ]);
  } catch (error) {
    logPublicDataFallback("menu", error);
    return [demoCategories, demoSettings];
  }
}
