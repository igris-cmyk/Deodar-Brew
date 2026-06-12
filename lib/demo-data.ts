const demoTimestamp = new Date("2026-01-01T00:00:00.000Z");

const demoImages = {
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

type DemoItemType = "VEG" | "NON_VEG" | "EGG" | "OTHER";

type DemoMenuItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  isAvailable: boolean;
  isFeatured: boolean;
  itemType: DemoItemType;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type DemoCategory = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  items: DemoMenuItem[];
};

export const demoSettings = {
  id: "demo-settings",
  cafeName: "Deodar-Brew",
  tagline: "Fresh brews, warm bites, easy WhatsApp ordering.",
  aboutText:
    "Deodar-Brew is a working food-business website demo. It combines a searchable menu, cart, WhatsApp checkout, offers, gallery, contact details, and admin-managed content in one practical storefront.",
  phone: "+91 95412 06212",
  whatsappNumber: "919541206212",
  address: "Demo Street, Downtown Market\nSrinagar, Kashmir",
  openingHours: "Mon-Sat: 8:00 AM - 9:00 PM\nSun: 9:00 AM - 6:00 PM",
  instagramUrl: null,
  mapsUrl: null,
  currencySymbol: "Rs.",
  createdAt: demoTimestamp,
  updatedAt: demoTimestamp,
};

export const demoCategories: DemoCategory[] = [
  {
    id: "demo-coffee",
    name: "Coffee",
    slug: "coffee",
    sortOrder: 1,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-cappuccino",
        name: "Cappuccino",
        slug: "cappuccino",
        description: "Classic espresso with steamed milk foam.",
        price: 120,
        imageUrl: demoImages.cappuccino,
        categoryId: "demo-coffee",
        isAvailable: true,
        isFeatured: true,
        itemType: "VEG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-mocha",
        name: "Mocha",
        slug: "mocha",
        description: "Espresso blended with chocolate and steamed milk.",
        price: 140,
        imageUrl: demoImages.coffee,
        categoryId: "demo-coffee",
        isAvailable: true,
        isFeatured: false,
        itemType: "VEG" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
  {
    id: "demo-tea",
    name: "Tea",
    slug: "tea",
    sortOrder: 2,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-masala-chai",
        name: "Masala Chai",
        slug: "masala-chai",
        description: "Spiced tea brewed with ginger and cardamom.",
        price: 40,
        imageUrl: demoImages.masalaChai,
        categoryId: "demo-tea",
        isAvailable: true,
        isFeatured: true,
        itemType: "VEG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-kahwa",
        name: "Kashmiri Kahwa",
        slug: "kashmiri-kahwa",
        description: "Green tea with saffron, nuts, and light spice.",
        price: 80,
        imageUrl: demoImages.chai,
        categoryId: "demo-tea",
        isAvailable: true,
        isFeatured: false,
        itemType: "VEG" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
  {
    id: "demo-bakery",
    name: "Bakery",
    slug: "bakery",
    sortOrder: 3,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-chocolate-croissant",
        name: "Chocolate Croissant",
        slug: "chocolate-croissant",
        description: "Buttery pastry with a soft chocolate center.",
        price: 110,
        imageUrl: demoImages.chocolateCroissant,
        categoryId: "demo-bakery",
        isAvailable: true,
        isFeatured: true,
        itemType: "EGG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-brownie-slice",
        name: "Brownie Slice",
        slug: "brownie-slice",
        description: "Dense chocolate brownie served fresh from the counter.",
        price: 95,
        imageUrl: demoImages.dessert,
        categoryId: "demo-bakery",
        isAvailable: true,
        isFeatured: false,
        itemType: "VEG" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
  {
    id: "demo-cold-drinks",
    name: "Cold Drinks",
    slug: "cold-drinks",
    sortOrder: 4,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-orange-juice",
        name: "Fresh Orange Juice",
        slug: "fresh-orange-juice",
        description: "Pressed to order with no added sugar.",
        price: 130,
        imageUrl: demoImages.freshOrangeJuice,
        categoryId: "demo-cold-drinks",
        isAvailable: true,
        isFeatured: true,
        itemType: "VEG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-iced-tea",
        name: "Iced Tea",
        slug: "iced-tea",
        description: "Chilled tea with lemon and a touch of honey.",
        price: 90,
        imageUrl: demoImages.drinks,
        categoryId: "demo-cold-drinks",
        isAvailable: true,
        isFeatured: false,
        itemType: "VEG" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
  {
    id: "demo-fast-bites",
    name: "Fast Bites",
    slug: "fast-bites",
    sortOrder: 5,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-grilled-sandwich",
        name: "Grilled Sandwich",
        slug: "grilled-sandwich",
        description: "Toasted vegetable sandwich with house chutney.",
        price: 150,
        imageUrl: demoImages.grilledSandwich,
        categoryId: "demo-fast-bites",
        isAvailable: true,
        isFeatured: true,
        itemType: "VEG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-chicken-wrap",
        name: "Chicken Wrap",
        slug: "chicken-wrap",
        description: "Warm flatbread wrap with grilled chicken and salad.",
        price: 190,
        imageUrl: demoImages.sandwich,
        categoryId: "demo-fast-bites",
        isAvailable: true,
        isFeatured: false,
        itemType: "NON_VEG" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
  {
    id: "demo-meals",
    name: "Meals",
    slug: "meals",
    sortOrder: 6,
    isActive: true,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
    items: [
      {
        id: "demo-rice-bowl",
        name: "Rice Bowl",
        slug: "rice-bowl",
        description: "Comforting rice bowl with vegetables and house sauce.",
        price: 220,
        imageUrl: demoImages.riceBowl,
        categoryId: "demo-meals",
        isAvailable: true,
        isFeatured: true,
        itemType: "VEG" as const,
        sortOrder: 1,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
      {
        id: "demo-cloud-kitchen-box",
        name: "Cloud Kitchen Box",
        slug: "cloud-kitchen-box",
        description: "A compact meal box built for takeaway orders.",
        price: 260,
        imageUrl: demoImages.meal,
        categoryId: "demo-meals",
        isAvailable: true,
        isFeatured: false,
        itemType: "OTHER" as const,
        sortOrder: 2,
        createdAt: demoTimestamp,
        updatedAt: demoTimestamp,
      },
    ],
  },
];

export const demoFeaturedItems = demoCategories
  .flatMap((category) => category.items)
  .filter((item) => item.isFeatured);

export const demoOffers = [
  {
    id: "demo-breakfast-combo",
    title: "Breakfast Combo",
    description: "Pair any hot drink with a bakery item for a quick morning order.",
    badge: "Combo",
    imageUrl: null,
    isActive: true,
    validUntil: null,
    sortOrder: 1,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "demo-quick-pickup",
    title: "Quick Pickup",
    description: "Order ahead on WhatsApp and collect from the counter.",
    badge: "Fast",
    imageUrl: null,
    isActive: true,
    validUntil: null,
    sortOrder: 2,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
];

export const demoGallery = [
  {
    id: "demo-gallery-coffee",
    imageUrl: demoImages.cappuccino,
    alt: "Latte art coffee being prepared",
    caption: "Signature drinks",
    isActive: true,
    sortOrder: 1,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "demo-gallery-tea",
    imageUrl: demoImages.chai,
    alt: "Hot chai being poured into a cup",
    caption: "Local favourites",
    isActive: true,
    sortOrder: 2,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "demo-gallery-meal",
    imageUrl: demoImages.meal,
    alt: "Fresh takeaway meal demo item",
    caption: "Takeaway meals",
    isActive: true,
    sortOrder: 3,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "demo-gallery-drinks",
    imageUrl: demoImages.drinks,
    alt: "Cold blue drink with lemon and mint",
    caption: "Seasonal drinks",
    isActive: true,
    sortOrder: 4,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
];
