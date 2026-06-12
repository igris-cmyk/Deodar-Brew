import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="group rounded-[24px] soft-card p-5 hover-lift">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cedar-green/10 text-cedar-green shadow-inner">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-lg font-bold leading-snug text-cedar-espresso">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-cedar-charcoal/70">
        {description}
      </p>
    </div>
  );
}
