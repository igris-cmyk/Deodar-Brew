import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl space-y-4 ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex rounded-full border border-cedar-caramel/20 bg-cedar-amber/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cedar-caramel">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.01em] text-cedar-espresso sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-sm leading-7 text-cedar-charcoal/70 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
