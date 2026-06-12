"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

type MobileCartBarProps = {
  currencySymbol: string;
};

export function MobileCartBar({ currencySymbol }: MobileCartBarProps) {
  const { totalQuantity, subtotal, setIsCartOpen } = useCart();

  if (totalQuantity === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-cedar-cream/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-18px_42px_rgba(33,18,13,0.13)] backdrop-blur-2xl md:hidden">
      <button
        onClick={() => setIsCartOpen(true)}
        className="button-pop flex w-full items-center justify-between rounded-2xl bg-gradient-to-r from-cedar-espresso to-cedar-brown px-4 py-3.5 text-white shadow-[0_16px_34px_rgba(33,18,13,0.24)]"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cedar-amber text-[9px] font-extrabold text-cedar-espresso">
              {totalQuantity}
            </span>
          </div>
          <span className="text-sm font-bold">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in cart
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-extrabold">
          {currencySymbol}
          {subtotal}
        </span>
      </button>
    </div>
  );
}
