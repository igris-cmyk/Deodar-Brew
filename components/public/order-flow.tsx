import {
  ClipboardList,
  MessageCircle,
  Settings,
  ShoppingBag,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Customer opens menu",
    text: "They scan categories, availability, prices, and item details from the public menu.",
  },
  {
    icon: ShoppingBag,
    title: "Adds items to cart",
    text: "Quantities stay clear, the cart persists, and the customer can add a short note.",
  },
  {
    icon: MessageCircle,
    title: "Sends WhatsApp order",
    text: "The checkout becomes a structured message the business can confirm directly.",
  },
  {
    icon: Settings,
    title: "Owner manages content",
    text: "Menu items, categories, offers, gallery, and cafe settings remain admin-managed.",
  },
];

export default function OrderFlow() {
  return (
    <div className="relative">
      <div className="absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cedar-caramel/40 via-cedar-border to-transparent md:block" />
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <article
            key={step.title}
            className="group relative rounded-[24px] soft-card p-5 hover-lift md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cedar-green/10 text-cedar-green shadow-inner">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-heading text-4xl font-semibold leading-none text-cedar-caramel/20">
                0{index + 1}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold leading-tight text-cedar-espresso">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-cedar-charcoal/70">
              {step.text}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
