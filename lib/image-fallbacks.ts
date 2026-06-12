const DEFAULT_MENU_IMAGE_FALLBACK = "/placeholders/coffee.svg";

function normalizeCategoryName(categoryName: string): string {
  return categoryName.trim().toLowerCase();
}

export function getCategoryImageFallback(categoryName: string): string {
  const category = normalizeCategoryName(categoryName);

  if (!category) return DEFAULT_MENU_IMAGE_FALLBACK;
  if (category.includes("coffee")) return "/placeholders/coffee.svg";
  if (category.includes("tea") || category.includes("chai")) {
    return "/placeholders/tea.svg";
  }
  if (
    category.includes("cold") ||
    category.includes("drink") ||
    category.includes("juice")
  ) {
    return "/placeholders/drinks.svg";
  }
  if (category.includes("meal") || category.includes("rice")) {
    return "/placeholders/meal.svg";
  }
  if (
    category.includes("dessert") ||
    category.includes("bakery") ||
    category.includes("sweet")
  ) {
    return "/placeholders/dessert.svg";
  }
  if (
    category.includes("snack") ||
    category.includes("sandwich") ||
    category.includes("fast") ||
    category.includes("bite")
  ) {
    return "/placeholders/sandwich.svg";
  }

  return DEFAULT_MENU_IMAGE_FALLBACK;
}

export function resolveMenuImageUrl(
  imageUrl: string | null | undefined,
  categoryName?: string
): string {
  const trimmedUrl = imageUrl?.trim();

  if (trimmedUrl && trimmedUrl.startsWith("/")) {
    return trimmedUrl;
  }

  return getCategoryImageFallback(categoryName ?? "");
}

export function isSvgImageUrl(imageUrl: string): boolean {
  return imageUrl.split("?")[0].toLowerCase().endsWith(".svg");
}
