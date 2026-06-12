import Link from "next/link";
import { ArrowRight } from "lucide-react";

type PremiumCtaProps = {
  href: string;
  label: string;
  variant?: "light" | "dark";
  className?: string;
};

export default function PremiumCta({
  href,
  label,
  variant = "dark",
  className = "",
}: PremiumCtaProps) {
  const isLight = variant === "light";

  return (
    <Link
      href={href}
      className={`button-pop inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold shadow-[0_18px_36px_rgba(33,18,13,0.14)] ${
        isLight
          ? "bg-white text-cedar-espresso hover:bg-cedar-cream"
          : "bg-cedar-espresso text-white hover:bg-cedar-brown"
      } ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
