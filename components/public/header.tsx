"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, Menu, X } from "lucide-react";
import { CartButton } from "@/components/cart/cart-button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/#offers" },
  { label: "Visit", href: "/#visit" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-cedar-cream/80 shadow-[0_10px_30px_rgba(33,18,13,0.055)] backdrop-blur-2xl">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between container-px py-3">
        <Link
          href="/"
          className="group flex items-center gap-3 text-cedar-espresso"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-[0_12px_28px_rgba(33,18,13,0.08)] ring-1 ring-cedar-border/50 group-hover:-translate-y-0.5">
            <Coffee
              className="h-5 w-5 text-cedar-caramel"
              aria-hidden="true"
            />
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-[-0.01em]">
              Deodar-Brew
            </span>
            <span className="-mt-0.5 hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-cedar-charcoal/50 sm:block">
              Cafe ordering demo
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/70 p-1 shadow-[0_12px_34px_rgba(33,18,13,0.07)] backdrop-blur-xl md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-cedar-charcoal/70 hover:bg-cedar-amber/10 hover:text-cedar-espresso"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <CartButton />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <CartButton />
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="button-pop rounded-2xl border border-white/70 bg-white p-2.5 text-cedar-charcoal shadow-[0_10px_24px_rgba(33,18,13,0.08)] hover:bg-cedar-cream"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav
          className="border-t border-white/60 bg-cedar-cream/95 py-2 shadow-[0_14px_35px_rgba(33,18,13,0.08)] backdrop-blur-2xl md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1 container-px">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-cedar-charcoal hover:bg-white hover:text-cedar-brown"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
