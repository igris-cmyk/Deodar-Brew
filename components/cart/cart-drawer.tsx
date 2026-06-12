"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCart } from "./cart-provider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { isSvgImageUrl, resolveMenuImageUrl } from "@/lib/image-fallbacks";

interface CartDrawerProps {
  whatsappNumber: string;
  cafeName: string;
  currencySymbol: string;
}

export function CartDrawer({
  whatsappNumber,
  cafeName,
  currencySymbol,
}: CartDrawerProps) {
  const {
    items,
    removeItem,
    incrementItem,
    decrementItem,
    clearCart,
    totalQuantity,
    subtotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setIsCartOpen(false);
    }
    if (isCartOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isCartOpen, setIsCartOpen]);

  const handleOrder = () => {
    setError(null);

    const result = buildWhatsAppUrl({
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      customerName,
      note: note || undefined,
      cafeName,
      whatsappNumber,
      currencySymbol,
    });

    if (result.error) {
      setError(result.error);
      return;
    }
    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
  };
  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-cedar-espresso/60 backdrop-blur-md"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className="sheet-in fixed bottom-0 right-0 z-50 flex h-[92vh] w-full flex-col overflow-hidden rounded-t-[30px] border border-white/70 bg-cedar-surface shadow-[0_30px_100px_rgba(0,0,0,0.28)] md:top-0 md:h-full md:max-w-md md:rounded-l-[30px] md:rounded-tr-none"
      >
        <div className="border-b border-cedar-border/50 bg-white/75 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cedar-amber/10 text-cedar-caramel shadow-inner">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cedar-caramel">
                  Cart
                </p>
                <h2 className="text-xl font-extrabold text-cedar-espresso">
                  Your order
                </h2>
              </div>
            </div>
            {totalQuantity > 0 && (
              <span className="rounded-full bg-cedar-green/10 px-3 py-1 text-xs font-bold text-cedar-green">
                {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
              </span>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="button-pop rounded-2xl border border-cedar-border/50 bg-white p-2.5 text-cedar-charcoal shadow-sm hover:bg-cedar-cream"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-cedar-cream/50 to-cedar-surface px-4 py-4 sm:px-5">
          {items.length === 0 ? (
            <div className="mx-auto flex max-w-xs flex-col items-center justify-center py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[24px] bg-white shadow-[0_18px_42px_rgba(33,18,13,0.09)] ring-1 ring-cedar-border/50">
                <ShoppingBag className="h-7 w-7 text-cedar-caramel" />
              </div>
              <h3 className="text-lg font-extrabold text-cedar-espresso">
                Start with the menu
              </h3>
              <p className="mt-2 text-sm leading-6 text-cedar-charcoal/70">
                Add a drink, bite, or meal and this cart will prepare the
                WhatsApp order message.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[60px_1fr] gap-3 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-[0_14px_35px_rgba(33,18,13,0.08)] backdrop-blur-sm"
                >
                  <div className="image-well relative h-16 w-16 overflow-hidden rounded-2xl">
                    {(() => {
                      const imageUrl = resolveMenuImageUrl(item.imageUrl);
                      const isSvgImage = isSvgImageUrl(imageUrl);

                      return (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          className={
                            isSvgImage ? "object-contain p-3" : "object-cover"
                          }
                          unoptimized={isSvgImage}
                        />
                      );
                    })()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-cedar-espresso">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-cedar-caramel">
                          {currencySymbol}
                          {item.price * item.quantity}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="button-pop flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl text-red-500 hover:bg-red-50"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex w-fit items-center rounded-2xl border border-cedar-border/60 bg-cedar-cream/70 p-1">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="button-pop flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cedar-charcoal shadow-sm hover:text-cedar-brown"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-9 text-center text-sm font-extrabold text-cedar-espresso">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => incrementItem(item.id)}
                        className="button-pop flex h-8 w-8 items-center justify-center rounded-xl bg-white text-cedar-charcoal shadow-sm hover:text-cedar-brown"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 border-t border-white/80 bg-white/90 px-4 py-4 shadow-[0_-16px_42px_rgba(33,18,13,0.08)] backdrop-blur-xl sm:px-5">
            <div>
              <label
                htmlFor="customer-name"
                className="mb-1.5 block text-xs font-bold text-cedar-charcoal"
              >
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                id="customer-name"
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setError(null);
                }}
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-cedar-border/60 bg-cedar-cream/70 px-4 py-3 text-sm font-semibold text-cedar-espresso placeholder:text-cedar-charcoal/40 focus:border-cedar-caramel focus:bg-white focus:outline-none focus:ring-4 focus:ring-cedar-amber/20"
              />
            </div>

            <div>
              <label
                htmlFor="order-note"
                className="mb-1.5 flex items-center justify-between text-xs font-bold text-cedar-charcoal"
              >
                <span>Note (optional)</span>
                <span className="text-cedar-charcoal/40">
                  {note.length}/200
                </span>
              </label>
              <textarea
                id="order-note"
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 200))}
                placeholder="Any special requests?"
                rows={2}
                maxLength={200}
                className="w-full resize-none rounded-2xl border border-cedar-border/60 bg-cedar-cream/70 px-4 py-3 text-sm font-semibold text-cedar-espresso placeholder:text-cedar-charcoal/40 focus:border-cedar-caramel focus:bg-white focus:outline-none focus:ring-4 focus:ring-cedar-amber/20"
              />
            </div>

            {error && (
              <p
                className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="flex items-center justify-between rounded-3xl bg-cedar-cream/70 p-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-cedar-charcoal/50">
                  Subtotal
                </p>
                <p className="text-2xl font-extrabold text-cedar-espresso">
                  {currencySymbol}
                  {subtotal}
                </p>
              </div>
              <button
                onClick={clearCart}
                className="button-pop rounded-full px-3 py-2 text-xs font-bold text-cedar-charcoal/60 hover:bg-white hover:text-red-500"
              >
                Clear cart
              </button>
            </div>

            <button
              onClick={handleOrder}
              disabled={items.length === 0 || !customerName.trim()}
              className="button-pop flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cedar-green to-[#4f6844] px-6 py-4 text-sm font-extrabold text-white shadow-[0_18px_36px_rgba(79,104,68,0.26)] hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              <MessageCircle className="h-4 w-4" />
              Order on WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
