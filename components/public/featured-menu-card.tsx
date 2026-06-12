import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { isSvgImageUrl, resolveMenuImageUrl } from "@/lib/image-fallbacks";

type ItemType = "VEG" | "NON_VEG" | "EGG" | "OTHER";

type FeaturedMenuCardProps = {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    itemType?: ItemType;
    category?: { name: string } | null;
  };
  currencySymbol: string;
};

function itemTypeLabel(itemType?: ItemType) {
  if (itemType === "NON_VEG") return "Non-veg";
  if (itemType === "EGG") return "Egg";
  if (itemType === "VEG") return "Veg";
  return "Featured";
}

export default function FeaturedMenuCard({
  item,
  currencySymbol,
}: FeaturedMenuCardProps) {
  const imageUrl = resolveMenuImageUrl(item.imageUrl, item.category?.name);
  const isSvgImage = isSvgImageUrl(imageUrl);

  return (
    <article className="group overflow-hidden rounded-[30px] border border-white/75 bg-cedar-surface shadow-[0_22px_58px_rgba(28,13,8,0.09)] hover:-translate-y-1 hover:shadow-[0_30px_78px_rgba(28,13,8,0.14)]">
      <div className="relative p-3">
        <div className="image-well relative aspect-[5/3.4] overflow-hidden rounded-[24px]">
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            className={`transition-transform duration-500 group-hover:scale-[1.04] ${
              isSvgImage ? "object-contain p-6" : "object-cover"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized={isSvgImage}
          />
          <div className="absolute left-3 top-3 rounded-full border border-white/75 bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cedar-charcoal/75 shadow-sm backdrop-blur">
            {itemTypeLabel(item.itemType)}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-snug tracking-[-0.01em] text-cedar-espresso">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-cedar-caramel/10 px-3 py-1 text-sm font-bold text-cedar-caramel">
            {currencySymbol}
            {item.price}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-cedar-charcoal/70">
          {item.description}
        </p>
        <Link
          href="/menu"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cedar-brown hover:text-cedar-caramel"
        >
          Add from menu
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
