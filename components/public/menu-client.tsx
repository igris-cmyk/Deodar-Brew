"use client";

import { useMemo, useState } from "react";
import {
  ClipboardList,
  Coffee,
  Filter,
  MessageCircle,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { MobileCartBar } from "@/components/cart/mobile-cart-bar";
import { useCart } from "@/components/cart/cart-provider";
import MenuItemCard from "@/components/public/menu-item-card";
import { resolveMenuImageUrl } from "@/lib/image-fallbacks";

type ItemType = "VEG" | "NON_VEG" | "EGG" | "OTHER";

interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  isAvailable: boolean;
  isFeatured: boolean;
  itemType: ItemType;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  isActive: boolean;
  items: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface MenuClientProps {
  categories: Category[];
  currencySymbol: string;
}

export default function MenuClient({
  categories,
  currencySymbol,
}: MenuClientProps) {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allItems = useMemo(
    () =>
      categories.flatMap((cat) =>
        cat.items.map((item) => ({
          ...item,
          category: { name: cat.name, id: cat.id },
        }))
      ),
    [categories]
  );

  const filteredItems = useMemo(() => {
    let items = activeCategory
      ? allItems.filter((item) => item.category.id === activeCategory)
      : allItems;

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.name.toLowerCase().includes(query)
      );
    }

    return items;
  }, [allItems, activeCategory, search]);

  const activeCategoryName =
    categories.find((category) => category.id === activeCategory)?.name ?? "All";
  const hasNoItems = allItems.length === 0;
  const hasNoResults = !hasNoItems && filteredItems.length === 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/70 bg-cedar-cream">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(235,168,77,0.22),transparent_24rem),radial-gradient(circle_at_88%_12%,rgba(97,116,81,0.16),transparent_24rem)]" />
        <div className="relative mx-auto max-w-6xl container-px py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1fr_0.78fr] md:items-end">
            <div className="max-w-3xl motion-fade-up">
              <p className="inline-flex rounded-full border border-cedar-caramel/20 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cedar-caramel shadow-sm backdrop-blur">
                Digital menu
              </p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.06] tracking-[-0.02em] text-cedar-espresso sm:text-5xl md:text-[3.35rem]">
                Browse, choose, and send the order on WhatsApp.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-cedar-charcoal/70 sm:text-[1.05rem]">
                This page is built for quick phone-first decisions: clear
                categories, readable prices, cart persistence, and a simple
                handoff to WhatsApp.
              </p>
            </div>

            <div className="motion-fade-up motion-delay-1 grid grid-cols-3 gap-2 rounded-[28px] border border-white/70 bg-white/60 p-3 shadow-[0_20px_55px_rgba(33,18,13,0.09)] backdrop-blur-xl">
              {[
                { icon: Search, label: "Search" },
                { icon: ShoppingBag, label: "Cart" },
                { icon: MessageCircle, label: "WhatsApp" },
              ].map((step) => (
                <div
                  key={step.label}
                  className="rounded-3xl bg-cedar-ivory px-2 py-3 text-center shadow-[0_12px_30px_rgba(33,18,13,0.06)]"
                >
                  <step.icon
                    className="mx-auto h-5 w-5 text-cedar-green"
                    aria-hidden="true"
                  />
                  <p className="mt-2 text-[11px] font-extrabold text-cedar-espresso">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl container-px py-7 md:py-10">
        {!hasNoItems && (
          <div className="motion-fade-up mb-7 rounded-[28px] glass-panel p-3 md:p-4">
            <div className="grid gap-3 lg:grid-cols-[minmax(280px,0.74fr)_1fr] lg:items-start">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cedar-caramel" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search drinks, meals, bakery..."
                  className="h-12 w-full rounded-2xl border border-cedar-border/60 bg-cedar-ivory/90 pl-11 pr-11 text-sm font-semibold text-cedar-espresso placeholder:text-cedar-charcoal/40 focus:border-cedar-caramel focus:bg-white focus:outline-none focus:ring-4 focus:ring-cedar-amber/20"
                />
                {search && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-cedar-charcoal/50 hover:bg-cedar-cream hover:text-cedar-espresso"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible">
                <button
                  type="button"
                  aria-pressed={activeCategory === null}
                  onClick={() => setActiveCategory(null)}
                  className={`button-pop shrink-0 rounded-full border px-4 py-2 text-sm font-extrabold ${
                    activeCategory === null
                      ? "border-cedar-espresso bg-cedar-espresso text-white shadow-[0_10px_22px_rgba(33,18,13,0.14)]"
                      : "border-cedar-border/60 bg-white/70 text-cedar-charcoal hover:border-cedar-caramel/50 hover:bg-white"
                  }`}
                >
                  All
                  <span className="ml-2 text-xs opacity-75">{allItems.length}</span>
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={activeCategory === category.id}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )
                    }
                    className={`button-pop shrink-0 rounded-full border px-4 py-2 text-sm font-extrabold ${
                      activeCategory === category.id
                        ? "border-cedar-espresso bg-cedar-espresso text-white shadow-[0_10px_22px_rgba(33,18,13,0.14)]"
                        : "border-cedar-border/60 bg-white/70 text-cedar-charcoal hover:border-cedar-caramel/50 hover:bg-white"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">
                      {category.items.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 border-t border-cedar-border/50 pt-4 text-xs font-semibold text-cedar-charcoal/60 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "items"} in{" "}
                {activeCategoryName}.
              </p>
              <p className="inline-flex items-center gap-1.5">
                <ClipboardList className="h-3.5 w-3.5 text-cedar-caramel" />
                Availability and pricing are admin-managed.
              </p>
            </div>
          </div>
        )}

        {hasNoItems && (
          <div className="rounded-[28px] border border-dashed border-cedar-border/70 bg-white/80 p-10 text-center shadow-[0_18px_45px_rgba(33,18,13,0.07)]">
            <Coffee className="mx-auto h-10 w-10 text-cedar-caramel" />
            <h2 className="mt-4 text-2xl font-extrabold text-cedar-espresso">
              Menu coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cedar-charcoal/60">
              The menu records are empty. Once items are added from the admin
              dashboard, they will appear here.
            </p>
          </div>
        )}

        {hasNoResults && (
          <div className="rounded-[28px] border border-dashed border-cedar-border/70 bg-white/80 p-10 text-center shadow-[0_18px_45px_rgba(33,18,13,0.07)]">
            <Search className="mx-auto h-10 w-10 text-cedar-caramel" />
            <h2 className="mt-4 text-2xl font-extrabold text-cedar-espresso">
              No matching items
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-cedar-charcoal/60">
              Try another search term or switch back to all categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="button-pop mt-5 inline-flex items-center gap-2 rounded-2xl bg-cedar-espresso px-5 py-3 text-sm font-bold text-white hover:bg-cedar-brown"
            >
              <Filter className="h-4 w-4" />
              Reset filters
            </button>
          </div>
        )}

        {filteredItems.length > 0 && (
          <div className="grid grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-3 md:pb-8">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                currencySymbol={currencySymbol}
                onAddToCart={() =>
                  addItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    imageUrl: resolveMenuImageUrl(
                      item.imageUrl,
                      item.category.name
                    ),
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl container-px pb-12">
        <div className="rounded-[28px] border border-cedar-green/20 bg-cedar-green/10 p-5 text-sm leading-6 text-cedar-charcoal/70">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cedar-green" />
            <p>
              Menu content, categories, pricing, availability, and featured
              states come from the same records the admin dashboard manages.
            </p>
          </div>
        </div>
      </div>

      <MobileCartBar currencySymbol={currencySymbol} />
    </>
  );
}
