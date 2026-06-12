import {
  CakeSlice,
  ChefHat,
  Coffee,
  CupSoda,
  Sandwich,
  Store,
  UtensilsCrossed,
} from "lucide-react";

const businessTypes = [
  { icon: Coffee, label: "Cafes" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: CakeSlice, label: "Bakeries" },
  { icon: ChefHat, label: "Cloud kitchens" },
  { icon: Store, label: "Tea stalls" },
  { icon: CupSoda, label: "Juice shops" },
  { icon: Sandwich, label: "Fast-food counters" },
];

export default function BusinessTypes() {
  return (
    <div
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7"
      aria-label="Suitable food business types"
    >
      {businessTypes.map((type) => (
        <div
          key={type.label}
          className="group rounded-2xl border border-white/70 bg-white/70 px-3 py-4 text-center shadow-[0_14px_30px_rgba(33,18,13,0.07)] backdrop-blur-sm hover:-translate-y-1 hover:bg-white"
        >
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-cedar-amber/10 text-cedar-caramel group-hover:bg-cedar-caramel group-hover:text-white">
            <type.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 text-xs font-bold leading-5 text-cedar-espresso">
            {type.label}
          </p>
        </div>
      ))}
    </div>
  );
}
