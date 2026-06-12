"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";

export function CartButton() {
  const { totalQuantity, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="button-pop relative inline-flex items-center gap-2 rounded-2xl bg-cedar-espresso px-3.5 py-2.5 text-sm font-bold text-white shadow-[0_14px_28px_rgba(33,18,13,0.16)] hover:bg-cedar-brown"
      aria-label={`View cart with ${totalQuantity} items`}
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="hidden sm:inline">Cart</span>
      {totalQuantity > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-cedar-amber text-[10px] font-extrabold text-cedar-espresso shadow-sm ring-2 ring-cedar-cream">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
