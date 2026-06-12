import Link from "next/link";
import { ArrowRight, Coffee } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/#offers" },
  { label: "Visit", href: "/#visit" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const studioUrl = process.env.NEXT_PUBLIC_DEODAR_STUDIO_URL;
  const hasStudioUrl =
    typeof studioUrl === "string" && /^https?:\/\//.test(studioUrl);
  const studioHref = hasStudioUrl ? studioUrl : undefined;

  return (
    <footer className="dark-panel text-cedar-beige">
      <div className="mx-auto max-w-6xl container-px py-6 md:py-8">
        <div className="mb-6 rounded-3xl border border-white/10 bg-white/10 p-3 shadow-[0_18px_46px_rgba(0,0,0,0.18)] backdrop-blur md:p-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cedar-amber">
                Working ordering flow
              </p>
              <h2 className="mt-1.5 max-w-2xl text-lg font-extrabold leading-tight text-white sm:text-xl">
                A food business website should help customers decide and order
                without friction.
              </h2>
            </div>
            <Link
              href="/menu"
              className="button-pop inline-flex w-fit items-center justify-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-cedar-espresso shadow-[0_14px_28px_rgba(0,0,0,0.16)] hover:bg-cedar-cream"
            >
              Open menu
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                <Coffee
                  className="h-5 w-5 text-cedar-amber"
                  aria-hidden="true"
                />
              </span>
              <span className="text-lg font-extrabold text-white">
                Deodar-Brew
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-cedar-beige/75">
              A warm public demo for food businesses that need a clear menu,
              quick ordering, and easy updates.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cedar-amber">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-cedar-beige/75 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cedar-amber">
              Practical Websites
            </h3>
            <p className="text-sm leading-6 text-cedar-beige/75">
              Built to demonstrate Deodar Web Studio website capability for
              cafes, restaurants, bakeries, cloud kitchens, tea stalls, juice
              shops, and fast-food counters.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-cedar-beige/60 sm:flex-row">
          <p>&copy; {currentYear} Deodar-Brew. All rights reserved.</p>
          <p>
            {studioHref ? (
              <a
                href={studioHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cedar-caramel"
              >
                Deodar Web Studio
              </a>
            ) : (
              "Deodar Web Studio"
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
