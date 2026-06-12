import { PrismaClient, ItemType } from "@prisma/client";
import { slugify } from "../lib/slug";

const prisma = new PrismaClient();

const seedImages = {
  cappuccino: "/assets/menu/cappuccino.jpeg",
  chai: "/assets/menu/chai.jpeg",
  chocolateCroissant: "/assets/menu/chocolate-croissant.jpeg",
  coffee: "/assets/menu/coffee.jpeg",
  dessert: "/assets/menu/dessert.jpeg",
  drinks: "/assets/menu/drinks.jpeg",
  freshOrangeJuice: "/assets/menu/fresh-orange-juice.jpeg",
  grilledSandwich: "/assets/menu/grilled-sandwich.jpeg",
  masalaChai: "/assets/menu/masala-chai.jpeg",
  meal: "/assets/menu/meal.jpeg",
  riceBowl: "/assets/menu/rice-bowl.jpeg",
  sandwich: "/assets/menu/sandwich.jpeg",
} as const;

const defaultCafeSettings = {
  cafeName: "Deodar-Brew",
  tagline: "Fresh brews, warm bites, easy WhatsApp ordering.",
  aboutText:
    "Deodar-Brew is built around simple ordering, clear menus, and warm local hospitality. Browse what's fresh, build your order, and send it on WhatsApp in under a minute.",
  phone: "REPLACE_BEFORE_DEPLOY",
  whatsappNumber: "REPLACE_BEFORE_DEPLOY",
  address: "REPLACE_BEFORE_DEPLOY",
  openingHours: "Mon–Sat: 8 AM – 9 PM | Sun: 9 AM – 6 PM",
  instagramUrl: null,
  mapsUrl: null,
  currencySymbol: "₹",
} as const;

function isOldBrandText(value: string | null | undefined): boolean {
  return !value || value.includes("Cedar");
}

function isDefaultTagline(value: string | null | undefined): boolean {
  return !value || value === defaultCafeSettings.tagline;
}

async function main() {
  console.log("🌱 Seeding Deodar-Brew database...");

  // --- Categories ---
  const categories = [
    { name: "Coffee", sortOrder: 1 },
    { name: "Tea", sortOrder: 2 },
    { name: "Snacks", sortOrder: 3 },
    { name: "Meals", sortOrder: 4 },
    { name: "Desserts", sortOrder: 5 },
    { name: "Cold Drinks", sortOrder: 6 },
  ];

  const categoryMap: Record<string, string> = {};

  for (const cat of categories) {
    const slug = slugify(cat.name);
    const result = await prisma.category.upsert({
      where: { slug },
      update: { name: cat.name, sortOrder: cat.sortOrder },
      create: { name: cat.name, slug, sortOrder: cat.sortOrder },
    });
    categoryMap[cat.name] = result.id;
  }

  console.log("✅ Categories seeded");

  // --- Menu Items ---
  const menuItems = [
    // Coffee
    { name: "Cappuccino", description: "Classic Italian espresso with steamed milk foam.", price: 120, category: "Coffee", itemType: ItemType.VEG, isFeatured: true, imageUrl: seedImages.cappuccino },
    { name: "Americano", description: "Double shot espresso with hot water.", price: 100, category: "Coffee", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.coffee },
    { name: "Latte", description: "Smooth espresso with plenty of steamed milk.", price: 130, category: "Coffee", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.cappuccino },
    { name: "Mocha", description: "Rich espresso blended with chocolate and steamed milk.", price: 140, category: "Coffee", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.coffee },
    { name: "Cold Coffee", description: "Chilled coffee blended with milk and ice.", price: 150, category: "Coffee", itemType: ItemType.VEG, isFeatured: true, imageUrl: seedImages.drinks },

    // Tea
    { name: "Masala Chai", description: "Indian spiced tea brewed with fresh ginger and cardamom.", price: 40, category: "Tea", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.masalaChai },
    { name: "Kashmiri Kahwa", description: "Traditional Kashmiri green tea with saffron and nuts.", price: 80, category: "Tea", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.chai },
    { name: "Lemon Tea", description: "Refreshing black tea with a squeeze of fresh lemon.", price: 60, category: "Tea", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.chai },

    // Snacks
    { name: "Chicken Sandwich", description: "Grilled chicken with fresh veggies and mayo on toasted bread.", price: 160, category: "Snacks", itemType: ItemType.NON_VEG, isFeatured: true, imageUrl: seedImages.sandwich },
    { name: "Veg Grilled Sandwich", description: "Assorted grilled vegetables with cheese on multigrain bread.", price: 120, category: "Snacks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.grilledSandwich },
    { name: "Fries", description: "Golden crispy fries seasoned with salt and herbs.", price: 80, category: "Snacks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.grilledSandwich },
    { name: "Cheese Toast", description: "Buttered toast topped with melted cheese and herbs.", price: 90, category: "Snacks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.grilledSandwich },

    // Meals
    { name: "Chicken Wrap", description: "Seasoned chicken wrapped in a warm tortilla with fresh greens.", price: 180, category: "Meals", itemType: ItemType.NON_VEG, isFeatured: false, imageUrl: seedImages.meal },
    { name: "Veg Burger", description: "Crispy veggie patty with lettuce, tomato, and special sauce.", price: 130, category: "Meals", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.riceBowl },
    { name: "Paneer Roll", description: "Spiced paneer in a soft roll with mint chutney.", price: 140, category: "Meals", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.riceBowl },

    // Desserts
    { name: "Chocolate Brownie", description: "Rich and fudgy chocolate brownie served warm.", price: 110, category: "Desserts", itemType: ItemType.VEG, isFeatured: true, imageUrl: seedImages.dessert },
    { name: "Muffin", description: "Freshly baked muffin in assorted flavours.", price: 80, category: "Desserts", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.chocolateCroissant },
    { name: "Cheesecake Slice", description: "Creamy New York style cheesecake on a biscuit base.", price: 150, category: "Desserts", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.dessert },

    // Cold Drinks
    { name: "Iced Tea", description: "Chilled tea with lemon and a touch of honey.", price: 90, category: "Cold Drinks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.drinks },
    { name: "Lemonade", description: "Freshly squeezed lemonade with mint.", price: 70, category: "Cold Drinks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.freshOrangeJuice },
    { name: "Mint Mojito", description: "Cool mint and lime mocktail with soda.", price: 100, category: "Cold Drinks", itemType: ItemType.VEG, isFeatured: false, imageUrl: seedImages.drinks },
  ];

  for (const item of menuItems) {
    const slug = slugify(item.name);
    await prisma.menuItem.upsert({
      where: { slug },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        categoryId: categoryMap[item.category],
        itemType: item.itemType,
        isFeatured: item.isFeatured,
        imageUrl: item.imageUrl,
      },
      create: {
        name: item.name,
        slug,
        description: item.description,
        price: item.price,
        categoryId: categoryMap[item.category],
        itemType: item.itemType,
        isFeatured: item.isFeatured,
        imageUrl: item.imageUrl,
      },
    });
  }

  console.log("✅ Menu items seeded");

  // --- Offers ---
  const offers = [
    {
      title: "Coffee + Sandwich Combo",
      description: "Pick any coffee and any sandwich. Ask at the counter for combo pricing.",
      badge: "Popular",
      sortOrder: 1,
    },
    {
      title: "Student Evening Special",
      description: "Show a valid student ID after 4 PM for a discount on snacks.",
      badge: "Student",
      sortOrder: 2,
    },
    {
      title: "Weekend Dessert Deal",
      description: "Any dessert plus any cold drink on weekends. Subject to availability.",
      badge: "Weekend",
      sortOrder: 3,
    },
  ];

  for (const offer of offers) {
    await prisma.offer.upsert({
      where: { id: slugify(offer.title) },
      update: {
        title: offer.title,
        description: offer.description,
        badge: offer.badge,
        sortOrder: offer.sortOrder,
      },
      create: {
        id: slugify(offer.title),
        title: offer.title,
        description: offer.description,
        badge: offer.badge,
        sortOrder: offer.sortOrder,
      },
    });
  }

  console.log("✅ Offers seeded");

  // --- Gallery Images ---
  const galleryImages = [
    { imageUrl: seedImages.cappuccino, alt: "Latte art coffee being prepared", caption: "Signature drinks" },
    { imageUrl: seedImages.chai, alt: "Hot chai being poured into a cup", caption: "Local favourites" },
    { imageUrl: seedImages.grilledSandwich, alt: "Grilled sandwiches and snacks", caption: "Quick bites, big flavours" },
    { imageUrl: seedImages.meal, alt: "Fresh takeaway meal demo item", caption: "Takeaway meals" },
    { imageUrl: seedImages.dessert, alt: "Dessert served warm with chocolate", caption: "Something sweet" },
    { imageUrl: seedImages.drinks, alt: "Cold blue drink with lemon and mint", caption: "Seasonal drinks" },
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    const img = galleryImages[i];
    const id = `gallery-${i + 1}`;
    await prisma.galleryImage.upsert({
      where: { id },
      update: {
        imageUrl: img.imageUrl,
        alt: img.alt,
        caption: img.caption,
        sortOrder: i + 1,
      },
      create: {
        id,
        imageUrl: img.imageUrl,
        alt: img.alt,
        caption: img.caption,
        sortOrder: i + 1,
      },
    });
  }

  console.log("✅ Gallery images seeded");

  // --- Cafe Settings (Singleton) ---
  const existingSettings = await prisma.cafeSettings.findUnique({
    where: { id: "singleton" },
  });

  await prisma.cafeSettings.upsert({
    where: { id: "singleton" },
    update: {
      cafeName: isOldBrandText(existingSettings?.cafeName)
        ? defaultCafeSettings.cafeName
        : existingSettings?.cafeName,
      tagline: isDefaultTagline(existingSettings?.tagline)
        ? defaultCafeSettings.tagline
        : existingSettings?.tagline,
      aboutText: isOldBrandText(existingSettings?.aboutText)
        ? defaultCafeSettings.aboutText
        : existingSettings?.aboutText,
    },
    create: {
      id: "singleton",
      ...defaultCafeSettings,
    },
  });

  console.log("✅ Cafe settings seeded");
  console.log("🎉 Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
