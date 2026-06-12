import Image from "next/image";
import { isSvgImageUrl, resolveMenuImageUrl } from "@/lib/image-fallbacks";

type MenuPreviewCardProps = {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string | null;
    category?: { name: string } | null;
  };
  currencySymbol: string;
};

export default function MenuPreviewCard({
  item,
  currencySymbol,
}: MenuPreviewCardProps) {
  const imageUrl = resolveMenuImageUrl(item.imageUrl, item.category?.name);
  const isSvgImage = isSvgImageUrl(imageUrl);

  return (
    <div className="group grid grid-cols-[66px_1fr] gap-2.5 rounded-2xl border border-white/70 bg-white/70 p-2 shadow-[0_12px_30px_rgba(33,18,13,0.07)] backdrop-blur-sm hover:-translate-y-0.5 hover:bg-white">
      <div className="image-well relative h-16 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className={`transition-transform duration-500 group-hover:scale-[1.04] ${
            isSvgImage ? "object-contain p-4" : "object-cover"
          }`}
          sizes="76px"
          unoptimized={isSvgImage}
        />
      </div>
      <div className="min-w-0 py-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-extrabold text-cedar-espresso">
            {item.name}
          </h3>
          <span className="shrink-0 rounded-full bg-cedar-amber/10 px-2 py-0.5 text-xs font-extrabold text-cedar-brown">
            {currencySymbol}
            {item.price}
          </span>
        </div>
        <p className="mt-1 line-clamp-1 text-xs leading-5 text-cedar-charcoal/70">
          {item.description}
        </p>
      </div>
    </div>
  );
}
