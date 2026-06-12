"use client";

import Image from "next/image";
import { Plus, ShoppingBag } from "lucide-react";
import { isSvgImageUrl, resolveMenuImageUrl } from "@/lib/image-fallbacks";

type ItemType = "VEG" | "NON_VEG" | "EGG" | "OTHER";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    isAvailable: boolean;
    itemType: ItemType;
    category?: { name: string } | null;
  };
  currencySymbol: string;
  onAddToCart: () => void;
}

const typeConfig: Record<
  ItemType,
  { label: string; dotClass: string; shape: "circle" | "triangle" }
> = {
  VEG: { label: "Veg", dotClass: "bg-cedar-green", shape: "circle" },
  NON_VEG: { label: "Non-veg", dotClass: "bg-red-600", shape: "triangle" },
  EGG: { label: "Egg", dotClass: "bg-amber-500", shape: "circle" },
  OTHER: { label: "", dotClass: "", shape: "circle" },
};

function TypeBadge({ itemType }: { itemType: ItemType }) {
  const config = typeConfig[itemType];
  if (!config.label) return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/75 bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-cedar-charcoal/75 shadow-sm backdrop-blur">
      {config.shape === "triangle" ? (
        <svg
          className="h-2.5 w-2.5 text-red-600"
          viewBox="0 0 10 10"
          fill="currentColor"
          aria-hidden="true"
        >
          <polygon points="5,0 10,10 0,10" />
        </svg>
      ) : (
        <span
          className={`h-2.5 w-2.5 rounded-full ${config.dotClass}`}
          aria-hidden="true"
        />
      )}
      {config.label}
    </span>
  );
}

export default function MenuItemCard({
  item,
  currencySymbol,
  onAddToCart,
}: MenuItemCardProps) {
  const unavailable = !item.isAvailable;
  const imageUrl = resolveMenuImageUrl(item.imageUrl, item.category?.name);
  const isSvgImage = isSvgImageUrl(imageUrl);

  return (
    <article
      className={`group grid min-h-[164px] grid-cols-[120px_1fr] overflow-hidden rounded-[24px] border bg-cedar-surface shadow-[0_18px_48px_rgba(33,18,13,0.08)] sm:block ${
        unavailable
          ? "border-cedar-border/50 bg-white/70"
          : "border-white/75 hover:-translate-y-1 hover:border-cedar-caramel/40 hover:shadow-[0_24px_60px_rgba(33,18,13,0.13)]"
      }`}
    >
      <div className="image-well relative min-h-full sm:aspect-[4/3] sm:min-h-0">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className={`transition-transform duration-500 ${
            isSvgImage ? "object-contain p-5" : "object-cover"
          } ${unavailable ? "opacity-60 grayscale" : "group-hover:scale-[1.05]"}`}
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 50vw, 33vw"
          unoptimized={isSvgImage}
        />

        <div className="absolute left-2 top-2">
          <TypeBadge itemType={item.itemType} />
        </div>

        {unavailable && (
          <div className="absolute inset-x-2 bottom-2 rounded-full bg-cedar-espresso/90 px-2 py-1 text-center text-[10px] font-extrabold uppercase tracking-wide text-white">
            Unavailable
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-col p-4 sm:p-5">
        {item.category?.name && (
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cedar-caramel">
            {item.category.name}
          </p>
        )}

        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-lg font-extrabold leading-snug tracking-[-0.01em] text-cedar-espresso">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-cedar-amber/10 px-3 py-1 text-sm font-extrabold text-cedar-brown">
            {currencySymbol}
            {item.price}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-cedar-charcoal/70">
          {item.description}
        </p>

        <button
          type="button"
          disabled={unavailable}
          onClick={onAddToCart}
          className={`button-pop mt-auto inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold ${
            unavailable
              ? "cursor-not-allowed border border-cedar-border/60 bg-cedar-beige/70 text-cedar-charcoal/50"
              : "bg-cedar-espresso text-white shadow-[0_14px_28px_rgba(33,18,13,0.16)] hover:bg-cedar-brown"
          }`}
        >
          {unavailable ? (
            <ShoppingBag className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {unavailable ? "Not available" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
